import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";


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
          className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
