/**
 * src/lib/formatters.ts — Fonction UNIQUE de formatage monétaire XAF
 *
 * RÈGLE (V4.2 §Décisions propriétaire) :
 *  - Devise XAF uniquement, zéro décimale.
 *  - Format affiché : « 45 000 FCFA »
 *  - Cette fonction est la SEULE source de formatage monétaire dans tout le projet.
 *    Elle est utilisée dans les fiches, le catalogue, les messages WhatsApp
 *    et les données structurées (JSON-LD).
 */

/**
 * Formate un montant entier en XAF vers la chaîne affichable.
 *
 * @param montant - Entier positif en XAF (ex: 45000)
 * @returns Chaîne formatée (ex: "45 000 FCFA")
 * @throws {RangeError} Si le montant n'est pas un entier positif
 *
 * @example
 * formatPriceXAF(45000)  // → "45 000 FCFA"
 * formatPriceXAF(1500)   // → "1 500 FCFA"
 * formatPriceXAF(120000) // → "120 000 FCFA"
 */
export function formatPriceXAF(montant: number): string {
  if (!Number.isInteger(montant) || montant <= 0) {
    throw new RangeError(
      `formatPriceXAF : le montant doit être un entier positif. Reçu : ${montant}`
    );
  }

  // Intl.NumberFormat avec locale fr-CG garantit l'espace insécable comme séparateur de milliers
  const partie = new Intl.NumberFormat("fr-CG", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(montant);

  return `${partie} FCFA`;
}

/**
 * Formate un montant pour les données structurées JSON-LD.
 * Renvoie un nombre (pas de symbole), conforme à schema.org/price.
 *
 * @param montant - Entier positif en XAF
 * @returns Le montant comme nombre (ex: 45000)
 */
export function formatPriceJsonLd(montant: number): number {
  if (!Number.isInteger(montant) || montant <= 0) {
    throw new RangeError(
      `formatPriceJsonLd : le montant doit être un entier positif. Reçu : ${montant}`
    );
  }
  return montant;
}
