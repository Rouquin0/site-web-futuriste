"use client";

/**
 * Reveal.tsx — Apparition au défilement (V5 §C1)
 *
 * - Déclenchée UNE SEULE FOIS quand la section entre dans l'écran (GSAP ScrollTrigger, chargé dynamiquement)
 * - transform + opacity uniquement, sans pin ni scrub
 * - Éléments animés :
 *     [data-reveal] translation + opacité (stagger ≤ 60 ms)
 *     [data-mask]   titre qui monte derrière un masque
 *     [data-line]   filet qui se trace en scaleX
 * - Sans JS, en réduction des animations ou en économie de données : tout est visible tout de suite
 */

import React, { useEffect, useRef } from "react";
import { DUR, EASE, STAGGER, loadGsap, motionAllowed, setWillChange } from "../lib/motion";

interface RevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div" | "footer";
  /** Point de déclenchement (défaut : le haut de la section atteint 80 % de l'écran) */
  start?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export default function Reveal({
  children,
  id,
  className = "",
  as: Tag = "section",
  start = "top 80%",
  ...aria
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const masks = Array.from(root.querySelectorAll<HTMLElement>("[data-mask]"));
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-line]"));
    const all = [...items, ...masks, ...lines];

    const showAll = () => all.forEach((el) => el.classList.add("is-revealed"));

    if (!motionAllowed()) {
      showAll();
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const [gsap, { ScrollTrigger }] = await Promise.all([loadGsap(), import("gsap/ScrollTrigger")]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        let tl: { kill: () => void } | undefined;

        const finish = (els: HTMLElement[]) => {
          els.forEach((el) => {
            el.classList.add("is-revealed");
            gsap.set(el, { clearProps: "opacity,transform" });
          });
          setWillChange(els, false);
        };

        const trigger = ScrollTrigger.create({
          trigger: root,
          start,
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline();
            if (masks.length) {
              setWillChange(masks, true, "transform");
              timeline.fromTo(
                masks,
                { y: "110%" },
                { y: 0, duration: DUR.reveal, ease: EASE.expo, stagger: STAGGER.group, onComplete: () => finish(masks) },
                0
              );
            }
            if (lines.length) {
              setWillChange(lines, true, "transform");
              timeline.fromTo(
                lines,
                { scaleX: 0, transformOrigin: "0% 50%" },
                { scaleX: 1, duration: DUR.line, ease: EASE.expo, stagger: STAGGER.group, onComplete: () => finish(lines) },
                0.08
              );
            }
            if (items.length) {
              setWillChange(items, true);
              timeline.fromTo(
                items,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.expo, stagger: STAGGER.group, onComplete: () => finish(items) },
                0
              );
            }
            tl = timeline;
          },
        });

        cleanup = () => {
          trigger.kill();
          tl?.kill();
          setWillChange(all, false);
        };
      } catch {
        // Repli : si GSAP ne se charge pas, le contenu reste lisible
        showAll();
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [start]);

  return (
    <Tag ref={ref as React.RefObject<never>} id={id} className={className} {...aria}>
      {children}
    </Tag>
  );
}
