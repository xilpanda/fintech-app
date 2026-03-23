import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 120, default: "" },
    company: { type: String, maxlength: 160, default: "" },
    email: { type: String, required: true, maxlength: 160, index: true },
    message: { type: String, maxlength: 2000, default: "" },
    monthlyCost: { type: Number, min: 0, default: 0 },
    source: { type: String, default: "landing" },
    status: {
      type: String,
      enum: ["new", "contacted", "won", "lost"],
      default: "new"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lead", LeadSchema);
