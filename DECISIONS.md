# DECISIONS.md — Registre des Décisions Ouvertes et Risques (V4.4)

> Document tenu par l'Architecte conformément à la Section W (point 17) du document de référence `prompt_compréhension/V4.2.md`.
> **Statut : À arbitrer par le propriétaire avant mise en production.**

---

## 1. Décision Ouverte Principale : Vente à la pièce vs Tenue complète (§V & §W)

### Contexte
La commande principale se fait par tenue complète via WhatsApp. Cependant, les clients souhaiteront potentiellement acquérir uniquement une veste, un pantalon ou un accessoire repéré lors de l'exploration de détail.

### Options analysées

| Critère | Option A : Tenue complète uniquement | Option B : Tenue complète + option À la pièce (Recommandée) |
| :--- | :--- | :--- |
| **Expérience client** | Simple, pas de dispersion, valorise le look global créé par le créateur. | Flexible, élimine la frustration du client qui n'a besoin que d'une pièce spécifique. |
| **Modèle de données** | Modèle actuel : un seul prix `prixXAF` au niveau de la tenue. | Extension : prix global `prixXAF` au niveau de la tenue, et champ optionnel `prixXAF?: number` sur chaque pièce dans `pieces[]`. |
| **Fiche produit / InfoPanel** | Bouton unique : « Commander cette tenue sur WhatsApp ». | Bouton principal « Commander la tenue complète » + bouton secondaire dans la vue de détail « Se renseigner sur cette pièce uniquement ». |
| **Message WhatsApp généré** | Format standardisé : « Bonjour, je souhaite commander la tenue X (Réf...) en taille M ». | Format contextualisé pièce : « Bonjour, je souhaite commander la pièce [NomPièce] de la tenue X (Réf...) ». |

> **Recommandation de l'Architecte** : **Option B**. L'affichage par défaut reste centré sur la tenue complète, mais permet l'achat unitaire pour les pièces renseignées avec un tarif dans `pieces[]`.

---

## 2. Hébergement & Déploiement (§U & §W.13)

| Solution | Avantages | Inconvénients | Recommandation |
| :--- | :--- | :--- | :--- |
| **Vercel** | Optimisation native Next.js, support App Router, Edge Network mondial, déploiements de prévisualisation automatiques. | Coûts potentiels au dépassement de bande passante sur les gros médias. | **Fortement Recommandé** (Formule Hobby/Pro selon trafic). |
| **Cloudflare Pages** | Réseau Edge ultra-rapide, bande passante non facturée, excellent cache mondial pour les médias WebP/AVIF. | Nécessite OpenNext ou adaptateur spécifique pour les fonctionnalités avancées Next.js 15+. | Alternative solide si volumétrie d'images critique. |

---

## 3. Mesure d'Audience et Respect de la Vie Privée (§S & §W.17)

| Solution | Caractéristiques | Impact Légal / Bande Passante | Recommandation |
| :--- | :--- | :--- | :--- |
| **Plausible Analytics / Umami** | Respect strict du RGPD/vie privée, script ultra-léger (< 1 KB), aucun cookie requis, pas de bandeau intrusif. | Payant (Plausible) ou auto-hébergé (Umami). | **Recommandé** (Plausible ou Cloudflare Web Analytics gratuit). |
| **Google Analytics 4** | Gratuit, complet. | Lourd (> 45 KB), cookies traceurs, exige bandeau de consentement conforme et ralentit l'expérience mobile. | Déconseillé au vu des exigences de performance et de sobriété. |

---

## 4. Moyens de Paiement et Finalisation de Vente (§M & §W.17)

* **Contexte local** : À Brazzaville (Congo), les transactions se concluent majoritairement via Mobile Money (Airtel Money, MTN Mobile Money) ou paiement à la livraison (Cash on Delivery).
* **Recommandation** : Aucune passerelle bancaire lourde (Stripe, etc.) n'est intégrée dans les lots 1 & 2. Le tunnel reste 100% WhatsApp, le conseiller confirme les stocks, communique les numéros de dépôt Mobile Money officiels ou convient du lieu de livraison à Brazzaville.

---

## 5. Tarifs et Zones de Livraison (§Q & §W.17)

* **Recommandation** :
  * Brazzaville Centre / Bacongo / Poto-Poto / Ouenzé : Livraison standard sous 24h (tarif forfaitaire par exemple 1 500 à 2 000 FCFA ou retrait gratuit en boutique/atelier).
  * Périphérie / Pointe-Noire : Expédition par agence de transport (frais à la charge du client communiqués sur devis WhatsApp).

---

## 6. Affichage des Prix : TTC ou Net (§H & §W.17)

* **Recommandation** : Conformément à la législation et aux usages commerciaux au Congo pour la vente aux particuliers, tous les montants sont affichés **en Net / Toutes Taxes Comprises (TTC)**, en FCFA sans décimales. Mention claire dans les conditions générales : « Prix nets en FCFA ».
