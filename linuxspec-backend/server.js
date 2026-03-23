import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";

import connectDB from "./db.js";
import leadRoutes from "./routes/leads.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000"
  })
);
app.use(express.json({ limit: "256kb" }));

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
