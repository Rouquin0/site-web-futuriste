/**
 * data/paires.ts — Menu « Paires » : duos assortis qui défilent en boucle (V5 §Paires)
 * ────────────────────────────────────────────────────────────────────────────────────
 * Chaque « paire » est un duo de mannequins présenté côte à côte dans un rail
 * horizontal en circulation continue (boucle CSS, pause au survol / au focus).
 *
 * MANNEQUINS REMPLAÇABLES :
 *   `photoA` / `photoB` valent `null` tant que les photos ne sont pas envoyées.
 *   Le site affiche alors un mannequin de couture dessiné + « Photo à venir ».
 *   Photos à déposer dans `public/images/paires/` (WebP, 3:4, ≤ 180 Ko) puis
 *   renseignez les chemins, ex. "/images/paires/duo-ivoire-a.webp".
 */

export interface Paire {
  /** Identifiant unique (minuscules, chiffres, tirets) */
  id: string;
  /** Nom du duo (ex. « Duo Ivoire ») */
  nom: string;
  /** Phrase d'ambiance, rédigée par la boutique */
  description: string;
  /** Mannequin de gauche : photo WebP ou null si pas encore reçue */
  photoA: string | null;
  /** Mannequin de droite : photo WebP ou null si pas encore reçue */
  photoB: string | null;
  /** Textes alternatifs précis (obligatoires dès que la photo est renseignée) */
  texteAlternatifA: string;
  texteAlternatifB: string;
  /** Ordre de passage dans la boucle */
  ordreAffichage: number;
}

export const paires: Paire[] = [
  {
    id: "duo-ivoire-001",
    nom: "Duo Ivoire",
    description: "Deux silhouettes ivoire et bordeaux, pour les cérémonies de jour.",
    photoA: null, // ⏳ "/images/paires/duo-ivoire-001-a.webp" quand la photo arrive
    photoB: null, // ⏳ "/images/paires/duo-ivoire-001-b.webp" quand la photo arrive
    texteAlternatifA: "Mannequin du duo ivoire, silhouette A — photo à venir",
    texteAlternatifB: "Mannequin du duo ivoire, silhouette B — photo à venir",
    ordreAffichage: 1,
  },
  {
    id: "duo-terre-002",
    nom: "Duo Terre",
    description: "Beige froid et noir profond, l'alliance sobre de l'atelier.",
    photoA: null, // ⏳ "/images/paires/duo-terre-002-a.webp" quand la photo arrive
    photoB: null, // ⏳ "/images/paires/duo-terre-002-b.webp" quand la photo arrive
    texteAlternatifA: "Mannequin du duo terre, silhouette A — photo à venir",
    texteAlternatifB: "Mannequin du duo terre, silhouette B — photo à venir",
    ordreAffichage: 2,
  },
  {
    id: "duo-soir-003",
    nom: "Duo Soir",
    description: "Noir et bordeaux, la parure des soirées de Brazzaville.",
    photoA: null, // ⏳ "/images/paires/duo-soir-003-a.webp" quand la photo arrive
    photoB: null, // ⏳ "/images/paires/duo-soir-003-b.webp" quand la photo arrive
    texteAlternatifA: "Mannequin du duo soir, silhouette A — photo à venir",
    texteAlternatifB: "Mannequin du duo soir, silhouette B — photo à venir",
    ordreAffichage: 3,
  },
  {
    id: "duo-atelier-004",
    nom: "Duo Atelier",
    description: "Les essentiels de l'atelier, en double pour mieux comparer.",
    photoA: null, // ⏳ "/images/paires/duo-atelier-004-a.webp" quand la photo arrive
    photoB: null, // ⏳ "/images/paires/duo-atelier-004-b.webp" quand la photo arrive
    texteAlternatifA: "Mannequin du duo atelier, silhouette A — photo à venir",
    texteAlternatifB: "Mannequin du duo atelier, silhouette B — photo à venir",
    ordreAffichage: 4,
  },
];
