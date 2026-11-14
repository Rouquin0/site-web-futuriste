/**
 * site.config.ts — Configuration centrale du projet
 * RÈGLE : Aucune occurrence du nom n'est écrite en dur dans les composants.
 * Tous les champs marqués [À COMPLÉTER] bloquent le build de production.
 */

export const siteConfig = {
  // ─── Identité commerciale ───────────────────────────────────────────────────
  nomCommercial: "Boutique",
  estNomProvisoire: true, // ⚠️ GARDE-FOU : le build prod échoue tant que c'est true
  raisonSociale: "[À COMPLÉTER — Raison sociale légale]",
  slogan: "[À COMPLÉTER — Slogan de la boutique]",

  // ─── Localisation ───────────────────────────────────────────────────────────
  pays: "Congo",
  paysCode: "CG",
  ville: "Brazzaville",
  langue: "fr-CG",

  // ─── Devise ─────────────────────────────────────────────────────────────────
  devise: {
    code: "XAF",
    symbole: "FCFA",
    // Aucune décimale. Format : « 15 000 FCFA » via formatPriceXAF()
    decimales: 0,
  },

  // ─── Contact WhatsApp ────────────────────────────────────────────────────────
  telephoneWhatsApp: "+242060000000",
  // Format wa.me (sans + ni espaces) — généré automatiquement
  get telephoneWaMeSanitized() {
    return this.telephoneWhatsApp.replace(/\+|\s/g, "");
  },

  // ─── URLs & domaine ──────────────────────────────────────────────────────────
  // Lire depuis variable d'environnement NEXT_PUBLIC_SITE_URL en priorité
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "[À COMPLÉTER — URL de production]",

  // ─── Coordonnées ────────────────────────────────────────────────────────────
  adressePhysique: "[À COMPLÉTER — Adresse physique de la boutique]",
  email: "[À COMPLÉTER — Email de contact]",

  // ─── Liens du pied de page ───────────────────────────────────────────────────
  liensFooter: {
    cgv: "/cgv",
    mentionsLegales: "/mentions-legales",
    politiqueConfidentialite: "/confidentialite",
  },

  // ─── Partage / OpenGraph ─────────────────────────────────────────────────────
  descriptionPartage: "[À COMPLÉTER — Description courte pour partage réseaux sociaux]",

  // ─── Logo ───────────────────────────────────────────────────────────────────
  // Fichier unique SVG à deux variantes (clair/sombre). Logotype provisoire accepté.
  logoProvisoire: true,
} as const;

export type SiteConfig = typeof siteConfig;

// ─── Validation au démarrage (nom provisoire bloque le build prod) ─────────────
if (
  process.env.NODE_ENV === "production" &&
  siteConfig.estNomProvisoire
) {
  throw new Error(
    "🚫 Build production bloqué : siteConfig.estNomProvisoire est true. " +
    "Remplacez nomCommercial par le vrai nom de la boutique et passez estNomProvisoire à false."
  );
}
