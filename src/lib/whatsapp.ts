/**
 * src/lib/whatsapp.ts — Générateur de lien WhatsApp
 *
 * RÈGLES (V4.2 §K, §M, §Décisions propriétaire) :
 *  - Lien wa.me : sans « + » ni espaces dans le numéro
 *  - Message pré-rempli : nom de tenue, référence, taille, couleur, quantité, prix affiché, lien fiche
 *  - Fonction pure, testable, sans effet de bord
 *  - Numéro WhatsApp lu depuis siteConfig (variable d'environnement)
 *  - Encodage correct de tous les caractères spéciaux (accents, espaces)
 *  - Ouverture sécurisée : rel="noopener" à appliquer côté composant
 */

import { siteConfig } from "../../site.config";
import { formatPriceXAF } from "./formatters";
import type { Tenue, Taille } from "../types/catalogue";

// ─── Type des paramètres du générateur ───────────────────────────────────────
export interface ParamsLienWhatsApp {
  tenue: Tenue;
  taille: Taille;
  couleur: string;
  quantite?: number;
  /** URL absolue vers la fiche produit (ex: https://boutique.cg/produits/robe-wax) */
  urlFiche: string;
}

// ─── Résultat retourné ────────────────────────────────────────────────────────
export interface ResultatLienWhatsApp {
  /** URL complète wa.me avec message encodé */
  href: string;
  /** Texte brut du message (pour le bouton « Copier le message ») */
  messageTexte: string;
  /** Numéro au format wa.me (sans + ni espaces) */
  numeroPur: string;
}

/**
 * Génère le lien wa.me et le texte brut du message de commande WhatsApp.
 * Fonction pure — aucun effet de bord.
 *
 * @example
 * const { href, messageTexte } = genererLienWhatsApp({
 *   tenue,
 *   taille: "M",
 *   couleur: "Wengé imprimé or",
 *   quantite: 1,
 *   urlFiche: "https://boutique.cg/produits/robe-wax-wenge-imprime-geometrique"
 * });
 */
export function genererLienWhatsApp({
  tenue,
  taille,
  couleur,
  quantite = 1,
  urlFiche,
}: ParamsLienWhatsApp): ResultatLienWhatsApp {
  // Validation des entrées
  if (!tenue.tailles.some((d) => d.taille === taille)) {
    throw new Error(
      `genererLienWhatsApp : la taille "${taille}" n'existe pas pour la tenue "${tenue.id}"`
    );
  }
  if (!tenue.couleurs.includes(couleur)) {
    throw new Error(
      `genererLienWhatsApp : la couleur "${couleur}" n'existe pas pour la tenue "${tenue.id}"`
    );
  }
  if (!Number.isInteger(quantite) || quantite < 1) {
    throw new RangeError(
      `genererLienWhatsApp : la quantité doit être un entier ≥ 1. Reçu : ${quantite}`
    );
  }

  // Numéro sans + ni espaces (règle wa.me)
  const numeroPur = siteConfig.telephoneWaMeSanitized;

  // Message structuré
  const prixFormate = formatPriceXAF(tenue.prixXAF);
  const nomBoutique = siteConfig.nomCommercial;

  const messageTexte = [
    `Bonjour ${nomBoutique} 👋`,
    ``,
    `Je souhaite commander :`,
    `🛍️ *${tenue.nom}*`,
    `📋 Référence : ${tenue.reference}`,
    `📐 Taille : ${taille}`,
    `🎨 Couleur : ${couleur}`,
    `🔢 Quantité : ${quantite}`,
    `💰 Prix : ${prixFormate}`,
    ``,
    `🔗 Fiche produit : ${urlFiche}`,
    ``,
    `Merci de confirmer la disponibilité et les modalités de paiement et livraison.`,
  ].join("\n");

  // Encodage URL complet (encodeURIComponent gère accents, espaces, émojis)
  const messageEncode = encodeURIComponent(messageTexte);

  const href = `https://wa.me/${numeroPur}?text=${messageEncode}`;

  return { href, messageTexte, numeroPur };
}

/**
 * Génère un lien WhatsApp pour demander la disponibilité d'une tenue épuisée.
 * Utilisé quand toutes les tailles sont épuisées.
 */
export function genererLienDemandeDisponibilite({
  tenue,
  urlFiche,
}: Pick<ParamsLienWhatsApp, "tenue" | "urlFiche">): ResultatLienWhatsApp {
  const numeroPur = siteConfig.telephoneWaMeSanitized;
  const nomBoutique = siteConfig.nomCommercial;

  const messageTexte = [
    `Bonjour ${nomBoutique} 👋`,
    ``,
    `Je suis intéressé(e) par cette tenue actuellement épuisée :`,
    `🛍️ *${tenue.nom}*`,
    `📋 Référence : ${tenue.reference}`,
    `🔗 Fiche produit : ${urlFiche}`,
    ``,
    `Pourriez-vous m'indiquer si un réassort est prévu et dans quel délai ?`,
    `Merci !`,
  ].join("\n");

  const messageEncode = encodeURIComponent(messageTexte);
  const href = `https://wa.me/${numeroPur}?text=${messageEncode}`;

  return { href, messageTexte, numeroPur };
}
