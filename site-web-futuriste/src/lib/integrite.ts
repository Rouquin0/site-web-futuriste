/**
 * src/lib/integrite.ts — Validation d'intégrité du catalogue
 *
 * Vérifie que :
 *  1. Chaque imageId dans tenues.ts a une entrée dans droits-images.json (aucune image orpheline)
 *  2. Chaque droitImage référencé a un fichier déclaré (non vide)
 *  3. Chaque tenue passe le schéma Zod
 *  4. Chaque droitImage passe le schéma Zod
 *
 * Appelé au démarrage (next.config / instrumentation) pour bloquer si données invalides.
 */

import { TenueSchema, DroitImageSchema, PieceDetailSchema } from "../schemas/catalogue";
import type { Tenue } from "../types/catalogue";
import type { DroitImage } from "../types/catalogue";
import { validerColoris } from "./coloris";

export interface ResultatValidation {
  valide: boolean;
  erreurs: string[];
  avertissements: string[];
}

/**
 * Valide l'intégrité complète du catalogue.
 *
 * @param tenues - Tableau des tenues de data/tenues.ts
 * @param droitsImages - Tableau des droits de data/droits-images.json
 * @returns ResultatValidation avec la liste de toutes les erreurs et avertissements
 */
export function validerIntegriteCatalogue(
  tenues: Tenue[],
  droitsImages: DroitImage[]
): ResultatValidation {
  const erreurs: string[] = [];
  const avertissements: string[] = [];

  // ── Index des droits par id pour lookup O(1) ─────────────────────────────
  const droitsParId = new Map<string, DroitImage>(
    droitsImages.map((d) => [d.id, d])
  );

  // ── 1. Validation Zod de chaque droit image ───────────────────────────────
  for (const droit of droitsImages) {
    const result = DroitImageSchema.safeParse(droit);
    if (!result.success) {
      for (const issue of result.error.issues) {
        erreurs.push(
          `[droits-images] id="${droit.id}" — ${issue.path.join(".")}: ${issue.message}`
        );
      }
    }
    // Avertissement si valeurs [À COMPLÉTER] encore présentes
    if (droit.source.includes("[À COMPLÉTER") || droit.licence.includes("[À COMPLÉTER")) {
      avertissements.push(
        `[droits-images] id="${droit.id}" — source ou licence non renseignée (valeur client attendue)`
      );
    }
  }

  // ── 2. Validation Zod de chaque tenue ────────────────────────────────────
  for (const tenue of tenues) {
    const result = TenueSchema.safeParse(tenue);
    if (!result.success) {
      for (const issue of result.error.issues) {
        erreurs.push(
          `[tenues] id="${tenue.id}" — ${issue.path.join(".")}: ${issue.message}`
        );
      }
    }

    // ── 3. Vérification image principale non orpheline ──────────────────────
    if (!droitsParId.has(tenue.imageId)) {
      erreurs.push(
        `[tenues] id="${tenue.id}" — imageId="${tenue.imageId}" introuvable dans droits-images.json ` +
        `(image orpheline — toute image doit être enregistrée dans le registre des droits)`
      );
    }

    // ── 4. Vérification images secondaires non orphelines ───────────────────
    if (tenue.imagesSecondairesIds) {
      for (const imgId of tenue.imagesSecondairesIds) {
        if (!droitsParId.has(imgId)) {
          erreurs.push(
            `[tenues] id="${tenue.id}" — imagesSecondairesIds contient "${imgId}" ` +
            `introuvable dans droits-images.json (image orpheline)`
          );
        }
      }
    }

    // ── 5. Avertissement si déclinaison taille sans derniereMiseAJour récente ─
    for (const decl of tenue.tailles) {
      const dateMAJ = new Date(decl.derniereMiseAJour);
      const ageJours = (Date.now() - dateMAJ.getTime()) / (1000 * 60 * 60 * 24);
      if (ageJours > 90) {
        avertissements.push(
          `[tenues] id="${tenue.id}" taille=${decl.taille} — ` +
          `disponibilité vérifiée il y a ${Math.round(ageJours)} jours (derniereMiseAJour=${decl.derniereMiseAJour})`
        );
      }
    }

    // ── 6. Validation Section V : Pièces de la tenue & Médias de Détail ───────
    if (tenue.pieces && Array.isArray(tenue.pieces)) {
      for (const piece of tenue.pieces) {
        // Validation Zod de la pièce
        const pieceResult = PieceDetailSchema.safeParse(piece);
        if (!pieceResult.success) {
          for (const issue of pieceResult.error.issues) {
            erreurs.push(
              `[tenues] id="${tenue.id}" piece="${piece.id || 'inconnue'}" — ${issue.path.join(".")}: ${issue.message}`
            );
          }
        }

        // Validation spécifique zoneTouchable
        if (!piece.zoneTouchable) {
          erreurs.push(
            `[tenues] id="${tenue.id}" piece="${piece.id}" — zoneTouchable manquante (Section V obligatoire)`
          );
        } else {
          const { x, y, width, height, nomAccessible } = piece.zoneTouchable;
          if (
            typeof x !== "number" || x < 0 || x > 100 ||
            typeof y !== "number" || y < 0 || y > 100 ||
            typeof width !== "number" || width <= 0 || width > 100 ||
            typeof height !== "number" || height <= 0 || height > 100 ||
            !nomAccessible || nomAccessible.trim().length === 0
          ) {
            erreurs.push(
              `[tenues] id="${tenue.id}" piece="${piece.id}" — zoneTouchable invalide ou coordonnées hors limites (0-100)`
            );
          }
        }

        // Validation spécifique texteAlternatif (> 10 caractères)
        if (!piece.texteAlternatif || piece.texteAlternatif.trim().length <= 10) {
          erreurs.push(
            `[tenues] id="${tenue.id}" piece="${piece.id}" — texteAlternatif manquant ou trop court (doit faire plus de 10 caractères pour l'accessibilité)`
          );
        }

        // Validation spécifique rotation (si déclarée, nombreImages > 0)
        if (piece.rotation) {
          if (
            typeof piece.rotation.nombreImages !== "number" ||
            !Number.isInteger(piece.rotation.nombreImages) ||
            piece.rotation.nombreImages <= 0
          ) {
            erreurs.push(
              `[tenues] id="${tenue.id}" piece="${piece.id}" — rotation déclarée avec un nombre d'images invalide (nombreImages doit être > 0)`
            );
          }
          if (!piece.rotation.dossier || piece.rotation.dossier.trim().length === 0) {
            erreurs.push(
              `[tenues] id="${tenue.id}" piece="${piece.id}" — rotation déclarée sans dossier valide`
            );
          }
        }
      }
    }
  }

  // ── 6. Droits déclarés mais jamais référencés (images non utilisées) ──────
  const idsUtilises = new Set<string>();
  for (const tenue of tenues) {
    idsUtilises.add(tenue.imageId);
    tenue.imagesSecondairesIds?.forEach((id) => idsUtilises.add(id));
    tenue.coloris?.forEach((c) => idsUtilises.add(c.imageId));
  }
  for (const droit of droitsImages) {
    if (!idsUtilises.has(droit.id)) {
      avertissements.push(
        `[droits-images] id="${droit.id}" — déclaré dans le registre mais non utilisé dans tenues.ts`
      );
    }
  }

  // ── 7. Coloris (V5 §W) ────────────────────────────────────────────────────
  validerColoris(tenues, droitsParId, erreurs, avertissements);

  return {
    valide: erreurs.length === 0,
    erreurs,
    avertissements,
  };
}

/**
 * Version "bloquante" : lève une erreur si l'intégrité est invalide.
 * À appeler dans instrumentation.ts ou next.config.ts.
 */
export function validerIntegriteOuEchouer(
  tenues: Tenue[],
  droitsImages: DroitImage[]
): void {
  const resultat = validerIntegriteCatalogue(tenues, droitsImages);

  if (resultat.avertissements.length > 0) {
    console.warn(
      "[Catalogue] Avertissements d'intégrité :\n" +
      resultat.avertissements.map((a) => `  ⚠️  ${a}`).join("\n")
    );
  }

  if (!resultat.valide) {
    const message =
      `[Catalogue] ERREURS D'INTÉGRITÉ — ${resultat.erreurs.length} problème(s) détecté(s) :\n` +
      resultat.erreurs.map((e) => `  ❌ ${e}`).join("\n") +
      `\n\nCorrigez ces erreurs avant de démarrer l'application.`;
    throw new Error(message);
  }

  console.info(
    `[Catalogue] ✅ Intégrité validée — ${tenues.length} tenues, ${droitsImages.length} droits images.`
  );
}
