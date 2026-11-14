/**
 * src/app/page.tsx — Page d'accueil (Composant Serveur)
 *
 * - Charge les tenues côté serveur (zéro requête client pour les données)
 * - Passe les tenues au composant VerticalShowcase (chargement dynamique, ssr:false)
 * - ThemeToggle positionné en haut à droite (position:fixed dans son propre composant)
 */

import ThemeToggle from "@/components/ThemeToggle";
import VerticalShowcase from "@/components/VerticalShowcase";
import { tenues } from "../../data/tenues";

export default function HomePage() {
  // Trier par ordreAffichage côté serveur pour hydrater dans le bon ordre
  const tenuesSorted = [...tenues].sort(
    (a, b) => a.ordreAffichage - b.ordreAffichage
  );

  return (
    <main>
      {/* Bouton de thème fixe en haut à droite — présent sur toutes les pages (§E) */}
      <ThemeToggle />

      {/* Vitrine immersive — chargée côté client uniquement */}
      <VerticalShowcase tenues={tenuesSorted} />
    </main>
  );
}
