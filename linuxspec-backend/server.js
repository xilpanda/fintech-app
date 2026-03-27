import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import client from "prom-client";

import connectDB from "./db.js";
import leadRoutes from "./routes/leads.js";

dotenv.config();

const app = express();

client.collectDefaultMetrics();

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests processed by backend",
  labelNames: ["method", "route", "status_code"]
});

const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5]
});

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000"
  })
);
app.use(express.json({ limit: "256kb" }));

app.use((req, res, next) => {
  if (req.path === "/metrics") {
    return next();
  }

  const stopTimer = httpRequestDurationSeconds.startTimer({ method: req.method });
  res.on("finish", () => {
    const route = req.route?.path || req.path;
    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode)
    };

    httpRequestsTotal.inc(labels);
    stopTimer(labels);
  });

  return next();
});

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api/leads", leadLimiter);
app.use("/api/leads", leadRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.get("/health/live", (_req, res) => {
  res.json({ status: "live" });
});

app.get("/health/ready", (_req, res) => {
  const isReady = mongoose.connection.readyState === 1;
  if (!isReady) {
    return res.status(503).json({ status: "not_ready" });
  }
  return res.json({ status: "ready" });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = Number(process.env.PORT || 5000);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  });
