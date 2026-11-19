/**
 * data/accessoires.ts — Catalogue des accessoires (V5 §Accessoires)
 * ─────────────────────────────────────────────────────────────────────
 * 4 univers : sandales · ceintures · chaînes · bagues.
 *
 * MANNEQUINS REMPLAÇABLES :
 *   Chaque article a un champ `photo` qui vaut `null` tant que la photo
 *   n'a pas été envoyée. Le site affiche alors un mannequin de couture
 *   dessiné + un badge « Photo à venir ».
 *   Quand vous recevez vos photos : déposez le fichier dans
 *   `public/images/accessoires/` (format WebP, 3:4, ≤ 180 Ko) puis
 *   remplacez `null` par le chemin, ex. "/images/accessoires/sandale-01.webp".
 *
 * RÈGLES :
 *  - Prix en XAF : entier positif, sans décimales.
 *  - `id` en minuscules-chiffres-tirets, unique.
 *  - Ne jamais inventer de photo : `null` = pas encore reçue.
 */

export type CategorieAccessoire = "sandales" | "ceintures" | "chaines" | "bagues";

export interface CategorieAccessoireInfo {
  id: CategorieAccessoire;
  nom: string;
  pluriel: string;
  description: string;
}

export const categoriesAccessoires: CategorieAccessoireInfo[] = [
  {
    id: "sandales",
    nom: "Sandales",
    pluriel: "Sandales",
    description: "Sandales d'atelier, du quotidien aux cérémonies.",
  },
  {
    id: "ceintures",
    nom: "Ceintures",
    pluriel: "Ceintures",
    description: "Ceintures pour structurer robes, tailleurs et ensembles.",
  },
  {
    id: "chaines",
    nom: "Chaînes",
    pluriel: "Chaînes",
    description: "Chaînes et colliers, touche finale du défilé.",
  },
  {
    id: "bagues",
    nom: "Bagues",
    pluriel: "Bagues",
    description: "Bagues assorties aux tissus et aux dorures.",
  },
];

export interface Accessoire {
  /** Identifiant unique (minuscules, chiffres, tirets) */
  id: string;
  /** Nom commercial */
  nom: string;
  /** Univers de rattachement (sous-menu) */
  categorie: CategorieAccessoire;
  /** Matière / composition */
  matiere: string;
  /** Prix en XAF, entier positif */
  prixXAF: number;
  /** Référence interne */
  reference: string;
  /** Chemin photo WebP ou null si photo pas encore reçue */
  photo: string | null;
  /** Texte alternatif précis (obligatoire dès que photo renseignée) */
  texteAlternatif: string;
  /** Mise en avant dans la boucle */
  enAvant: boolean;
  /** Ordre d'affichage dans l'univers */
  ordreAffichage: number;
}

export const accessoires: Accessoire[] = [
  // ─── Sandales ──────────────────────────────────────────────────────────
  {
    id: "sandale-atelier-001",
    nom: "Sandale Atelier N°1",
    categorie: "sandales",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 15000,
    reference: "AC-SA-001",
    photo: null, // ⏳ Remplacez par "/images/accessoires/sandale-atelier-001.webp" quand la photo arrive
    texteAlternatif: "Sandale d'atelier — photo à venir",
    enAvant: true,
    ordreAffichage: 1,
  },
  {
    id: "sandale-ceremonie-002",
    nom: "Sandale Cérémonie N°2",
    categorie: "sandales",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 25000,
    reference: "AC-SA-002",
    photo: null, // ⏳ Remplacez par "/images/accessoires/sandale-ceremonie-002.webp" quand la photo arrive
    texteAlternatif: "Sandale de cérémonie — photo à venir",
    enAvant: true,
    ordreAffichage: 2,
  },
  // ─── Ceintures ─────────────────────────────────────────────────────────
  {
    id: "ceinture-atelier-001",
    nom: "Ceinture Atelier N°1",
    categorie: "ceintures",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 8000,
    reference: "AC-CE-001",
    photo: null, // ⏳ Remplacez par "/images/accessoires/ceinture-atelier-001.webp" quand la photo arrive
    texteAlternatif: "Ceinture d'atelier — photo à venir",
    enAvant: true,
    ordreAffichage: 1,
  },
  {
    id: "ceinture-ceremonie-002",
    nom: "Ceinture Cérémonie N°2",
    categorie: "ceintures",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 12000,
    reference: "AC-CE-002",
    photo: null, // ⏳ Remplacez par "/images/accessoires/ceinture-ceremonie-002.webp" quand la photo arrive
    texteAlternatif: "Ceinture de cérémonie — photo à venir",
    enAvant: false,
    ordreAffichage: 2,
  },
  // ─── Chaînes ───────────────────────────────────────────────────────────
  {
    id: "chaine-atelier-001",
    nom: "Chaîne Atelier N°1",
    categorie: "chaines",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 10000,
    reference: "AC-CH-001",
    photo: null, // ⏳ Remplacez par "/images/accessoires/chaine-atelier-001.webp" quand la photo arrive
    texteAlternatif: "Chaîne d'atelier — photo à venir",
    enAvant: true,
    ordreAffichage: 1,
  },
  {
    id: "chaine-ceremonie-002",
    nom: "Chaîne Cérémonie N°2",
    categorie: "chaines",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 18000,
    reference: "AC-CH-002",
    photo: null, // ⏳ Remplacez par "/images/accessoires/chaine-ceremonie-002.webp" quand la photo arrive
    texteAlternatif: "Chaîne de cérémonie — photo à venir",
    enAvant: false,
    ordreAffichage: 2,
  },
  // ─── Bagues ────────────────────────────────────────────────────────────
  {
    id: "bague-atelier-001",
    nom: "Bague Atelier N°1",
    categorie: "bagues",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 5000,
    reference: "AC-BA-001",
    photo: null, // ⏳ Remplacez par "/images/accessoires/bague-atelier-001.webp" quand la photo arrive
    texteAlternatif: "Bague d'atelier — photo à venir",
    enAvant: true,
    ordreAffichage: 1,
  },
  {
    id: "bague-ceremonie-002",
    nom: "Bague Cérémonie N°2",
    categorie: "bagues",
    matiere: "[À COMPLÉTER — matière]",
    prixXAF: 9000,
    reference: "AC-BA-002",
    photo: null, // ⏳ Remplacez par "/images/accessoires/bague-ceremonie-002.webp" quand la photo arrive
    texteAlternatif: "Bague de cérémonie — photo à venir",
    enAvant: false,
    ordreAffichage: 2,
  },
];
