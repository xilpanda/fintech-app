import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "linuxspec | FinOps + Fintech Engineering",
  description:
    "Reduce cloud costs, optimize Linux infrastructure, and build secure fintech systems.",
  keywords: [
    "finops",
    "cloud cost optimization",
    "fintech engineering",
    "linux infrastructure",
    "devops"
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
