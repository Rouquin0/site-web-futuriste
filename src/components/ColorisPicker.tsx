"use client";

/**
 * ColorisPicker.tsx — Pastilles de coloris (V5 §W)
 *
 * - Groupe de boutons radio accessible : flèches pour naviguer, état annoncé
 * - Sélection marquée par un anneau ET une coche (jamais par la couleur seule)
 * - Coloris épuisé : marqué « Épuisé » (texte), reste sélectionnable pour être vu
 * - Zone tactile de 44 px, contour de contrôle >= 3:1 dans les deux thèmes
 */

import React, { useRef } from "react";
import { useMotion } from "../hooks/useMotion";
import { DUR, EASE, loadGsap, setWillChange } from "../lib/motion";
import type { Coloris, Tenue } from "../types/catalogue";
import { colorisEpuise } from "../lib/coloris";
import { resoudreImage } from "../lib/images";

interface ColorisPickerProps {
  tenue: Tenue;
  selectedId: string;
  onSelect: (id: string) => void;
  /** Appelé au survol / focus : permet de précharger la photo (jamais en économie de données) */
  onIntent?: (coloris: Coloris) => void;
}

export default function ColorisPicker({ tenue, selectedId, onSelect, onIntent }: ColorisPickerProps) {
  const liste = tenue.coloris ?? [];
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const swatches = useRef<Array<HTMLSpanElement | null>>([]);
  const { allowed, fine } = useMotion();
  if (liste.length < 2) return null;

  const selected = liste.find((c) => c.id === selectedId) ?? liste[0];

  /**
   * Micro-interaction 3D n°3 : retournement de la pastille choisie (rotationY 0 → 360°, 0,3 s).
   * Pointeur précis seulement ; en tactile, un fondu bref (0,15 s) ; en réduction des animations : rien.
   */
  const flip = (i: number) => {
    const el = swatches.current[i];
    if (!el || !allowed) return;
    loadGsap().then((gsap) => {
      setWillChange(el, true);
      const done = () => { gsap.set(el, { clearProps: "transform,opacity" }); setWillChange(el, false); };
      if (fine) {
        gsap.fromTo(el, { rotationY: 0, transformPerspective: 400 }, { rotationY: 360, duration: DUR.flip, ease: EASE.inOut, onComplete: done });
      } else {
        gsap.fromTo(el, { opacity: 0.4 }, { opacity: 1, duration: DUR.fade, ease: EASE.out, onComplete: done });
      }
    });
  };

  const choose = (index: number) => {
    onSelect(liste[index].id);
    flip(index);
  };

  const move = (from: number, delta: number) => {
    const next = (from + delta + liste.length) % liste.length;
    choose(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(index, 1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(index, -1); }
    else if (e.key === "Home") { e.preventDefault(); choose(0); refs.current[0]?.focus(); }
    else if (e.key === "End") { e.preventDefault(); choose(liste.length - 1); refs.current[liste.length - 1]?.focus(); }
  };

  return (
    <div className="flex flex-col items-center gap-2" data-coloris-picker>
      <div className="hud-label text-secondary" aria-hidden="true">
        {liste.length} coloris — {selected.nom}
      </div>
      <div role="radiogroup" aria-label={`Coloris de ${tenue.nom}`} className="flex items-center justify-center gap-1">
        {liste.map((c, i) => {
          const checked = c.id === selected.id;
          const epuise = colorisEpuise(tenue, c);
          return (
            <button
              key={c.id}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`Coloris : ${c.nom}${epuise ? ", épuisé" : ", disponible"}${checked ? ", sélectionné" : ""}`}
              tabIndex={checked ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              onPointerEnter={() => onIntent?.(c)}
              onFocus={() => onIntent?.(c)}
              className="relative flex items-center justify-center w-11 h-11 min-w-touch min-h-touch focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
            >
              <span
                ref={(el) => { swatches.current[i] = el; }}
                className={`relative block w-7 h-7 rounded-full overflow-hidden border transition-transform duration-150 ${
                  checked ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background scale-105" : "border-border-control"
                }`}
                style={c.pastille.type === "couleur" ? { backgroundColor: c.pastille.valeur } : undefined}
              >
                {c.pastille.type === "motif" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.pastille.image || resoudreImage(c.imageId).src}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}
                {epuise && (
                  <svg className="absolute inset-0 w-full h-full text-primary" viewBox="0 0 28 28" aria-hidden="true">
                    <path d="M4 24 L24 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </span>
              {checked && (
                <svg className="absolute w-3 h-3 text-accent-contrast pointer-events-none" viewBox="0 0 24 24" aria-hidden="true"
                  style={{ mixBlendMode: "normal" }}>
                  <circle cx="12" cy="12" r="11" fill="var(--color-accent)" />
                  <path d="M7 12.5 L10.5 16 L17 8.5" fill="none" stroke="var(--color-accent-contrast)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      {colorisEpuise(tenue, selected) && (
        <p className="font-sans text-xs text-secondary">Épuisé dans ce coloris — nous pouvons vous prévenir du réassort.</p>
      )}
    </div>
  );
}
