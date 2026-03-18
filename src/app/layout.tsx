import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Din Cohen — Product Designer",
  description:
    "Seattle based product designer and engineer specializing in user-focused design and full-stack development.",
  openGraph: {
    title: "Din Cohen — Product Designer",
    description:
      "Seattle based product designer and engineer specializing in user-focused design and full-stack development.",
    url: "https://dincohen.com",
    siteName: "Dinco",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
          {children}
          <Analytics />
        </body>
    </html>
  );
}
