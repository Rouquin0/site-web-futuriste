# Mise à jour V5 — accueil, défilé horizontal, coloris

## Installation
1. Copier le contenu de ce zip **à la racine du projet** (les chemins sont déjà les bons), en acceptant le remplacement des fichiers.
2. `npm install` puis `npm run dev`. Aucun changement de `package.json` : le projet utilise déjà GSAP (dont ScrollTrigger, inclus dans le même paquet).
3. Pour lancer les tests : `npm install -D vite@^7.3.2 @testing-library/dom` (une seule fois), puis `npm test`.

## Ce qui change pour le visiteur
- **Accueil** plein écran : dessin technique en SVG (anneaux gradués, mannequin de couture sans visage) qui se trace à l'arrivée, titre qui monte lettre par lettre, invitation à descendre.
- **Au défilement vertical (natif, jamais intercepté)**, chaque section apparaît avec une petite animation, une seule fois :
  1. **Défilé horizontal** : trois images, la centrale nette, deux voisines floutées. Navigation : boutons, flèches du clavier (Début/Fin aussi), glissement horizontal, trackpad horizontal, Maj + molette, clic sur une voisine.
  2. **Accessoires & pièces** : grille de pièces, le toucher ouvre la vue de détail (gros plans, rotation 360°).
  3. **Collections** : index qui ouvre la première tenue de la collection.
- **Coloris** : pastilles sous le nom de la tenue (affichées dès 2 coloris). Le mannequin actif passe en fondu au coloris choisi. Adresse partageable `?tenue=…&coloris=…`.
- Thème clair/sombre, vue de détail, informations de la tenue : conservés tels quels.

## Ce qui change dans le code
- **Nouveaux composants** : `HorizontalShowcase`, `Hero`, `Reveal`, `AccessoiresSection`, `CollectionsSection`, `CollectionLink`, `SiteFooter`, `SectionHead`, `ColorisPicker`, `CrossfadeImage`, `DetailOverlay`, `HudGraphics` (tous les SVG).
- **Données** : champ optionnel `coloris` (types, schéma Zod, validation d'intégrité, message WhatsApp). Les tenues sans `coloris` fonctionnent exactement comme avant.
- `VerticalShowcase.tsx` n'est plus utilisé par la page mais **n'est pas supprimé** : vous pouvez le retirer quand vous voulez.
- Fichiers `.agents/` et `prompt_compréhension/V5.md` : alignés sur la règle V5 (« un seul élément actif »), sinon l'agent qualité aurait bloqué le nouveau défilé.

## Points d'attention
- **Les images du dépôt sont des fichiers vides de 33 octets** : le site affiche alors le mannequin dessiné en SVG à leur place. Remplacez-les par vos vraies photos (mêmes noms de fichiers, portrait 3:4 recommandé).
- **Coloris** : voir `COMMENT_AJOUTER_UN_COLORIS.md`. Aucune tenue n'en a encore deux, donc les pastilles n'apparaissent pas tant que vous n'avez pas ajouté de vraies photos. Aucun coloris n'est simulé par retouche : c'est volontaire.
- La page `/catalogue` n'existe pas encore (lot 2) : le défilé n'affiche plus de lien vers elle.
- Le nom du site reste provisoire : le build de production échoue tant que `estNomProvisoire` est `true` (comportement existant).
