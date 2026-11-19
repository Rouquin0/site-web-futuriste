# Photos d'essai (4 vraies personnes)

Ces 4 photos remplacent les fichiers vides (33 octets) pour voir la couche d'animation avec de vrais visuels.
Les fiches (noms, prix, descriptions) n'ont pas été modifiées : elles ne correspondent donc pas aux vêtements visibles.

| Tenue du site | Fichier remplacé | Photo (Unsplash) |
|---|---|---|
| Robe Wax Wengé (vue en avant dans le hero) | `public/images/tenues/robe-wax-wenge-001.webp` | Khaled Ghareeb : robe bordeaux en tulle brodé |
| Ensemble Bazin Bleu Indigo | `public/images/tenues/ensemble-bazin-bleu-001.webp` | Dom Hill : ensemble jaune, terrain de basket |
| Robe de Soirée Satin Blanc Ivoire | `public/images/tenues/robe-soie-blanche-001.webp` | Oleg Ivanov : manteau noir effet reptile |
| Tailleur Ankara Terracotta & Orange | `public/images/tenues/tailleur-ankara-terracotta-001.webp` | Max Titov : manteau à motifs géométriques |
| Chemise Homme Kente | inchangé (fichier vide) | aucune photo d'homme fournie : le mannequin SVG s'affiche |

Format : WebP 1200 × 1600 (3:4), cadré à la main pour garder têtes et chaussures. `next/image` génère ensuite les tailles et formats adaptés.
Le registre `data/droits-images.json` indique la source, la licence et le statut « photo d'essai » de chacune.

## Avant la mise en ligne
- Remplacer ces 4 fichiers par tes vraies photos (mêmes noms de fichier, aucun code à changer) et mettre à jour le registre des droits.
- L'autorisation des mannequins n'est pas vérifiée (`autorisationMannequin: null`).
