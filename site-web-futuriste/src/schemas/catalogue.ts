/**
 * src/schemas/catalogue.ts — Schémas Zod de validation
 * Miroir strict des interfaces de src/types/catalogue.ts
 * Utilisé pour validation au démarrage et parsing des données.
 */

import { z } from "zod";

// ─── StatutDispo ──────────────────────────────────────────────────────────────
export const StatutDispoSchema = z.enum(["disponible", "limite", "epuise"]);

// ─── Taille ───────────────────────────────────────────────────────────────────
export const TailleSchema = z.enum(["XS", "S", "M", "L", "XL"]);

// ─── DroitImage ───────────────────────────────────────────────────────────────
export const DroitImageSchema = z.object({
  id: z.string().min(1, "L'id de l'image est obligatoire"),
  fichier: z
    .string()
    .min(1, "Le chemin de fichier est obligatoire")
    .regex(/^\//, "Le chemin doit être absolu (commencer par /)"),
  source: z.string().min(1, "La source de l'image est obligatoire"),
  licence: z.string().min(1, "La licence est obligatoire"),
  dateAcquisition: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD"),
  autorisationMannequin: z.boolean().nullable(),
  texteAlternatif: z
    .string()
    .min(10, "Le texte alternatif doit être descriptif (minimum 10 caractères)")
    .max(300, "Le texte alternatif ne doit pas dépasser 300 caractères"),
  restrictions: z.string().nullable(),
});

// ─── DeclinaisonTaille ────────────────────────────────────────────────────────
export const DeclinaisonTailleSchema = z.object({
  taille: TailleSchema,
  statut: StatutDispoSchema,
  quantiteInterne: z.number().int().nonnegative().optional(),
  derniereMiseAJour: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD"),
});

// ─── ConditionsVente ──────────────────────────────────────────────────────────
export const ConditionsVenteSchema = z.object({
  modesPaiement: z
    .array(z.string().min(1).max(100))
    .min(1, "Au moins un mode de paiement requis")
    .max(20),
  affichagePrix: z.enum(["TTC", "HT"]),
  zonesLivraison: z
    .array(
      z.object({
        zone: z.string().min(1).max(100),
        delai: z.string().min(1).max(100),
        frais: z.string().min(1).max(100),
      })
    )
    .max(50),
  politiqueEchange: z.string().min(1).max(2000, "La politique d'échange est obligatoire"),
  retraitBoutique: z.boolean(),
});

// ─── Section V : Pièces de la tenue & Médias de Détail ─────────────────────────

export const ZoneTouchableSchema = z.object({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  width: z.number().min(1).max(100),
  height: z.number().min(1).max(100),
  nomAccessible: z.string().min(1).max(150),
});

export const PieceDetailSchema = z.object({
  id: z.string().min(1).max(100),
  nom: z.string().min(1).max(150),
  type: z.enum(["vetement", "accessoire"]),
  matiere: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  texteAlternatif: z.string().min(10).max(300),
  zoneTouchable: ZoneTouchableSchema,
  photos: z.array(z.string().min(1).max(500)).max(20),
  rotation: z
    .object({
      dossier: z.string().min(1).max(500),
      nombreImages: z.number().int().min(1).max(72),
    })
    .optional(),
  modele3d: z
    .object({
      fichierGlb: z.string().min(1).max(500),
      poster: z.string().min(1).max(500),
    })
    .optional(),
  prixXAF: z.number().int().positive().optional(),
});

// ─── Coloris (V5 §W) ──────────────────────────────────────────────────────────
export const ColorisSchema = z.object({
  id: z.string().min(1).max(60).regex(/^[a-z0-9-]+$/, "Identifiant de coloris : minuscules, chiffres, tirets"),
  nom: z.string().min(1).max(60),
  famille: z.string().min(1).max(40),
  pastille: z.discriminatedUnion("type", [
    z.object({ type: z.literal("couleur"), valeur: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Couleur attendue : #RRGGBB") }),
    z.object({ type: z.literal("motif"), image: z.string().min(1).max(500) }),
  ]),
  imageId: z.string().min(1).max(100),
  defaut: z.boolean().optional(),
  tailles: z.array(DeclinaisonTailleSchema).max(10).optional(),
});

// ─── Tenue ────────────────────────────────────────────────────────────────────
export const TenueSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "L'id doit être en minuscules, chiffres et tirets uniquement"
    ),
  slug: z
    .string()
    .min(1)
    .max(150)
    .regex(
      /^[a-z0-9-]+$/,
      "Le slug doit être URL-safe (minuscules, chiffres, tirets)"
    ),
  nom: z.string().min(1).max(200, "Le nom de la tenue est obligatoire"),
  genre: z.enum(["femme", "homme", "unisexe", "enfant"]),
  categorie: z.string().min(1).max(100),
  collection: z.string().min(1).max(100),
  descriptionCourte: z
    .string()
    .min(10)
    .max(200, "Description courte : 200 caractères max"),
  descriptionLongue: z.string().min(20).max(3000),
  matiere: z.string().min(1).max(200),
  couleurs: z.array(z.string().min(1).max(50)).min(1, "Au moins une couleur requise").max(20),
  prixXAF: z
    .number()
    .int("Le prix doit être un entier (pas de décimales)")
    .positive("Le prix doit être positif"),
  reference: z.string().min(1).max(50),
  imageId: z.string().min(1).max(100, "imageId obligatoire — doit exister dans droits-images.json"),
  imagesSecondairesIds: z.array(z.string().min(1).max(100)).max(20).optional(),
  tailles: z
    .array(DeclinaisonTailleSchema)
    .min(1, "Au moins une taille requise")
    .max(10),
  ordreAffichage: z.number().int().nonnegative(),
  dateMiseEnLigne: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD"),
  enAvant: z.boolean(),
  pieces: z.array(PieceDetailSchema).max(20).optional(),
  coloris: z.array(ColorisSchema).max(12).optional(),
});

// ─── Types inférés depuis Zod (source de vérité pour le runtime) ───────────────
export type StatutDispoZ = z.infer<typeof StatutDispoSchema>;
export type TailleZ = z.infer<typeof TailleSchema>;
export type DroitImageZ = z.infer<typeof DroitImageSchema>;
export type DeclinaisonTailleZ = z.infer<typeof DeclinaisonTailleSchema>;
export type ConditionsVenteZ = z.infer<typeof ConditionsVenteSchema>;
export type ZoneTouchableZ = z.infer<typeof ZoneTouchableSchema>;
export type PieceDetailZ = z.infer<typeof PieceDetailSchema>;
export type TenueZ = z.infer<typeof TenueSchema>;

// ─── Schémas de collections ───────────────────────────────────────────────────
export const TenuesArraySchema = z.array(TenueSchema).min(1).max(1000);
export const DroitsImagesArraySchema = z.array(DroitImageSchema).min(1).max(2000);
