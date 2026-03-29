import nodemailer from "nodemailer";

function getTransporter() {
  if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
}

export async function sendLeadEmails(lead) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email transporter not configured, skipping email notifications.");
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "New Lead - linuxspec",
    text: `Name: ${lead.name || "-"}\nEmail: ${lead.email}\nMonthly cost: EUR ${lead.monthlyCost}\nMessage: ${lead.message || "-"}`
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: lead.email,
    subject: "Thanks - linuxspec FinOps audit",
    text: "Thanks for reaching out. We will review your setup and reply with cost optimization insights."
  });
}

export async function sendSmokeEmail(metadata = {}) {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error("Email transporter not configured");
  }

  const requestedBy = metadata.requestedBy || "unknown";
  const environment = process.env.NODE_ENV || "development";

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Smoke test - linuxspec backend",
    text: `Email smoke test succeeded.\nEnvironment: ${environment}\nRequested by: ${requestedBy}\nTimestamp: ${new Date().toISOString()}`
  });
}
