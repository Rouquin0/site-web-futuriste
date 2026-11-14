# COMMENT_AJOUTER_UNE_TENUE.md
> Guide pratique pas à pas pour les gestionnaires et créateurs de la boutique à Brazzaville.
> Aucune compétence en programmation n'est requise.

Ce document explique comment mettre en ligne une nouvelle tenue dans la vitrine immersive et le catalogue tout en respectant les règles juridiques et techniques du site.

---

## Sommaire
1. [Étape 1 : Réaliser les photographies en studio](#étape-1--réaliser-les-photographies-en-studio)
2. [Étape 2 : Préparer et optimiser les images](#étape-2--préparer-et-optimiser-les-images)
3. [Étape 3 : Placer les fichiers dans le projet](#étape-3--placer-les-fichiers-dans-le-projet)
4. [Étape 4 : Déclarer les droits dans `droits-images.json`](#étape-4--déclarer-les-droits-dans-droits-imagesjson)
5. [Étape 5 : Créer la fiche de la tenue dans `data/tenues.ts`](#étape-5--créer-la-fiche-de-la-tenue-dans-datatenuests)
6. [Étape 6 : Vérifier et publier](#étape-6--vérifier-et-publier)
7. [Dépannage & Erreurs fréquentes](#dépannage--erreurs-fréquentes)

---

## Étape 1 : Réaliser les photographies en studio

Avant toute saisie, réalisez les prises de vue en suivant rigoureusement les deux guides studio :
- **Pour la tenue entière** : suivez `GUIDE_PHOTOS.md` (ratio 3:4 portrait, fond gris neutre mat 18%, hauteur minimale 2400 px, visage anonymisé).
- **Pour les pièces de détail** : suivez `GUIDE_PHOTOS_DETAIL.md` (3 à 5 photos macro des finitions et série de 24 clichés à 15° sur plateau tournant pour la rotation 360°).

> ⚠️ **Règle absolue** : Les images Pinterest sont formellement interdites. Seules les photographies de vos créations réelles peuvent être publiées.

---

## Étape 2 : Préparer et optimiser les images

Le site doit s'ouvrir instantanément sur mobile à Brazzaville. Les photos doivent être converties au format moderne **WebP** :
1. Utilisez un outil simple et gratuit comme **Squoosh.app** ou **TinyPNG**.
2. Réglez la largeur à **1200 px** (la hauteur s'ajustera automatiquement à **1600 px** pour respecter le ratio 3:4).
3. Choisissez le format **WebP** avec une qualité de **80 % à 85 %**.
4. Vérifiez le poids : l'image principale doit peser **moins de 180 Ko**, et chaque image de rotation 360° **moins de 45 Ko**.

---

## Étape 3 : Placer les fichiers dans le projet

Déposez vos images dans les dossiers correspondants du site :

- **Photo principale de la tenue** :
  `public/images/tenues/nom-de-votre-tenue-001.webp`
- **Photos macros des pièces** :
  `public/images/pieces/nom-de-votre-tenue-001/col-macro-01.webp`
- **Rotation 360° (les 24 images)** :
  `public/images/pieces/nom-de-votre-tenue-001/col-360/frame-01.webp` à `frame-24.webp`

---

## Étape 4 : Déclarer les droits dans `droits-images.json`

Ouvrez le fichier `data/droits-images.json`. Chaque image publiée doit avoir son enregistrement légal. Ajoutez un bloc comme celui-ci :

```json
{
  "id": "img-votre-tenue-001-principale",
  "fichier": "/images/tenues/votre-tenue-001.webp",
  "source": "[À COMPLÉTER — Nom du photographe ou de l'atelier]",
  "licence": "[À COMPLÉTER — Cession de droits signée le YYYY-MM-DD]",
  "dateAcquisition": "2026-11-15",
  "autorisationMannequin": null,
  "texteAlternatif": "Robe longue en tissu kita rouge et or, col montant droit, manches courtes évasées, sur fond gris neutre",
  "restrictions": null
}
```

### Règles obligatoires pour le texte alternatif (`texteAlternatif`) :
- Doit faire **au moins 10 caractères**.
- **Interdit** : ne jamais utiliser de mots vagues comme « photo », « image » ou simplement « vêtement ».
- **Recommandé** : décrivez la coupe, la couleur exacte, la matière et les finitions visibles.

---

## Étape 5 : Créer la fiche de la tenue dans `data/tenues.ts`

Ouvrez `data/tenues.ts` et ajoutez votre tenue dans le tableau `tenues` :

```typescript
{
  id: "robe-kita-rouge-001",
  slug: "robe-longue-kita-rouge-et-or",
  nom: "Robe Longue Kita Rouge et Or",
  genre: "femme", // "femme" | "homme" | "unisexe" | "enfant"
  categorie: "robe",
  collection: "Capsule Cérémonie 2026",
  descriptionCourte: "Robe longue d'apparat en kita rouge rehaussé de fils dorés. Col montant et manches courtes évasées.",
  descriptionLongue: "Confectionnée artisanalement dans un kita de haute facture...",
  matiere: "Kita traditionnel tissé main (coton et soie)",
  couleurs: ["Rouge et or"],
  prixXAF: 75000, // Entier positif sans virgule (75 000 FCFA)
  reference: "RK-2026-001",
  imageId: "img-votre-tenue-001-principale", // Doit être identique à l'id dans droits-images.json
  tailles: [
    { taille: "XS", statut: "disponible", derniereMiseAJour: "2026-11-15" },
    { taille: "S",  statut: "disponible", derniereMiseAJour: "2026-11-15" },
    { taille: "M",  statut: "limite",     derniereMiseAJour: "2026-11-15" },
    { taille: "L",  statut: "epuise",     derniereMiseAJour: "2026-11-15" },
    { taille: "XL", statut: "epuise",     derniereMiseAJour: "2026-11-15" },
  ],
  ordreAffichage: 6, // Position dans le défilé (1, 2, 3...)
  dateMiseEnLigne: "2026-11-15",
  enAvant: true,
}
```

### Règles importantes :
- **Prix** : toujours en FCFA (XAF), un nombre entier sans décimales (`75000` et non `75000.00` ou `"75 000"`).
- **Statuts de disponibilité** : `"disponible"`, `"limite"` (dernières pièces), ou `"epuise"`.
- **Lien avec les droits** : la valeur `imageId` doit correspondre exactement à une entrée existante dans `droits-images.json`.

---

## Étape 6 : Vérifier et publier

Avant de mettre en ligne, lancez la vérification automatique :
```bash
npm run typecheck
```
Si toutes les étapes ont été respectées, les vérifications valident l'intégration et votre nouvelle tenue apparaît immédiatement dans le défilé et dans le catalogue !

---

## Dépannage & Erreurs fréquentes

| Message d'erreur | Cause | Solution |
| :--- | :--- | :--- |
| `Image non trouvée dans droits-images.json` | L'`imageId` dans `tenues.ts` ne correspond à aucun `id` du registre. | Vérifiez l'orthographe exacte de l'`id`. |
| `Texte alternatif trop court ou invalide` | Le texte fait moins de 10 caractères ou contient un mot interdit ("image", "photo"). | Rédigez une vraie description de la coupe et du tissu. |
| `Prix invalide` | Le prix contient des virgules, lettres ou est négatif. | Indiquez un nombre entier comme `45000`. |
| `Build production bloqué : [À COMPLÉTER]` | Un champ de droits ou de configuration contient encore la mention de travail. | Remplacez par le nom du photographe ou la date de contrat réelle. |
