"use client";

/**
 * Hero.tsx — Écran d'accueil (V5 §C1)
 *
 * - Défilement vertical natif : aucune interception
 * - Dessin technique en SVG (anneaux gradués, mannequin de couture sans visage) qui se trace à l'arrivée
 * - Titre en caractères qui montent derrière un masque (transform uniquement)
 * - Sans JS / réduction des animations : tout est visible immédiatement (voir globals.css)
 */

import React, { useEffect, useMemo, useRef } from "react";
import { GridBackdrop, MannequinSvg } from "./HudGraphics";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface HeroProps {
  nom: string;
  ville: string;
  pays: string;
  slogan: string | null;
  totalTenues: number;
}

const TICKS = Array.from({ length: 72 }, (_, i) => i);

export default function Hero({ nom, ville, pays, slogan, totalTenues }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const chars = useMemo(() => Array.from(nom), [nom]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll("[data-hero],[data-char]").forEach((el) => el.classList.add("is-revealed"));
      root.querySelectorAll("[data-draw]").forEach((el) => el.classList.add("is-drawn"));
      return;
    }

    let tl: { kill: () => void } | undefined;
    let cancelled = false;

    import("gsap")
      .then(({ default: gsap }) => {
        if (cancelled) return;
        const draws = root.querySelectorAll("[data-draw]");
        const letters = root.querySelectorAll("[data-char]");
        const fades = root.querySelectorAll("[data-hero]");
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .to(draws, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.08 }, 0)
          .to(letters, { y: 0, duration: 0.9, stagger: 0.045 }, 0.35)
          .to(fades, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, onComplete: () => {
            fades.forEach((el) => { el.classList.add("is-revealed"); gsap.set(el, { clearProps: "opacity,transform" }); });
            letters.forEach((el) => { el.classList.add("is-revealed"); gsap.set(el, { clearProps: "transform" }); });
          } }, 0.9);
        tl = timeline;
      })
      .catch(() => {
        root.querySelectorAll("[data-hero],[data-char]").forEach((el) => el.classList.add("is-revealed"));
        root.querySelectorAll("[data-draw]").forEach((el) => el.classList.add("is-drawn"));
      });

    return () => { cancelled = true; tl?.kill(); };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Accueil"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <GridBackdrop className="absolute inset-0 -z-10 text-border-decor opacity-50" />

      {/* Bandeau supérieur (le bouton de thème est fixé en haut à droite) */}
      <div className="flex items-start justify-between px-6 pt-6 pr-24 md:px-10 md:pr-28">
        <p data-hero className="hud-label text-secondary">
          {ville} — {pays}
        </p>
      </div>

      {/* Dessin technique central */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <svg viewBox="-320 -320 640 640" className="h-[min(112vw,92dvh)] w-[min(112vw,92dvh)] text-primary" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <circle data-draw r="300" pathLength={1} opacity="0.35" vectorEffect="non-scaling-stroke" />
            <circle data-draw r="240" pathLength={1} opacity="0.5" vectorEffect="non-scaling-stroke" />
            <circle data-draw r="180" pathLength={1} opacity="0.35" vectorEffect="non-scaling-stroke" />
            {/* Graduations : une par 5° */}
            <g opacity="0.45">
              {TICKS.map((i) => (
                <line key={i} x1="0" y1={i % 6 === 0 ? -292 : -296} x2="0" y2="-304" transform={`rotate(${i * 5})`} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
            {/* Arc d'accent qui tourne lentement (clin d'œil à la rotation 360° des pièces) */}
            <g className="text-accent">
              {!reduced && (
                <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="90s" repeatCount="indefinite" />
              )}
              <path d="M 0 -240 A 240 240 0 0 1 207.8 -120" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="0" cy="-240" r="3.5" fill="currentColor" stroke="none" />
            </g>
            {/* Réticule */}
            <path d="M-320 0 H-250 M250 0 H320 M0 -320 V-250 M0 250 V320" opacity="0.5" vectorEffect="non-scaling-stroke" />
          </g>
          <g fill="currentColor" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" letterSpacing="2" opacity="0.6">
            <text x="-12" y="-318">000°</text>
            <text x="304" y="4">090°</text>
            <text x="-14" y="330">180°</text>
            <text x="-352" y="4">270°</text>
          </g>
        </svg>
        <MannequinSvg drawable annotated className="absolute h-[min(52dvh,520px)] w-auto text-primary opacity-80" />
      </div>

      {/* Titre */}
      <div className="relative mt-auto px-6 pb-10 md:px-10 md:pb-16">
        <p data-hero className="hud-label text-secondary mb-4">
          Défilé numérique privé
        </p>
        <h1 className="font-serif font-light leading-[0.9] text-primary text-[clamp(3.2rem,13vw,10rem)] tracking-tight" aria-label={nom}>
          <span aria-hidden="true" className="inline-flex flex-wrap">
            {chars.map((c, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span data-char className="inline-block">{c === " " ? "\u00A0" : c}</span>
              </span>
            ))}
          </span>
        </h1>
        {slogan && (
          <p data-hero className="mt-5 max-w-md font-sans text-sm md:text-base text-secondary">{slogan}</p>
        )}

        <div data-hero className="mt-10 flex items-end justify-between gap-6">
          <a
            href="#defile"
            className="group inline-flex items-center gap-4 min-h-touch hud-label text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-4"
          >
            <span className="relative block h-12 w-px bg-border-control overflow-hidden" aria-hidden="true">
              <span className="scroll-cue absolute left-0 top-0 block h-3 w-px bg-accent" />
            </span>
            Découvrir le défilé
          </a>
          <p className="hud-label text-secondary" aria-label={`${totalTenues} tenues`}>
            {String(totalTenues).padStart(2, "0")} tenues
          </p>
        </div>
      </div>
    </section>
  );
}
