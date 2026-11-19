"use client";

/**
 * Hero.tsx — Écran d'accueil premium (V5 §C1 — édition pro)
 *
 * - Défilement vertical natif
 * - Scène "atelier horloger" : triple anneau gradué, double arc d'accent
 *   contrarotatif, réticule, photo de la collection en médaillon central
 *   + mannequin de couture en surimpression, pastilles HUD
 * - Titre masqué, double CTA (Défilé / WhatsApp), bandeau de preuves
 *
 * ENTRÉE (une seule fois, GSAP, transform + opacity uniquement) — jamais plus de 2 groupes en mouvement :
 *   a) anneaux : fondu + zoom 0,96→1, arcs : un quart de tour puis arrêt     0,00 → 0,90 s
 *   b) titre : lettres derrière masque, stagger 25 ms                         0,30 → ~1,40 s
 *   c) médaillon, mannequin, pastilles, CTA : fondu + translation             0,90 → ~2,00 s
 *   Fin : un balayage du trait d'invitation, puis au survol / focus du CTA.
 * Repli (réduction des animations, économie de données, sans JS) : tout est visible, aucun mouvement.
 */

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { GridBackdrop, MannequinSvg } from "./HudGraphics";
import { DUR, EASE, STAGGER, loadGsap, motionAllowed, setWillChange } from "../lib/motion";
import { siteConfig } from "../../site.config";
import { resoudreImage } from "../lib/images";

interface HeroProps {
  nom: string;
  ville: string;
  pays: string;
  slogan: string | null;
  totalTenues: number;
  /** imageId de la tenue mise en avant dans le médaillon (défaut : robe wax) */
  imageIdAvant?: string;
}

const TICKS = Array.from({ length: 72 }, (_, i) => i);
const TICKS_INNER = Array.from({ length: 36 }, (_, i) => i);

export default function Hero({ nom, ville, pays, slogan, totalTenues, imageIdAvant }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const chars = useMemo(() => Array.from(nom), [nom]);
  const heroImg = resoudreImage(imageIdAvant ?? "img-robe-wax-001-principale", "Tenue phare de la collection");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveal = (els: Iterable<Element>) => Array.from(els).forEach((el) => el.classList.add("is-revealed"));
    const showAll = () => reveal(root.querySelectorAll("[data-hero],[data-char],[data-ring]"));

    // Repli : réduction des animations ou économie de données => état final immédiat
    if (!motionAllowed()) {
      showAll();
      return;
    }

    let cancelled = false;
    let timeline: { kill: () => void } | undefined;
    let cueTween: { isActive: () => boolean; kill: () => void } | undefined;
    let removeCueListeners: (() => void) | undefined;

    loadGsap()
      .then((gsap) => {
        if (cancelled) return;
        const ring = root.querySelector<SVGSVGElement>("[data-ring]");
        const arcA = root.querySelector<SVGGElement>('[data-arc="a"]');
        const arcB = root.querySelector<SVGGElement>('[data-arc="b"]');
        const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-char]"));
        const fades = Array.from(root.querySelectorAll<HTMLElement>("[data-hero]"));
        const cue = root.querySelector<HTMLElement>(".scroll-cue");
        const cta = root.querySelector<HTMLElement>("[data-cta]");

        const done = (els: HTMLElement[]) => {
          els.forEach((el) => {
            el.classList.add("is-revealed");
            gsap.set(el, { clearProps: "opacity,transform" });
          });
          setWillChange(els, false);
        };

        // Trait d'invitation : un balayage de 0,9 s (fin d'entrée, puis survol / focus du CTA)
        const sweep = () => {
          if (!cue || cueTween?.isActive()) return;
          setWillChange(cue, true, "transform");
          cueTween = gsap.fromTo(
            cue,
            { yPercent: -100 },
            {
              yPercent: 400,
              duration: DUR.cue,
              ease: EASE.strongInOut,
              onComplete: () => {
                gsap.set(cue, { clearProps: "transform" });
                setWillChange(cue, false);
              },
            }
          );
        };
        if (cta) {
          cta.addEventListener("pointerenter", sweep);
          cta.addEventListener("focus", sweep);
          removeCueListeners = () => {
            cta.removeEventListener("pointerenter", sweep);
            cta.removeEventListener("focus", sweep);
          };
        }

        const tl = gsap.timeline();

        // a) anneaux + arcs (un seul quart de tour, puis arrêt)
        if (ring) {
          setWillChange(ring, true);
          tl.fromTo(
            ring,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: DUR.ring, ease: EASE.out, onComplete: () => done([ring as unknown as HTMLElement]) },
            0
          );
        }
        if (arcA) tl.fromTo(arcA, { rotation: -90, svgOrigin: "0 0" }, { rotation: 0, svgOrigin: "0 0", duration: DUR.arcs, ease: EASE.strongInOut }, 0);
        if (arcB) tl.fromTo(arcB, { rotation: 90, svgOrigin: "0 0" }, { rotation: 0, svgOrigin: "0 0", duration: DUR.arcs, ease: EASE.strongInOut }, 0);

        // b) titre : lettres derrière masque
        if (letters.length) {
          setWillChange(letters, true, "transform");
          tl.fromTo(
            letters,
            { yPercent: 112 },
            { yPercent: 0, duration: DUR.title, ease: EASE.expo, stagger: STAGGER.letters, onComplete: () => done(letters) },
            0.3
          );
        }

        // c) le reste : fondu + translation, stagger ≤ 80 ms
        if (fades.length) {
          setWillChange(fades, true);
          tl.fromTo(
            fades,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: DUR.group, ease: EASE.strong, stagger: STAGGER.group, onComplete: () => done(fades) },
            0.9
          );
        }

        tl.call(sweep, undefined, ">-0.2");
        timeline = tl;
      })
      .catch(() => showAll());

    return () => {
      cancelled = true;
      timeline?.kill();
      cueTween?.kill();
      removeCueListeners?.();
    };
  }, []);

  return (
    <section ref={rootRef} aria-label="Accueil" className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden">
      <GridBackdrop className="absolute inset-0 -z-10 text-border-decor opacity-50" />

      {/* Bandeau supérieur */}
      <div className="flex items-start justify-between px-6 pt-6 pr-24 md:px-10 md:pr-28">
        <p data-hero className="hud-label text-secondary">
          {ville} — {pays} <span aria-hidden="true" className="mx-2 text-border-control">·</span> <span className="text-accent">✦ Défilé privé</span>
        </p>
      </div>

      {/* Scène centrale premium */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <svg data-ring viewBox="-320 -320 640 640" className="h-[min(115vw,94dvh)] w-[min(115vw,94dvh)] text-primary" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <circle r="302" opacity="0.28" />
            <circle r="262" opacity="0.16" strokeDasharray="3 6" />
            <circle r="228" opacity="0.5" />
            <circle r="168" opacity="0.3" strokeDasharray="2 5" />
            {/* Graduations externes */}
            <g opacity="0.5">
              {TICKS.map((i) => (
                <line key={i} x1="0" y1={i % 6 === 0 ? -292 : -296} x2="0" y2="-304" transform={`rotate(${i * 5})`} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
            {/* Graduations internes */}
            <g opacity="0.35">
              {TICKS_INNER.map((i) => (
                <line key={i} x1="0" y1="-218" x2="0" y2="-228" transform={`rotate(${i * 10})`} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
            {/* Arc accent principal — un quart de tour à l'entrée (GSAP), puis arrêt */}
            <g data-arc="a" className="text-accent">
              <path d="M 0 -228 A 228 228 0 0 1 197.5 -114" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              <circle cx="0" cy="-228" r="4" fill="currentColor" stroke="none" />
              <circle cx="197.5" cy="-114" r="2.5" fill="currentColor" stroke="none" opacity="0.7" />
            </g>
            {/* Arc secondaire contrarotatif — même principe, sens inverse */}
            <g data-arc="b" className="text-accent" opacity="0.55">
              <path d="M 0 168 A 168 168 0 0 1 -145.5 84" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
              <circle cx="0" cy="168" r="3" fill="currentColor" stroke="none" />
            </g>
            {/* Réticule */}
            <path d="M-320 0 H-258 M258 0 H320 M0 -320 V-258 M0 258 V320" opacity="0.45" vectorEffect="non-scaling-stroke" />
            <circle r="4" fill="currentColor" stroke="none" opacity="0.5" />
          </g>
          <g fill="currentColor" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" letterSpacing="2" opacity="0.6">
            <text x="-12" y="-310">000°</text>
            <text x="296" y="4">090°</text>
            <text x="-14" y="322">180°</text>
            <text x="-344" y="4">270°</text>
          </g>
        </svg>

        {/* Médaillon photo + mannequin */}
        <div className="absolute flex items-center justify-center">
          <div data-hero className="relative h-[min(46dvh,440px)] w-[min(66vw,330px)] overflow-hidden rounded-t-full border border-border-control bg-surface">
            <Image src={heroImg.src} alt="" fill sizes="330px" className="object-cover object-top" priority draggable={false} />
            <div className="absolute inset-0 rounded-t-full border border-border-decor">
              <div className="absolute inset-0 rounded-t-full border-[6px] border-surface" />
            </div>
          </div>
          <div data-hero className="absolute">
            <MannequinSvg annotated className="h-[min(52dvh,500px)] w-auto text-primary opacity-25" />
          </div>
          {/* Pastilles HUD : aplats opaques, apparition seule (aucun flottement) */}
          <div data-hero className="absolute -left-28 top-8 hidden border border-border-control bg-surface px-3 py-2 sm:block">
            <p className="hud-label text-accent">◈ 360°</p>
            <p className="mt-1 font-sans text-[11px] text-secondary">Rotation studio</p>
          </div>
          <div data-hero className="absolute -right-28 top-1/3 hidden border border-border-control bg-surface px-3 py-2 sm:block">
            <p className="hud-label text-accent">✦ Sur mesure</p>
            <p className="mt-1 font-sans text-[11px] text-secondary">Brazzaville — Congo</p>
          </div>
          <div data-hero className="absolute -left-24 bottom-10 hidden border border-border-control bg-surface px-3 py-2 sm:block">
            <p className="hud-label text-primary">{String(totalTenues).padStart(2, "0")} modèles</p>
            <p className="mt-1 font-sans text-[11px] text-secondary">Prix en FCFA</p>
          </div>
        </div>
      </div>

      {/* Titre + CTA */}
      <div className="relative mt-auto px-6 pb-10 md:px-10 md:pb-14">
        <p data-hero className="hud-label mb-4 text-secondary">
          <span className="text-accent">✦</span> Défilé numérique privé — Wax · Bazin · Soirée
        </p>
        <h1 className="font-serif font-light leading-[0.9] text-primary text-[clamp(3rem,12vw,9rem)] tracking-tight" aria-label={nom}>
          <span aria-hidden="true" className="inline-flex flex-wrap">
            {chars.map((c, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span data-char className="inline-block">{c === " " ? " " : c}</span>
              </span>
            ))}
          </span>
        </h1>
        {slogan && <p data-hero className="mt-5 max-w-md font-sans text-sm text-secondary md:text-base">{slogan}</p>}

        <div data-hero className="mt-8 flex flex-wrap items-center gap-4">
          <a
            data-cta
            href="#defile"
            className="group inline-flex min-h-touch items-center gap-4 bg-primary px-6 py-3 hud-label text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-4"
          >
            <span className="relative block h-5 w-px overflow-hidden bg-background" aria-hidden="true">
              <span className="scroll-cue absolute left-0 top-0 block h-2 w-px bg-accent" />
            </span>
            Découvrir le défilé
          </a>
          <a
            href={siteConfig.sociaux.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-touch items-center gap-2 border border-border-control px-6 py-3 hud-label text-primary transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-4"
          >
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
            WhatsApp boutique
          </a>
          <p className="hud-label ml-auto text-secondary" aria-label={`${totalTenues} tenues`}>
            <span className="text-accent">◆</span> {totalTenues} créations
          </p>
        </div>
      </div>
    </section>
  );
}
