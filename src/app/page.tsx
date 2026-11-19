/**
 * src/app/page.tsx — Page d'accueil (Composant Serveur) — V5
 *
 * Défilement vertical NATIF (aucune interception). Structure :
 *   1. Accueil (hero)            — médaillon photo, anneaux techniques, mannequin
 *   2. Le défilé                 — défilé horizontal + filtre Femme/Homme, 360° sur chaque visuel
 *   3. Accessoires & pièces      — vue de détail au toucher
 *   4. Collections               — index, ouvre la tenue correspondante
 *   5. Pied de page pro          — WhatsApp / Instagram / Facebook
 * Chaque section apparaît au défilement avec une petite animation d'entrée (une seule fois).
 */

import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import AccessoiresSection from "@/components/AccessoiresSection";
import type { PieceEntry } from "@/components/AccessoiresSection";
import AccessoiresBoutique from "@/components/AccessoiresBoutique";
import PairesSection from "@/components/PairesSection";
import CollectionsSection from "@/components/CollectionsSection";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "../../site.config";
import { tenues } from "../../data/tenues";
import { getImageIdPourColoris } from "../lib/coloris";

export default function HomePage() {
  const tenuesSorted = [...tenues].sort((a, b) => a.ordreAffichage - b.ordreAffichage);

  const pieces: PieceEntry[] = tenuesSorted.flatMap((t) =>
    (t.pieces ?? []).map((piece) => ({ piece, tenueNom: t.nom, tenueReference: t.reference }))
  );

  const collections = Array.from(new Set(tenuesSorted.map((t) => t.collection)));

  // Aucun texte inventé : un slogan encore à compléter n'est pas affiché
  const slogan = siteConfig.slogan.startsWith("[À COMPLÉTER") ? null : siteConfig.slogan;

  // Visuel mis en avant dans le médaillon du hero : première tenue en avant
  const avant = tenuesSorted.find((t) => t.enAvant) ?? tenuesSorted[0];
  const imageIdAvant = avant ? getImageIdPourColoris(avant, undefined) : undefined;

  return (
    <main>
      {/* Bouton de thème fixe en haut à droite (§E) */}
      <ThemeToggle />

      <Hero
        nom={siteConfig.nomCommercial}
        ville={siteConfig.ville}
        pays={siteConfig.pays}
        slogan={slogan}
        totalTenues={tenuesSorted.length}
        imageIdAvant={imageIdAvant}
      />

      <Reveal as="section" aria-label="Défilé des tenues" start="top 75%">
        <HorizontalShowcase tenues={tenuesSorted} />
      </Reveal>

      <Reveal as="section" aria-label="Accessoires et pièces">
        <AccessoiresSection pieces={pieces} />
      </Reveal>

      <Reveal as="section" aria-label="Accessoires de la boutique">
        <AccessoiresBoutique />
      </Reveal>

      <Reveal as="section" aria-label="Paires de mannequins">
        <PairesSection />
      </Reveal>

      <Reveal as="section" aria-label="Collections">
        <CollectionsSection tenues={tenuesSorted} />
      </Reveal>

      <SiteFooter nom={siteConfig.nomCommercial} collections={collections} />
    </main>
  );
}
