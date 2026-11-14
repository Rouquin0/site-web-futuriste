/**
 * src/lib/images.ts — Résolution des images via le registre des droits
 */
import droitsImagesData from "../../data/droits-images.json";
import type { DroitImage } from "../types/catalogue";

const droitsMap = new Map<string, DroitImage>(
  (droitsImagesData as DroitImage[]).map((d) => [d.id, d])
);

export interface ImageResolue {
  src: string;
  alt: string;
}

/** Retourne le fichier et le texte alternatif d'une image du registre. */
export function resoudreImage(imageId: string, altRepli = ""): ImageResolue {
  const droit = droitsMap.get(imageId);
  return {
    src: droit?.fichier ?? `/images/tenues/${imageId}.webp`,
    alt: droit?.texteAlternatif ?? altRepli,
  };
}
