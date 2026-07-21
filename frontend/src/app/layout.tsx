import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { localBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { MotionProvider } from "@/components/motion/MotionProvider";

// NOTE (Tailwind v4): variable names must match Task 4's globals.css mapping
// (`@theme inline { --font-heading: var(--font-baloo); ... }`). Use
// --font-baloo / --font-inter here, NOT --font-heading / --font-body.
const heading = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Enrichment for Children with Special Needs in Singapore`,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream bg-dot-grid text-ink font-body antialiased">
        <JsonLd data={localBusinessSchema()} />
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppBubble />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
