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
  metadataBase: new URL("https://dincohen.com"),
  description:
    "Product designer and engineer who designs and builds AI-powered products end to end.",
  openGraph: {
    title: "Din Cohen — Product Designer",
    description:
      "Product designer and engineer who designs and builds AI-powered products end to end.",
    url: "https://dincohen.com",
    siteName: "Dinco",
    images: [{ url: "/images/hero/din-headshot.png", alt: "Din Cohen" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/din-headshot.png"],
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
