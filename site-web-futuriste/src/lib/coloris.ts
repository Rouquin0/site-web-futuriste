/**
 * src/lib/coloris.ts — Aides et validation des coloris (V5 §W)
 *
 * RÈGLE DE VÉRITÉ VISUELLE : chaque coloris = une vraie photo du vêtement réel
 * dans ce coloris, porté par le mannequin. Aucune recoloration numérique.
 */

import type { Coloris, DeclinaisonTaille, DroitImage, Tenue } from "../types/catalogue";

/** Coloris par défaut d'une tenue (undefined si la tenue n'a pas de variantes). */
export function getColorisDefaut(tenue: Tenue): Coloris | undefined {
  if (!tenue.coloris || tenue.coloris.length === 0) return undefined;
  return tenue.coloris.find((c) => c.defaut) ?? tenue.coloris[0];
}

/** Coloris choisi (par id) ou, à défaut, le coloris par défaut. */
export function getColorisChoisi(tenue: Tenue, colorisId?: string | null): Coloris | undefined {
  if (!tenue.coloris || tenue.coloris.length === 0) return undefined;
  return tenue.coloris.find((c) => c.id === colorisId) ?? getColorisDefaut(tenue);
}

/** Identifiant de l'image à afficher pour la tenue dans le coloris choisi. */
export function getImageIdPourColoris(tenue: Tenue, colorisId?: string | null): string {
  return getColorisChoisi(tenue, colorisId)?.imageId ?? tenue.imageId;
}

/** Disponibilité par taille pour le coloris choisi (repli : celle de la tenue). */
export function getTaillesPourColoris(tenue: Tenue, colorisId?: string | null): DeclinaisonTaille[] {
  return getColorisChoisi(tenue, colorisId)?.tailles ?? tenue.tailles;
}

/** Vrai si toutes les tailles du coloris sont épuisées. */
export function colorisEpuise(tenue: Tenue, coloris: Coloris): boolean {
  const tailles = coloris.tailles ?? tenue.tailles;
  return tailles.length > 0 && tailles.every((t) => t.statut === "epuise");
}

/**
 * Validation (appelée par integrite.ts).
 * ERREURS : plusieurs coloris par défaut, identifiants en double, image absente du registre
 *           des droits, motif sans image, tailles incohérentes.
 */
export function validerColoris(
  tenues: Tenue[],
  droitsParId: Map<string, DroitImage>,
  erreurs: string[],
  avertissements: string[]
): void {
  for (const tenue of tenues) {
    const liste = tenue.coloris;
    if (!liste || liste.length === 0) continue;

    const defauts = liste.filter((c) => c.defaut);
    if (defauts.length > 1) {
      erreurs.push(`[tenues] id="${tenue.id}" — plusieurs coloris marqués "par défaut" (un seul autorisé)`);
    }
    if (defauts.length === 0) {
      avertissements.push(`[tenues] id="${tenue.id}" — aucun coloris "par défaut" : le premier sera utilisé`);
    }

    const vus = new Set<string>();
    for (const c of liste) {
      if (vus.has(c.id)) {
        erreurs.push(`[tenues] id="${tenue.id}" — identifiant de coloris en double : "${c.id}"`);
      }
      vus.add(c.id);

      const droit = droitsParId.get(c.imageId);
      if (!droit) {
        erreurs.push(
          `[tenues] id="${tenue.id}" coloris="${c.id}" — imageId="${c.imageId}" introuvable dans droits-images.json ` +
            `(chaque photo de coloris doit être au registre des droits)`
        );
      } else if (!droit.texteAlternatif || droit.texteAlternatif.trim().length < 10) {
        erreurs.push(`[tenues] id="${tenue.id}" coloris="${c.id}" — texte alternatif manquant pour l'image`);
      }

      if (c.tailles) {
        const tailleTenue = new Set(tenue.tailles.map((t) => t.taille));
        for (const t of c.tailles) {
          if (!tailleTenue.has(t.taille)) {
            erreurs.push(
              `[tenues] id="${tenue.id}" coloris="${c.id}" — taille "${t.taille}" absente de la tenue`
            );
          }
        }
      }
    }

    // Avertissement : un coloris sans rotation alors que la tenue en propose
    if (liste.length > 1 && tenue.pieces?.some((p) => p.rotation)) {
      avertissements.push(
        `[tenues] id="${tenue.id}" — la vue 360° n'existe que pour le coloris par défaut ` +
          `(la vue de détail l'indiquera pour les autres coloris)`
      );
    }
  }
}
