import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Barlow_Condensed } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
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
