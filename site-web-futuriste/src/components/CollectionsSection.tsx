import React from "react";
import SectionHead from "./SectionHead";
import CollectionLink from "./CollectionLink";
import { ArrowIcon } from "./HudGraphics";
import type { Tenue } from "../types/catalogue";

/** Index des collections (déduit des données) : chaque ligne ouvre la première tenue de la collection. */
export default function CollectionsSection({ tenues }: { tenues: Tenue[] }) {
  const map = new Map<string, Tenue[]>();
  [...tenues].sort((a, b) => a.ordreAffichage - b.ordreAffichage).forEach((t) => {
    map.set(t.collection, [...(map.get(t.collection) ?? []), t]);
  });
  const collections = Array.from(map.entries());
  if (collections.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
      <SectionHead eyebrow="Univers — vestiaire" title="Collections" variant="univers" right={<span aria-hidden="true" className="inline-flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />{collections.length} univers</span>} />
      <ul className="mt-6 border-b border-border-decor">
        {collections.map(([nom, items], i) => (
          <li key={nom}>
            {/* Filet d'index : se trace en scaleX à la révélation */}
            <div data-line aria-hidden="true" className="h-px w-full bg-border-decor" />
            <div data-reveal>
            <CollectionLink
              slug={items[0].slug}
              className="group flex min-h-touch items-center gap-4 py-6 md:py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:-outline-offset-2"
            >
              <span aria-hidden="true" className="hud-label w-8 text-accent">◆</span>
              <span className="flex-1 font-serif text-3xl md:text-5xl font-light leading-none text-primary transition-transform duration-200 ease-out group-hover:translate-x-1">
                {nom}
              </span>
              <span className="hud-label hidden text-secondary sm:block">
                {String(items.length).padStart(2, "0")} {items.length > 1 ? "tenues" : "tenue"}
              </span>
              <ArrowIcon className="h-5 w-5 text-primary transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </CollectionLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
