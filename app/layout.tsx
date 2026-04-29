import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StoreMode — In-store AR for retail",
  description:
    "StoreMode turns any phone into a retail co-pilot. GPS-anchored AR maps, navigation, and live promotions overlaid on the physical store.",
  metadataBase: new URL("https://storemode.app"),
  openGraph: {
    title: "StoreMode — In-store AR for retail",
    description:
      "Mobile-first in-store mode. Find aisles, surface deals, navigate with AR. Built for the post-AI-agent era of retail UX.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d0b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}
