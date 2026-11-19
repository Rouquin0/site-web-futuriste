"use client";

import { useEffect, type RefObject } from "react";
import { useMotion } from "./useMotion";
import { DUR, EASE, TILT_MAX_DEG, loadGsap, setWillChange } from "../lib/motion";

/**
 * Micro-perspective CSS (micro-interaction 3D n°1) : légère inclinaison au survol.
 * - pointeur précis uniquement (jamais en tactile), jamais en réduction des animations
 * - rotationX / rotationY ≤ TILT_MAX_DEG, transform uniquement
 * - `host` capte le pointeur, `target` s'incline
 */
export function useTilt(host: RefObject<HTMLElement | null>, target: RefObject<HTMLElement | null>): void {
  const { fine } = useMotion();

  useEffect(() => {
    const h = host.current;
    const t = target.current;
    if (!fine || !h || !t) return;

    let dead = false;
    let cleanup: (() => void) | undefined;

    loadGsap().then((gsap) => {
      if (dead) return;
      const rx = gsap.quickTo(t, "rotationX", { duration: DUR.tilt, ease: EASE.out });
      const ry = gsap.quickTo(t, "rotationY", { duration: DUR.tilt, ease: EASE.out });
      gsap.set(t, { transformPerspective: 700 });

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = h.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setWillChange(t, true, "transform");
        ry(px * 2 * TILT_MAX_DEG);
        rx(-py * 2 * TILT_MAX_DEG);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
        gsap.delayedCall(DUR.tilt, () => setWillChange(t, false));
      };

      h.addEventListener("pointermove", onMove);
      h.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        h.removeEventListener("pointermove", onMove);
        h.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(t);
        gsap.set(t, { clearProps: "transform" });
        setWillChange(t, false);
      };
    });

    return () => {
      dead = true;
      cleanup?.();
    };
  }, [fine, host, target]);
}
