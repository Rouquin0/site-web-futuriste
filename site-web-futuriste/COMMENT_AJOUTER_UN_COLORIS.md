# Comment ajouter un coloris à une tenue

Règle : **chaque coloris est une vraie photo du vêtement réel dans ce coloris, porté par le mannequin.** Jamais de recoloration, ni de génération par IA : la couleur affichée doit être celle du produit vendu.

## 1. Photographier
Même mannequin, même pose, même cadrage, même fond, même lumière que la photo principale. Format portrait 3:4. Enregistrer en WebP dans `public/images/tenues/` (ex. `robe-wax-wenge-001-bleu.webp`).

## 2. Enregistrer les droits (`data/droits-images.json`)
Ajouter une entrée pour la nouvelle photo (id, fichier, source, licence, date, autorisation du mannequin, texte alternatif de 10 à 300 caractères décrivant la tenue et sa couleur, restrictions).

## 3. Déclarer les coloris (`data/tenues.ts`)
Ajouter `coloris` à la tenue (le premier coloris reprend la photo principale actuelle) :

```ts
coloris: [
  {
    id: "wenge",
    nom: "Wengé imprimé or",
    famille: "marron",
    pastille: { type: "couleur", valeur: "#4a2c1a" },
    imageId: "img-robe-wax-001-principale",
    defaut: true,
  },
  {
    id: "bleu-indigo",
    nom: "Bleu indigo",
    famille: "bleu",
    pastille: { type: "couleur", valeur: "#1f3a6e" },
    imageId: "img-robe-wax-001-bleu",
    // Facultatif : disponibilité propre à ce coloris (sinon : celle de la tenue)
    tailles: [
      { taille: "M", statut: "limite", derniereMiseAJour: "2026-11-14" },
    ],
  },
],
```

- **Tissus imprimés (wax, kente…)** : utiliser `pastille: { type: "motif", image: "/images/pastilles/wenge.webp" }` (extrait du motif), pas une couleur unie.
- Un seul coloris `defaut: true` par tenue.
- Les tailles d'un coloris doivent exister dans la tenue.

## 4. Vérifier
`npm test` contrôle les règles (un seul coloris par défaut, identifiants uniques, photo au registre des droits, tailles cohérentes).
