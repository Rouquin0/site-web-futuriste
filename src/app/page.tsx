/**
 * src/app/page.tsx — Page d'accueil (Composant Serveur) — V5
 *
 * Défilement vertical NATIF (aucune interception). Structure :
 *   1. Accueil (hero)            — dessin technique SVG
 *   2. 01 Défilé                 — défilé horizontal à trois images
 *   3. 02 Accessoires & pièces   — vue de détail au toucher
 *   4. 03 Collections            — index, ouvre la tenue correspondante
 * Chaque section apparaît au défilement avec une petite animation d'entrée (une seule fois).
 */

import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import AccessoiresSection from "@/components/AccessoiresSection";
import type { PieceEntry } from "@/components/AccessoiresSection";
import CollectionsSection from "@/components/CollectionsSection";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "../../site.config";
import { tenues } from "../../data/tenues";

export default function HomePage() {
  const tenuesSorted = [...tenues].sort((a, b) => a.ordreAffichage - b.ordreAffichage);

  const pieces: PieceEntry[] = tenuesSorted.flatMap((t) =>
    (t.pieces ?? []).map((piece) => ({ piece, tenueNom: t.nom, tenueReference: t.reference }))
  );

  // Aucun texte inventé : un slogan encore à compléter n'est pas affiché
  const slogan = siteConfig.slogan.startsWith("[À COMPLÉTER") ? null : siteConfig.slogan;

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
      />

      <Reveal as="section" aria-label="Défilé des tenues" start="top 75%">
        <HorizontalShowcase tenues={tenuesSorted} />
      </Reveal>

      <Reveal as="section" aria-label="Accessoires et pièces">
        <AccessoiresSection pieces={pieces} />
      </Reveal>

      <Reveal as="section" aria-label="Collections">
        <CollectionsSection tenues={tenuesSorted} />
      </Reveal>

      <SiteFooter nom={siteConfig.nomCommercial} />
    </main>
  );
}
