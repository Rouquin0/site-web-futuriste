/**
 * SectionHead.tsx — En-tête de section premium (sans numérotation 01/02)
 *
 * Remplace les anciens index numériques par un ornement couture ultra-stylé :
 * pastille diamant + double filet + label. Prop `index` conservée pour
 * compatibilité mais ignorée à l'affichage.
 */
import React from "react";

interface SectionHeadProps {
  /** Ancien numéro (ignoré à l'affichage — conservé pour compatibilité) */
  index?: string;
  title: string;
  /** Petit label au-dessus du titre (ex: "Défilé", "Atelier", "Univers") */
  eyebrow?: string;
  right?: React.ReactNode;
  headingId?: string;
  /** Variante d'ornement */
  variant?: "defile" | "atelier" | "univers";
}

const ORNAMENTS: Record<string, string> = {
  defile: "✦",
  atelier: "◈",
  univers: "❖",
};

export default function SectionHead({ title, eyebrow, right, headingId, variant = "defile" }: SectionHeadProps) {
  return (
    <header className="w-full">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="flex items-center gap-2 text-accent">
          <span className="block h-px w-8 bg-accent" />
          <span className="text-sm leading-none">{ORNAMENTS[variant] ?? "✦"}</span>
          <span className="block h-px w-8 bg-accent" />
        </span>
        {eyebrow ? (
          <p className="hud-label text-accent">{eyebrow}</p>
        ) : (
          <p className="hud-label text-accent">Atelier — Brazzaville</p>
        )}
        <span aria-hidden="true" className="h-px flex-1 bg-border-decor" />
        {right && <div className="hud-label shrink-0 text-secondary">{right}</div>}
      </div>
      {/* Titre : monte derrière un masque (data-mask). La marge négative compense le débord des jambages. */}
      <h2 id={headingId} className="mt-3 font-serif text-4xl font-light leading-none text-primary md:text-6xl">
        <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span data-mask className="block">{title}</span>
        </span>
      </h2>
      {/* Filet : se trace en scaleX (data-line). Hauteur réservée = aucun décalage de mise en page. */}
      <div className="mt-4 h-2 w-full" aria-hidden="true">
        <div data-line className="h-px w-full bg-border-control" />
      </div>
    </header>
  );
}
