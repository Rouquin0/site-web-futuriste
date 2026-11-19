"use client";

/**
 * BoucleMannequins.tsx — Rail horizontal en circulation continue (V5 §Boucle)
 *
 * Affiche des cartes de mannequins qui défilent en boucle infinie (animation
 * CSS sur `transform` uniquement). La liste est dupliquée : le second
 * exemplaire est masqué aux technologies d'assistance.
 *
 *  - Pause automatique au survol et quand un élément reçoit le focus.
 *  - `prefers-reduced-motion` : aucune boucle, défilement manuel natif.
 *  - Les cartes ne contiennent aucun élément focusable : la boucle dupliquée
 *    reste donc saine pour l'accessibilité.
 */

import React, { useState } from "react";
import Image from "next/image";
import { MannequinSvg } from "./HudGraphics";

export interface BoucleCarte {
  /** Identifiant unique */
  id: string;
  /** Nom accessible de la carte (lu une seule fois, sur l'exemplaire visible) */
  label: string;
  /** Contenu visuel de la carte */
  contenu: React.ReactNode;
}

interface BoucleMannequinsProps {
  /** Nom accessible du rail (ex. « Sandales en boucle ») */
  label: string;
  /** Cartes à faire circuler */
  cartes: BoucleCarte[];
  /** Durée d'un tour complet, en secondes */
  dureeSecondes?: number;
}

/** Figure de mannequin : photo réelle, ou mannequin dessiné remplaçable. */
export function MannequinFigure({
  photo,
  alt,
  className = "",
}: {
  photo: string | null;
  alt: string;
  className?: string;
}) {
  const [echec, setEchec] = useState(false);
  const montrerPhoto = photo !== null && !echec;

  return (
    <div className={`relative aspect-[3/4] w-full overflow-hidden border border-border-decor bg-beige ${className}`}>
      <MannequinSvg
        className={`absolute inset-0 m-auto h-[86%] w-auto text-border-control ${montrerPhoto ? "opacity-0" : "opacity-70"}`}
      />
      {montrerPhoto && (
        <Image
          src={photo}
          alt={alt}
          fill
          sizes="(max-width: 768px) 60vw, 280px"
          className="object-cover object-top"
          draggable={false}
          onError={() => setEchec(true)}
        />
      )}
      {!montrerPhoto && (
        <p className="absolute inset-x-0 bottom-2 mx-auto w-max max-w-[90%] bg-accent px-2 py-1 text-center font-sans text-[0.65rem] uppercase tracking-[0.14em] text-accent-contrast">
          Photo à venir
        </p>
      )}
    </div>
  );
}

export default function BoucleMannequins({ label, cartes, dureeSecondes = 45 }: BoucleMannequinsProps) {
  if (cartes.length === 0) return null;

  const rendreCarte = (carte: BoucleCarte, exemplaire: "a" | "b", masque: boolean) => (
    <li
      key={`${exemplaire}-${carte.id}`}
      aria-hidden={masque || undefined}
      className="w-52 shrink-0 md:w-60"
    >
      {carte.contenu}
    </li>
  );

  return (
    <div
      className="boucle-viewport"
      role="region"
      aria-roledescription="carrousel"
      aria-label={label}
    >
      <ul
        className="boucle-rail list-none p-0"
        style={{ "--boucle-duree": `${dureeSecondes}s` } as React.CSSProperties}
      >
        {cartes.map((c) => rendreCarte(c, "a", false))}
        {cartes.map((c) => rendreCarte(c, "b", true))}
      </ul>
    </div>
  );
}
