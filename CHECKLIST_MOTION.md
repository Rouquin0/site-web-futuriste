# Couche « futuriste minimaliste + motion design » — récapitulatif et checklist

Statut : code livré, vérifications automatiques faites. Les vérifications sur appareil (case « à faire ») restent à réaliser sur ton téléphone.

## Décisions appliquées
- D1 : règle V5 — un seul élément actif, au plus 3 images montées, voisines inertes.
- D2 : conforme — aucun `stroke-dashoffset`. Anneaux = fondu + zoom 0,96→1 ; filets = `scaleX` ; titres = montée derrière un masque.
- D3 : Phase 0 appliquée (voir ci-dessous).
- D4 : voile uni `--color-scrim` (encre #1C1917 à 60 %, sans flou) derrière `DetailViewer` et `InfoPanel`.

## Phase 0 — écarts corrigés
| Fichier | Avant | Après |
|---|---|---|
| Hero | 3 pastilles `bg-surface/95 backdrop-blur` | aplat opaque |
| Hero | arcs en SMIL infini (80 s / 120 s) | quart de tour GSAP unique, puis arrêt |
| Hero | pastilles en flottement `repeat: -1` | apparition seule |
| Hero | `boxShadow` inset | vraie bordure de 6 px |
| globals.css | `.scroll-cue` en boucle infinie | balayage GSAP de 0,9 s (fin d'entrée, survol/focus du CTA) |
| DetailViewer | voile `bg-black/80 backdrop-blur-sm`, `shadow-2xl`, surfaces `/90` `/95` | voile `bg-scrim`, aplats opaques |
| DetailViewer | jauge d'angle animée en `width` | `scaleX` |
| DetailViewer | auto-rotation même en reduced-motion | désactivée en reduced-motion et économie de données |
| InfoPanel | voile `bg-black/60`, `shadow-2xl`, `/50` `/40` | `bg-scrim`, aplats |
| HorizontalShowcase | boutons 360° / i : `backdrop-blur`, `shadow-md`, `/95` ; `will-change` permanent | aplats ; `will-change` seulement pendant la transition |
| Hotspot | `bg-surface/90`, `shadow-sm` | aplat |
| PiecesAlternativeList | `text-secondary/70` (3,59:1) et `text-accent-contrast/80` (3,64:1) : **sous 4,5:1** | texte plein (7,30:1 / 4,71:1 en clair) |

## Plan réalisé, section par section
| § | Section | Fichier(s) |
|---|---|---|
| 1 | Hero : séquence en 3 temps (anneaux+arcs / titre / reste) | `Hero.tsx` |
| 2 | Défilé : zoom 1,04→1 du réticule, piloté par la position | `HorizontalShowcase.tsx` |
| 3 | Compteur « n / N » en odomètre, largeur fixe | `Odometer.tsx` |
| 4 | Filtre Vestiaire : filet d'accent en `translateX` + `scaleX` | `HorizontalShowcase.tsx` |
| 5 | Révélation de section : masque, filet, stagger 60 ms | `Reveal.tsx`, `SectionHead.tsx` |
| 6 | Accessoires : inclinaison ≤ 2° (micro-3D n°1) | `useTilt.ts`, `AccessoiresSection.tsx` |
| 7 | Collections : filets `scaleX`, glissement 4 px / 0,2 s | `CollectionsSection.tsx` |
| 8 | Vue de détail : panneau +24 px, fondu, fermeture en miroir ; repères d'angle fixes | `DetailOverlay.tsx`, `DetailViewer.tsx` |
| 9 | Pastille de coloris : retournement `rotationY` (micro-3D n°3) | `ColorisPicker.tsx` |
| 10 | Bascule de thème : rotation 90° de l'icône | `ThemeToggle.tsx` |
| 11 | Pied de page : filet `scaleX`, soulignement des liens | `SiteFooter.tsx`, `page.tsx`, `globals.css` |

Socle : `src/lib/motion.ts` (durées, easings, `motionAllowed`, `setWillChange`), `src/hooks/useMotion.ts` (réduction + économie de données + pointeur précis).
Budget micro-3D : 3 sur 3 (inclinaison accessoires, `rotateY` du Studio 360° existant, retournement de pastille).

## Vérifié automatiquement
- [x] `tsc --noEmit` : aucune erreur.
- [x] `vitest run` : 44 tests verts (22 d'origine corrigés + 22 nouveaux).
- [x] Garde-fou « zéro look IA » sur tout `src/` : aucun dégradé, lueur, verre dépoli, ombre portée, noir/blanc brut, transparence sur un jeton, boucle infinie, SMIL ni `stroke-dashoffset`. Contrôlé par mutation : 3 violations injectées volontairement ont toutes été détectées.
- [x] GSAP : aucun import statique (tous dynamiques).
- [x] Repli : en réduction des animations, Hero, Reveal, SectionHead et Odometer affichent l'état final sans mouvement.
- [x] Durées < 1 s, stagger ≤ 80 ms, inclinaison ≤ 2° (tests sur les jetons).
- [x] `next build` : compilation et TypeScript OK ; s'arrête sur le garde-fou volontaire `estNomProvisoire` (normal tant que le nom est provisoire).

## À faire sur appareil (non vérifiable depuis mon environnement)
- [ ] 375 px portrait et paysage : rien ne déborde, cibles ≥ 44 px espacées de 8 px.
- [ ] Clavier seul : Tab, flèches du défilé, Échap ferme `DetailViewer` et `InfoPanel`, focus rendu au déclencheur.
- [ ] Lecteur d'écran (VoiceOver / TalkBack) : « Tenue 2 sur 5 » annoncé ; le compteur odomètre est `aria-hidden`.
- [ ] Thèmes clair et sombre : voile et panneaux lisibles ; bascule d'icône fluide.
- [ ] Réseau lent / économie de données : aucun mouvement décoratif, contenu lisible.
- [ ] Réduction des animations activée dans l'OS : aucun mouvement, tout visible.
- [ ] 60 fps sur mobile milieu de gamme (DevTools Performance) et CLS < 0,1 (Lighthouse).
- [ ] Un seul visuel actif visible, y compris pendant la transition.
- [ ] Les photos réelles : les fichiers image du dépôt font 33 octets, seul le mannequin SVG a pu être pensé.

## Points à confirmer (interprétations de ma part)
1. **Transitions CSS de survol/focus ≤ 200 ms** (couleur, `translate`, soulignement) : je les ai gardées comme retour d'interface, pas comme motion décoratif. Tout le reste passe par GSAP. Si tu veux « GSAP partout », dis-le.
2. **Transition de thème en couleur** (déjà prévue par V4.2 §E) : exception documentée.
3. **Studio 360° (`DetailViewer`)** : le glisser en `rotateY` reste actif au toucher, car c'est une fonction produit et non un effet décoratif.
4. **Voisines floutées** : la variante miniature utilise toujours `blur-[8px]` (décision V5 antérieure, filtre statique, seule l'opacité est animée). Je ne l'ai pas touchée.
5. **ESLint** : aucune configuration (`eslint.config.js`) dans le dépôt, donc `npm run lint` ne tourne pas. Ce n'est pas une régression.
6. `npm test` exige `vite` : `npm i -D vite@^7.3.2` (déjà indiqué dans `LISEZ-MOI-V5.md`).
