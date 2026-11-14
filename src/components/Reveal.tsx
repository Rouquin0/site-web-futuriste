"use client";

/**
 * Reveal.tsx — Apparition au défilement (V5 §C1)
 *
 * - Déclenchée UNE SEULE FOIS quand la section entre dans l'écran (GSAP ScrollTrigger, chargé dynamiquement)
 * - transform + opacity uniquement, sans pin ni scrub
 * - Éléments animés : [data-reveal] (translation + opacité), [data-draw] (tracé SVG)
 * - Sans JS, ou en réduction des animations : tout est visible tout de suite (voir globals.css)
 */

import React, { useEffect, useRef } from "react";

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
    const drawings = Array.from(root.querySelectorAll<SVGElement>("[data-draw]"));

    const showAll = () => {
      items.forEach((el) => el.classList.add("is-revealed"));
      drawings.forEach((el) => el.classList.add("is-drawn"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAll();
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const trigger = ScrollTrigger.create({
          trigger: root,
          start,
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (drawings.length) {
              tl.to(drawings, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.06 }, 0);
            }
            if (items.length) {
              tl.to(
                items,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power3.out",
                  stagger: 0.08,
                  onComplete: () => {
                    // L'état final passe par la classe CSS : aucune transformation résiduelle
                    items.forEach((el) => {
                      el.classList.add("is-revealed");
                      gsap.set(el, { clearProps: "opacity,transform" });
                    });
                  },
                },
                0
              );
            }
          },
        });

        cleanup = () => trigger.kill();
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
