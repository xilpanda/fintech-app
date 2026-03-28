import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "linuxspec | FinOps + Platform Engineering + Security",
  description:
    "FinOps, Platform Engineering, and Security services for teams that need lower cloud costs, faster delivery, and secure fintech infrastructure.",
  keywords: [
    "finops",
    "cloud cost optimization",
    "platform engineering",
    "kubernetes",
    "security hardening",
    "fintech infrastructure"
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
