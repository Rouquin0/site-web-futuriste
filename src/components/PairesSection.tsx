"use client";

/**
 * PairesSection.tsx — Menu « Paires » : duos assortis en boucle (V5 §Paires)
 *
 * Chaque paire est un duo de mannequins présenté côte à côte dans un rail
 * horizontal en circulation continue. Photos remplaçables : renseignez
 * `photoA` / `photoB` dans data/paires.ts quand vous les recevez.
 */

import React, { useMemo } from "react";
import SectionHead from "./SectionHead";
import BoucleMannequins, { MannequinFigure, type BoucleCarte } from "./BoucleMannequins";
import { paires } from "../../data/paires";

function cartePaire(
  paire: (typeof paires)[number]
): BoucleCarte {
  return {
    id: paire.id,
    label: `${paire.nom} — ${paire.description}`,
    contenu: (
      <figure className="bg-background">
        <div className="grid grid-cols-2 gap-2">
          <MannequinFigure
            photo={paire.photoA}
            alt={paire.photoA ? paire.texteAlternatifA : ""}
          />
          <MannequinFigure
            photo={paire.photoB}
            alt={paire.photoB ? paire.texteAlternatifB : ""}
          />
        </div>
        <figcaption className="px-1 pb-1 pt-3 text-center">
          <p className="hud-label text-accent">Paire</p>
          <p className="mt-1 font-serif text-lg leading-snug text-primary">{paire.nom}</p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-secondary">
            {paire.description}
          </p>
        </figcaption>
      </figure>
    ),
  };
}

export default function PairesSection() {
  const cartes = useMemo(
    () =>
      [...paires]
        .sort((a, b) => a.ordreAffichage - b.ordreAffichage)
        .map(cartePaire),
    []
  );

  return (
    <div id="paires" className="scroll-mt-0 border-y border-border-decor bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Les duos — Brazzaville"
          title="Paires"
          variant="univers"
          right={
            <span aria-hidden="true" className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
              {paires.length} duos
            </span>
          }
        />
        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-secondary">
          Des silhouettes pensées à deux : assorties pour les cérémonies, les sorties
          et les photos de famille. Faites défiler la boucle, elle ne s'arrête jamais.
        </p>
        <div className="mt-8">
          <BoucleMannequins
            label="Paires de mannequins en boucle"
            cartes={cartes}
            dureeSecondes={50}
          />
        </div>
        <p className="mt-6 font-sans text-xs leading-relaxed text-secondary">
          Les mannequins affichés sont temporaires : envoyez vos photos et elles prendront
          place ici automatiquement, sans changer le site.
        </p>
      </div>
    </div>
  );
}
