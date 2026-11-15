# COMMENT AJOUTER VOS 4 PHOTOS + VRAIS COMPTES SOCIAUX

> Tout a été préparé pour que **chaque visuel ait son 360°** et que les
> boutons WhatsApp / Instagram / Facebook pointent vers **vos vrais comptes**.
> Aucune compétence code requise : remplacez les fichiers et les liens.

---

## 1. Vos 4 photos (remplacer les visuels actuels)

Déposez vos images (format **WebP**, ratio **3:4**, ex. 1200 × 1600 px) ici :

| Tenue | Fichier à remplacer |
|---|---|
| Robe Wax Wengé | `public/images/tenues/robe-wax-wenge-001.webp` |
| Ensemble Bazin Bleu | `public/images/tenues/ensemble-bazin-bleu-001.webp` |
| Chemise Kente Homme | `public/images/tenues/chemise-kente-multicolore-001.webp` |
| Robe Satin Blanc | `public/images/tenues/robe-soie-blanche-001.webp` |
| Tailleur Ankara | `public/images/tenues/tailleur-ankara-terracotta-001.webp` |

Gardez **exactement les mêmes noms de fichiers** : le site les reprend
automatiquement, 360° compris. Videz le cache du navigateur après envoi
(Ctrl+F5) pour voir les nouvelles photos.

## 2. Le 360° — comment ça marche pour TOUTES les tenues

Bonne nouvelle : **aucune action requise**. Chaque visuel du défilé porte
désormais un bouton **« 360° » en bas à droite** qui ouvre la vue immersive :

- **Sans dossier de frames** → mode **Studio 360°** : la photo pivote en 3D
  au glisser du doigt, avec compteur de degrés 0→360° et jauge d'angle.
- **Avec dossier de frames** (optionnel, qualité maximale) → vraie rotation
  photo par photo, comme pour la robe wax.

### Passer en vraie rotation 360° (optionnel, par tenue)

1. Photographiez la tenue sur plateau tournant : **24 photos tous les 15°**
   (voir `GUIDE_PHOTOS_DETAIL.md`).
2. Exportez en WebP léger (≤ 45 Ko / image) nommées `frame-01.webp` …
   `frame-24.webp`.
3. Créez le dossier, ex. pour le bazin :
   `public/images/pieces/rotation-ensemble-bazin/` et déposez-y les 24 frames.
4. Dans `data/tenues.ts`, ajoutez la rotation à la pièce concernée :

```ts
rotation: {
  dossier: "/images/pieces/rotation-ensemble-bazin",
  nombreImages: 24,
},
```

Le visualiseur détecte automatiquement les frames ; si elles manquent, il
rebascule en Studio 360° (aucun écran cassé).

## 3. Vos vrais comptes WhatsApp / Instagram / Facebook

Ouvrez **`site.config.ts`** et remplacez les 3 liens (lignes `sociaux`) :

```ts
sociaux: {
  whatsapp: "https://wa.me/242060000000?...",   // votre numéro, format international sans +
  instagram: "https://instagram.com/votre.compte",
  facebook: "https://facebook.com/votrepage",
},
```

Le pied de page, le hero et tous les boutons de commande utilisent ces liens
automatiquement. Le numéro WhatsApp des commandes (`telephoneWhatsApp`)
reste la source du lien `wa.me` des fiches pièces.

## 4. Filtre Femme / Homme

Le segment **Tous · Femme · Homme** au-dessus du défilé filtre en direct.
Le genre est défini par tenue dans `data/tenues.ts` (champ `genre` :
`"femme" | "homme" | "unisexe" | "enfant"` — `unisexe` apparaît dans les
deux vestiaires).

## 5. Remettre en ligne

```bash
npm install
npm run typecheck && npm test
npm run build
git add -A && git commit -m "Vitrine pro : footer social, 360° universel, filtre vestiaire" && git push
```

En cas de blocage du build sur le nom provisoire (`estNomProvisoire`),
renseignez le vrai nom dans `site.config.ts` puis repassez
`estNomProvisoire: false`.
