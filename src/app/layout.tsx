import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

// Auto-hébergé dans public/fonts/ — pas de dépendance Google Fonts externe
const barlowCondensed = localFont({
  src: [
    { path: "../../public/fonts/barlow-condensed-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-800.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/barlow-condensed-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: true,
});


export const metadata: Metadata = {
  title: {
    default: "PassionPlay — Vis ta passion",
    template: "%s | PassionPlay",
  },
  description:
    "Des sessions de passion en petit groupe, guidées par des experts. Découverte ou progression — réserve en 30 secondes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://passionplay.fr"),
  openGraph: {
    type: "website",
    siteName: "PassionPlay",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Désactive le zoom — intentionnel (app mobile-first)
  themeColor: "#ff3b3b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} ${barlowCondensed.variable} font-sans bg-[#1a1a1a] text-white`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
