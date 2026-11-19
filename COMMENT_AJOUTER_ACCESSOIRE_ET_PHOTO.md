# Remplacer les mannequins par vos photos (Accessoires & Paires)

> Aucune compétence en programmation requise. Le site continue de fonctionner
> avec les mannequins dessinés tant que les photos ne sont pas envoyées.

## 1. Préparer vos photos

- Format **WebP**, ratio **3:4** (ex. 1200 × 1600 px), **≤ 180 Ko** chacune.
- Outil gratuit : **Squoosh.app** → redimensionner → exporter en WebP (qualité ~80 %).

## 2. Déposer les fichiers

- Accessoires → `public/images/accessoires/` (ex. `sandale-atelier-001.webp`)
- Paires → `public/images/paires/` (ex. `duo-ivoire-001-a.webp`)

## 3. Brancher les photos (2 minutes par photo)

Ouvrez `data/accessoires.ts` (ou `data/paires.ts`), trouvez la fiche et remplacez
`null` par le chemin :

```ts
photo: "/images/accessoires/sandale-atelier-001.webp",
```

Mettez aussi à jour le `texteAlternatif` avec une vraie description
(matière, couleur, forme). C'est tout : la boucle l'affiche automatiquement.

## 4. Vérifier

```bash
npm run typecheck
```

## Couleurs du site

- **Mode clair** : ivoire + beige froid + bordeaux `#7A1E2B` + noir.
- **Mode sombre** : le beige disparaît (remplacé par un brun-noir), le bordeaux
  s'éclaircit `#D78E98` et le noir reste en fond. Contrastes vérifiés (textes ≥ 7:1).
- Pour ajuster : `src/app/globals.css` (variables `--color-*`) et
  `src/design-tokens.ts` (mêmes valeurs documentées).
