/**
 * src/types/catalogue.ts — Interfaces TypeScript strictes du catalogue
 * Devise : XAF uniquement. Prix = entier positif sans décimales.
 * Ex. : 45000 représente 45 000 FCFA.
 */

// ─── Statut de disponibilité ──────────────────────────────────────────────────
export type StatutDispo = "disponible" | "limite" | "epuise";

// ─── Droits sur une image ─────────────────────────────────────────────────────
export interface DroitImage {
  /** Identifiant unique de l'image — doit correspondre à imageId dans Tenue */
  id: string;
  /** Chemin relatif du fichier image (ex: "/images/tenues/robe-wax-001.webp") */
  fichier: string;
  /** Source exacte de l'image (photographe, fournisseur, banque d'images) */
  source: string;
  /** Licence applicable (ex: "Propriétaire — photo prise par X", "CC BY 4.0", "Unsplash license") */
  licence: string;
  /** Date d'acquisition ou de prise de vue (ISO 8601 : YYYY-MM-DD) */
  dateAcquisition: string;
  /** Autorisation explicite du/de la mannequin (true = oui, false = non, null = sans mannequin) */
  autorisationMannequin: boolean | null;
  /**
   * Texte alternatif décrivant la tenue avec précision.
   * RÈGLE : doit décrire la coupe, la couleur et le style du vêtement.
   * INTERDIT : laisser vide.
   */
  texteAlternatif: string;
  /** Restrictions éventuelles d'usage (ex: "usage web uniquement", null = aucune) */
  restrictions: string | null;
}

// ─── Déclinaison par taille ───────────────────────────────────────────────────
export type Taille = "XS" | "S" | "M" | "L" | "XL";

export interface DeclinaisonTaille {
  taille: Taille;
  statut: StatutDispo;
  /**
   * Quantité interne (jamais affichée côté client).
   * Optionnelle — sert uniquement à la gestion interne.
   */
  quantiteInterne?: number;
  /** Date de dernière vérification de dispo (ISO 8601 : YYYY-MM-DD) */
  derniereMiseAJour: string;
}

// ─── Conditions de vente ──────────────────────────────────────────────────────
export interface ConditionsVente {
  /** Modes de paiement acceptés — fournis par le client, non inventés */
  modesPaiement: string[];
  /** Affichage des prix TTC ou HT */
  affichagePrix: "TTC" | "HT";
  /** Zones de livraison avec délais et frais */
  zonesLivraison: Array<{
    zone: string;
    delai: string;
    frais: string;
  }>;
  /** Politique d'échange et de retour */
  politiqueEchange: string;
  /** Retrait en boutique possible */
  retraitBoutique: boolean;
}

// ─── Coloris (variantes de couleur — V5 §W) ───────────────────────────────────
export type PastilleColoris =
  | { type: "couleur"; valeur: string }
  | { type: "motif"; image: string };

export interface Coloris {
  /** Identifiant unique dans la tenue (ex: "bleu-indigo") */
  id: string;
  /** Nom affiché en toutes lettres (ex: "Bleu indigo") */
  nom: string;
  /** Famille normalisée pour le filtre catalogue (ex: "bleu", "imprime") */
  famille: string;
  /** Pastille : couleur unie (hex) ou extrait de motif (image) */
  pastille: PastilleColoris;
  /**
   * Photo du vêtement RÉEL dans ce coloris, porté par le mannequin.
   * DOIT exister dans droits-images.json. Jamais de recoloration numérique.
   */
  imageId: string;
  /** Un seul coloris par défaut par tenue */
  defaut?: boolean;
  /** Disponibilité par taille pour CE coloris (sinon : celle de la tenue) */
  tailles?: DeclinaisonTaille[];
}

// ─── Tenue (entité principale) ────────────────────────────────────────────────
export interface Tenue {
  /** Identifiant unique non modifiable (ex: "robe-wax-001") */
  id: string;
  /** Slug URL-safe pour la fiche produit (ex: "robe-wax-wenge-imprime-fleche") */
  slug: string;
  /** Nom commercial de la tenue */
  nom: string;
  /** Genre cible */
  genre: "femme" | "homme" | "unisexe" | "enfant";
  /** Catégorie (robe, ensemble, chemise, pantalon, etc.) */
  categorie: string;
  /** Collection d'appartenance (ex: "Printemps 2026", "Capsule Wax") */
  collection: string;
  /** Description courte (1-2 phrases, affichée dans le catalogue) */
  descriptionCourte: string;
  /** Description longue (fiche produit complète) */
  descriptionLongue: string;
  /** Matière / composition */
  matiere: string;
  /** Couleurs disponibles (ex: ["Wengé imprimé", "Bleu indigo"]) */
  couleurs: string[];
  /**
   * Prix en XAF — entier positif sans décimales.
   * 45000 = 45 000 FCFA. Formaté via formatPriceXAF().
   */
  prixXAF: number;
  /** Référence interne (ex: "RW-2026-001") */
  reference: string;
  /**
   * Identifiant de l'image principale.
   * DOIT correspondre à une entrée valide dans droits-images.json.
   */
  imageId: string;
  /**
   * Identifiants des images secondaires (optionnel).
   * Chacun DOIT correspondre à une entrée valide dans droits-images.json.
   */
  imagesSecondairesIds?: string[];
  /** Déclinaisons par taille avec statut de disponibilité */
  tailles: DeclinaisonTaille[];
  /** Ordre d'affichage dans le défilé et le catalogue (plus petit = premier) */
  ordreAffichage: number;
  /** Date de mise en ligne initiale (ISO 8601) */
  dateMiseEnLigne: string;
  /** Mise en avant sur la page d'accueil */
  enAvant: boolean;
  /** Pièces composant la tenue et détails d'interaction (Section V) */
  pieces?: PieceDetail[];
  /**
   * Variantes de couleur (Section W). Optionnel : sans ce champ, la tenue
   * garde son unique couleur (`couleurs`) et aucune pastille n'est affichée.
   */
  coloris?: Coloris[];
}

// ─── Section V : Pièces de la tenue & Médias de Détail ─────────────────────────

export interface ZoneTouchable {
  /** Coordonnée X en pourcentage de l'image (0 à 100) */
  x: number;
  /** Coordonnée Y en pourcentage de l'image (0 à 100) */
  y: number;
  /** Largeur de la zone en pourcentage (0 à 100) */
  width: number;
  /** Hauteur de la zone en pourcentage (0 à 100) */
  height: number;
  /** Nom accessible lu par le lecteur d'écran (ex: "Voir la veste en détail") */
  nomAccessible: string;
}

export interface PieceDetail {
  /** Identifiant unique de la pièce (ex: "veste-ankara-01") */
  id: string;
  /** Nom de la pièce */
  nom: string;
  /** Type de pièce */
  type: "vetement" | "accessoire";
  /** Matière / composition spécifique */
  matiere: string;
  /** Description de la pièce */
  description: string;
  /** Description accessible de la pièce pour les lecteurs d'écran */
  texteAlternatif: string;
  /** Zone touchable sur le mannequin */
  zoneTouchable: ZoneTouchable;
  /** Niveau 1 : Gros plans macros (chemins d'accès WebP) */
  photos: string[];
  /** Niveau 2 : Rotation 360° photo (dossier et nombre d'images) */
  rotation?: {
    dossier: string;
    nombreImages: number;
  };
  /** Niveau 3 : Modèle 3D GLB optionnel (réservé Lot 3) */
  modele3d?: {
    fichierGlb: string;
    poster: string;
  };
  /** Prix unitaire en XAF si la pièce est vendue séparément */
  prixXAF?: number;
}
