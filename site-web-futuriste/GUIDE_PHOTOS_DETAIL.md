# GUIDE_PHOTOS_DETAIL.md — Protocole de Prise de Vue & Médias de Détail

> Document de référence à destination du photographe professionnel et de l'atelier de création.
> Conforme à la Section V de la V4.4 du projet Vertical Fashion Showcase.

---

## 1. Objectifs & Philosophie
* **Authenticité totale** : Aucun artifice de rendu 3D synthétique ou retouche dénaturante sur les tissus souples (wax, bazin, soie, lin).
* **Respect du « Zéro look IA »** : Éclairage naturel de studio, textures palpables, netteté sur les fils et coutures réelles.
* **Sobriété technique** : Prise de vue calibrée pour alimenter une rotation 360° fluide par simple bascule séquentielle d'images WebP/AVIF légères.

---

## 2. Équipement & Paramétrage Studio

| Élément | Spécification requise |
| :--- | :--- |
| **Appareil photo** | Boîtier reflex ou hybride professionnel sur trépied lesté rigoureusement verrouillé. |
| **Focale** | Focale fixe recommandée (85mm ou 100mm macro) pour éliminer toute distorsion optique. |
| **Plateau tournant** | Plateau rotatif indexé à crans réguliers de 15° (ou motorisé à vitesse constante). |
| **Éclairage** | Lumière diffuse et constante (boîtes à lumière / diffuseurs) évitant les reflets violents et ombres portées mouvantes. |
| **Fond** | Cyclorama ou toile gris neutre mat (environ 18% de réflectance), homogène et compatible avec le thème clair (#FAFAF9) et le thème sombre (#1C1917). |
| **Ratio d'image** | Ratio vertical standard **3:4** (ex: 1200 × 1600 px en master). |

---

## 3. Protocole pour la Rotation 360° (Niveau 2 de détail)

1. **Centrage géométrique parfait** :
   * Positionner la pièce sur mannequin buste ou support invisible au centre exact de l'axe de rotation.
   * Réaliser un tour d'essai pour vérifier l'absence d'oscillation latérale (wobble).
2. **Découpage de la rotation (24 clichés)** :
   * Décomposer le tour complet (360°) en **24 prises de vue espacées exactement de 15°**.
   * Cadence et exposition 100% identiques sur les 24 images (mode manuel : ISO, ouverture, vitesse et balance des blancs verrouillés).
3. **Poids cible et exportation** :
   * Export en WebP (qualité 80-82) et AVIF.
   * **Poids cible** : $\le$ 45 Ko par image de rotation (soit un ensemble complet de 24 images $\le$ 1,1 Mo chargé progressivement en arrière-plan).

---

## 4. Protocole pour les Photos Macro (Niveau 1 de détail)

Pour chaque tenue, capturer 3 à 5 plans serrés mettant en avant l'artisanat :
1. **La matière / le tissage** : Gros plan montrant le grain du coton wax ou le reflet soyeux du bazin riche.
2. **Les finitions** : Détail d'une couture brodée, d'un bouton fait main, d'un col ou d'un ourlet.
3. **L'intérieur / étiquette** : Gage de confection locale et de qualité des finitions intérieures.

---

## 5. Convention de Nommage des Fichiers

Les fichiers doivent être remis selon l'arborescence et le formatage exacts suivants :

```text
public/images/pieces/
  └── [id-tenue]/
        ├── [id-piece]-macro-01.webp
        ├── [id-piece]-macro-02.webp
        └── 360/
              ├── frame-01.webp   (0°)
              ├── frame-02.webp   (15°)
              ├── ...
              └── frame-24.webp   (345°)
```

*Exemple pour l'ensemble bazin :*
`public/images/pieces/ensemble-bazin-bleu-001/tunique-360/frame-01.webp`

---

## 6. Droits d'Auteur et Conformité Légale (Section G)
* Toute image livrée doit faire l'objet d'une cession de droits d'exploitation écrite signée par le photographe.
* Si un mannequin humain apparaît dans un plan de détail, l'autorisation d'exploitation de son image signée est impérative.
* Toutes les métadonnées (crédits, date, licence) sont consignées dans `data/droits-images.json` avant intégration dans le catalogue.
