/**
 * src/app/layout.tsx — Root Layout (V4.2)
 */

import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import { siteConfig } from "../../site.config";
import "./globals.css";

// ── Polices ──────────────────────────────────────────────────────────────────

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ── Script de thème (Inline pour éviter les conflits) ────────────────────────
const themeInitScript = `
  (function() {
    document.documentElement.classList.add('js');
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

// ── Métadonnées ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: siteConfig.nomCommercial,
    template: `%s — ${siteConfig.nomCommercial}`,
  },
  description: siteConfig.descriptionPartage,
  metadataBase: new URL(
    siteConfig.siteUrl.startsWith("[À COMPLÉTER")
      ? "http://localhost:3000"
      : siteConfig.siteUrl
  ),
  openGraph: {
    type: "website",
    locale: siteConfig.langue,
    siteName: siteConfig.nomCommercial,
    title: siteConfig.nomCommercial,
    description: siteConfig.descriptionPartage,
  },
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F1" },
    { media: "(prefers-color-scheme: dark)", color: "#141110" },
  ],
};

// ── Layout ────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* suppressHydrationWarning neutralise les écarts causés par l'antivirus (Kaspersky) */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${montserrat.variable} bg-background text-primary font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
