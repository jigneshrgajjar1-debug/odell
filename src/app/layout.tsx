import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODELL — Elegance like luxury | Vitreous China Sanitaryware, Bathware & Jacuzzis",
  description:
    "Official website of ODELL. Pioneers in Vitreous China Sanitaryware since 1962. Explore designer one-piece and wall-hung toilets, 3-function thermostatic showers, freestanding hydromassage jacuzzis, and AISI 304 architectural fittings.",
  keywords: [
    "ODELL",
    "Elegance like luxury",
    "Vitreous China Sanitaryware",
    "Prado Toilet 8609",
    "Hilton 8612",
    "Tesla 8615",
    "Libra Wall Hung",
    "Tesoro Shower Set",
    "Serena Shower",
    "Jacuzzi 8064L",
    "AISI 304 Drains",
    "LED Mirrors",
    "Architectural Hardware",
    "Hindustan Twyfords heritage",
  ],
  authors: [{ name: "ODELL International" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased selection:bg-gold/30 selection:text-gold`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-alabaster font-sans cursor-default">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
