import express from "express";
import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import { sendLeadEmails, sendSmokeEmail } from "../services/email.js";

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const statuses = ["new", "contacted", "won", "lost"];
const MAX_SEARCH_LENGTH = 80;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return next();
  }
  const provided = req.header("x-admin-key");
  if (provided !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}

router.post("/", async (req, res) => {
  try {
    const {
      name = "",
      company = "",
      email = "",
      message = "",
      monthlyCost = 0,
      honeypot = ""
    } = req.body;

    // Honeypot: bots usually fill hidden fields.
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      return res.status(200).json({ success: true });
    }

    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const normalizedMonthlyCost = Number(monthlyCost || 0);
    if (!Number.isFinite(normalizedMonthlyCost) || normalizedMonthlyCost < 0) {
      return res.status(400).json({ error: "Invalid monthly cost" });
    }

    const lead = await Lead.create({
      name: String(name).trim(),
      company: String(company).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      monthlyCost: normalizedMonthlyCost
    });

    sendLeadEmails(lead).catch((error) => {
      console.error("Lead email dispatch failed:", error.message);
    });

    return res.status(201).json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Lead create failed:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 200);
  const status = String(req.query.status || "").trim();
  const q = String(req.query.q || "").trim().slice(0, MAX_SEARCH_LENGTH);

  const filter = {};
  if (status) {
    if (!statuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status filter" });
    }
    filter.status = status;
  }
  if (q) {
    const escapedSearch = escapeRegex(q);
    filter.$or = [
      { email: { $regex: escapedSearch, $options: "i" } },
      { name: { $regex: escapedSearch, $options: "i" } },
      { message: { $regex: escapedSearch, $options: "i" } }
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(limit);
  return res.json(leads);
});

router.get("/stats", requireAdmin, async (_req, res) => {
  const [total, byStatus] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
  ]);

  const statusMap = { new: 0, contacted: 0, won: 0, lost: 0 };
  byStatus.forEach((item) => {
    if (item._id in statusMap) {
      statusMap[item._id] = item.count;
    }
  });

  return res.json({ total, ...statusMap });
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  const id = String(req.params.id || "");
  const status = String(req.body.status || "");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid lead id" });
  }
  if (!statuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
  if (!lead) {
    return res.status(404).json({ error: "Lead not found" });
  }
  return res.json({ success: true, lead });
});

router.post("/smoke/email", requireAdmin, async (req, res) => {
  const smokeEnabled = process.env.ENABLE_EMAIL_SMOKE_TEST === "true";
  const environment = process.env.NODE_ENV || "development";

  if (!smokeEnabled || environment === "production") {
    return res.status(403).json({ error: "Email smoke test disabled" });
  }

  try {
    await sendSmokeEmail({ requestedBy: req.ip });
    return res.json({ success: true, message: "Smoke email sent" });
  } catch (error) {
    console.error("Email smoke test failed:", error.message);
    return res.status(500).json({ error: "Email smoke test failed" });
  }
});

export default router;
