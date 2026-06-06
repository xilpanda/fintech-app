import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "linuxspec | Penetration Testing & IT Security",
  description:
    "Professional penetration testing, vulnerability analysis, and IT security consulting. Discover vulnerabilities before hackers do.",
  keywords: [
    "penetration testing",
    "pentest",
    "vulnerability analysis",
    "ethical hacking",
    "IT security",
    "NIS2 compliance",
    "red team"
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
