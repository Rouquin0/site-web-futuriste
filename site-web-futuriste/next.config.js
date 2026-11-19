/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Configuration Next.js — V4.2
   * - App Router activé par défaut (Next.js 15+)
   * - Images optimisées AVIF/WebP
   * - En-têtes de sécurité
   */
  images: {
    formats: ["image/avif", "image/webp"],
    // En production, définir les domaines autorisés selon l'hébergement des images
    // remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
