"use client";

/**
 * AccessoiresBoutique.tsx — Rubrique Accessoires + sous-menu (V5 §Accessoires)
 *
 * Sous-menu : Sandales · Ceintures · Chaînes · Bagues. Chaque univers filtre
 * la boucle de mannequins. Tant que les photos ne sont pas envoyées, un
 * mannequin de couture dessiné s'affiche avec « Photo à venir » : remplacez
 * simplement le `photo: null` dans data/accessoires.ts (voir le guide en
 * tête de ce fichier de données).
 */

import React, { useMemo, useState } from "react";
import SectionHead from "./SectionHead";
import BoucleMannequins, { MannequinFigure, type BoucleCarte } from "./BoucleMannequins";
import {
  accessoires,
  categoriesAccessoires,
  type Accessoire,
  type CategorieAccessoire,
} from "../../data/accessoires";
import { formatPriceXAF } from "../lib/formatters";

type Filtre = "tous" | CategorieAccessoire;

function legendeAccessoire(a: Accessoire): string {
  const matiereConnue = !a.matiere.startsWith("[À COMPLÉTER");
  return `${formatPriceXAF(a.prixXAF)} · RÉF ${a.reference}${matiereConnue ? ` · ${a.matiere}` : ""}`;
}

function carteAccessoire(a: Accessoire): BoucleCarte {
  return {
    id: a.id,
    label: `${a.nom}, ${legendeAccessoire(a)}`,
    contenu: (
      <figure className="bg-background">
        <MannequinFigure photo={a.photo} alt={a.photo ? a.texteAlternatif : ""} />
        <figcaption className="px-1 pb-1 pt-3">
          <p className="hud-label text-accent">{a.categorie}</p>
          <p className="mt-1 font-serif text-lg leading-snug text-primary">{a.nom}</p>
          <p className="mt-1 font-sans text-xs text-secondary">{legendeAccessoire(a)}</p>
        </figcaption>
      </figure>
    ),
  };
}

export default function AccessoiresBoutique() {
  const [filtre, setFiltre] = useState<Filtre>("tous");

  const cartes = useMemo(
    () =>
      accessoires
        .filter((a) => filtre === "tous" || a.categorie === filtre)
        .sort((a, b) => a.ordreAffichage - b.ordreAffichage)
        .map(carteAccessoire),
    [filtre]
  );

  const filtres: Array<{ id: Filtre; nom: string }> = [
    { id: "tous", nom: "Tous" },
    ...categoriesAccessoires.map((c) => ({ id: c.id as Filtre, nom: c.nom })),
  ];

  const categorieActive =
    filtre === "tous" ? null : categoriesAccessoires.find((c) => c.id === filtre);

  return (
    <div id="accessoires" className="mx-auto max-w-7xl scroll-mt-0 px-6 py-20 md:py-28">
      <SectionHead
        eyebrow="La boutique — Brazzaville"
        title="Accessoires"
        variant="atelier"
        right={
          <span aria-hidden="true" className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
            {accessoires.length} créations
          </span>
        }
      />

      {/* Sous-menu : Sandales · Ceintures · Chaînes · Bagues */}
      <nav aria-label="Univers accessoires" className="mt-6 flex flex-wrap items-center gap-2">
        {filtres.map((f) => {
          const actif = filtre === f.id;
          const nombre =
            f.id === "tous"
              ? accessoires.length
              : accessoires.filter((a) => a.categorie === f.id).length;
          return (
            <a
              key={f.id}
              href={f.id === "tous" ? "#accessoires" : `#accessoires-${f.id}`}
              onClick={(e) => {
                e.preventDefault();
                setFiltre(f.id);
              }}
              aria-pressed={actif}
              aria-current={actif ? "true" : undefined}
              className={`inline-flex min-h-touch items-center gap-2 border px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 ${
                actif
                  ? "border-bordeaux bg-bordeaux text-background"
                  : "border-border-control bg-surface text-secondary hover:text-primary"
              }`}
            >
              {f.nom}
              <span aria-hidden="true" className={actif ? "opacity-70" : "opacity-50"}>
                · {nombre}
              </span>
            </a>
          );
        })}
      </nav>
      <p aria-live="polite" className="sr-only">
        {categorieActive ? `Univers ${categorieActive.nom} affiché` : "Tous les accessoires affichés"}
      </p>

      {categorieActive && (
        <p className="mt-4 font-sans text-sm text-secondary">{categorieActive.description}</p>
      )}

      {/* Boucle de mannequins de l'univers actif (photos remplaçables) */}
      <div
        key={filtre}
        id={filtre === "tous" ? undefined : `accessoires-${filtre}`}
        className="mt-8"
      >
        <BoucleMannequins
          label={
            categorieActive
              ? `${categorieActive.pluriel} en boucle`
              : "Accessoires en boucle"
          }
          cartes={cartes}
          dureeSecondes={40}
        />
      </div>

      <p className="mt-6 font-sans text-xs leading-relaxed text-secondary">
        Les mannequins affichés sont temporaires : envoyez vos photos et elles prendront
        place ici automatiquement, sans changer le site.
      </p>
    </div>
  );
}
