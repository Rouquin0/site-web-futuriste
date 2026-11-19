# GUIDE_PHOTOS.md — Protocole Studio pour Tenues Entières
> Référence officielle pour les prises de vue en pied — Vertical Fashion Showcase (V4.4)
> Marché : Brazzaville (République du Congo)

---

## 1. Objectifs & Exigences Fondamentales

1. **Zéro Look IA** : Le site proscrit expressément les rendus de synthèse, les peaux plastifiées, les doigts surnuméraires et les dégradés artificiels. Toutes les images publiées doivent provenir de shootings réels en studio avec les vêtements réels en stock.
2. **Proscription absolue de Pinterest** : Les planches d'inspiration Pinterest ne sont JAMAIS importées, ni publiées, ni détourées, ni rhabillées dans le projet. Modifier ou détourer une image Pinterest ne supprime pas les droits de son auteur.
3. **Fidélité au produit physique** : Les couleurs, textures, motifs (wax wengé, bazin indigo, kente) et coupes doivent correspondre rigoureusement aux pièces confectionnées dans l'atelier et livrées aux clientes à Brazzaville.
4. **Unicité du mannequin visible** : La scénographie web n'affiche qu'un seul mannequin à la fois. Le cadrage et la posture doivent garantir une harmonie totale lors des transitions verticales GSAP.

---

## 2. Standards Techniques du Studio

| Critère | Valeur Requise | Justification & Impact Web |
| :--- | :--- | :--- |
| **Ratio d'aspect** | **3:4 vertical strict** (ex. 1800 × 2400 px) | Élimine 100% des décalages de mise en page (CLS < 0.1) sur smartphone et ordinateur. |
| **Résolution Master** | $\ge$ 2 400 px de hauteur (recommandé 2400 × 3200 px) | Permet un affichage haute définition sur écrans Retina et zoom plein écran. |
| **Fond de studio** | **Gris neutre mat 18%** (Réflectance Kodak standard) | **Compatible avec les 2 thèmes** : ne choque ni en mode clair (#FAFAF9) ni en mode sombre (#1C1917). Évite le détourage destructeur. |
| **Focale** | 85 mm ou 105 mm fixe (plein format) | Élimine les distorsions optiques et préserve les proportions exactes des longueurs de robes/pantalons. |
| **Hauteur d'appareil** | 1,10 m à 1,15 m du sol, rigoureusement de niveau | Cadrage centré à mi-hauteur pour fluidifier le défilement immersif d'une tenue à l'autre. |
| **Éclairage** | Boîtes à lumière diffuses, température 5 500 K, CRI > 95 | Rendu fidèle des pigments et teintures sans reflets spéculaires excessifs ni ombres dures. |

---

## 3. Direction Artistique & Traitement du Mannequin

- **Anonymisation élégante** : Conformément à la Section B de la V4.4, le mannequin a la tête lisse, sans yeux, nez, ni bouche identifiables. Le visage est neutralisé de façon douce et homogène pour concentrer le regard exclusivement sur l'artisanat textile.
- **Posture** : En pied (tête et chaussures intégralement visibles), pose sobre et naturelle de haute couture. Bras légèrement détachés du buste pour révéler la découpe des manches et de la taille.
- **Mixité** : Mannequins féminins et masculins adaptés aux collections (Capsule Wax, Bazin Prestige, Collection Homme).

---

## 4. Chaîne d'Exportation & Optimisation Web

1. **Master archivé** : Sauvegarder les fichiers originaux bruts (RAW/TIFF 16 bits) hors du dépôt Git dans le cloud d'archivage sécurisé de la boutique.
2. **Export WebP / AVIF** :
   - Profil colorimétrique : sRGB standard.
   - Poids cible par image : **$\le$ 180 Ko** pour un chargement fluide sur smartphone en réseau 3G/4G à Brazzaville.
   - Qualité de compression recommandée : WebP 82-85%.
3. **Chemin & Nommage standardisé** :
   `public/images/tenues/[slug-de-la-tenue].webp`
   *Exemple :* `public/images/tenues/robe-wax-wenge-001.webp`

---

## 5. Droits & Obligations Légales (Section G)

Avant toute mise en ligne :
- Contrat de cession écrite des droits patrimoniaux signé par le photographe.
- Accord d'exploitation d'image signé par le mannequin.
- Renseignement obligatoire de la fiche dans `data/droits-images.json`.
- Rédaction d'un texte alternatif descriptif complet (matière, coupe, couleur, finitions). Tout texte générique ("photo", "vêtement") ou vide bloque le build.
