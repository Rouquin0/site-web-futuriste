"use client";

/**
 * DetailOverlay.tsx — Ouverture / fermeture animée de la vue de détail (V5 §V)
 *
 * - Rendue dans un portail (document.body) : aucun parent transformé ne perturbe `position: fixed`
 * - Ouverture : fondu + panneau qui monte de 24 px (0,32 s) ; fermeture en miroir (0,22 s)
 * - Réduction des animations / économie de données : fondu de 150 ms, aucun mouvement
 * - Le défilement de la page est suspendu tant que la vue est ouverte
 * - Le focus revient sur l'élément déclencheur à la fermeture
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DetailViewer from "./DetailViewer";
import type { PieceDetail } from "../types/catalogue";
import { useMotion } from "../hooks/useMotion";
import { DUR, EASE, loadGsap, setWillChange } from "../lib/motion";

interface DetailOverlayProps {
  piece: PieceDetail;
  tenueNom: string;
  tenueReference: string;
  whatsappPhone: string;
  onClosed: () => void;
}

export default function DetailOverlay({ piece, tenueNom, tenueReference, whatsappPhone, onClosed }: DetailOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();
  // Capturé au premier rendu, avant que la visionneuse ne déplace le focus
  const [trigger] = useState<Element | null>(() =>
    typeof document !== "undefined" ? document.activeElement : null
  );
  const closing = useRef(false);

  // Suspension du défilement de la page
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const panelOf = (el: HTMLElement) => el.querySelector<HTMLElement>("[data-detail-panel]");

  // Entrée : fondu + panneau qui monte de 24 px (0,32 s). Repli : fondu de 150 ms, sans mouvement.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dead = false;
    let tl: { kill: () => void } | undefined;
    loadGsap()
      .then((gsap) => {
        if (dead) return;
        const panel = panelOf(el);
        if (reduced) {
          tl = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.fade, ease: EASE.out });
          return;
        }
        setWillChange(el, true, "opacity");
        if (panel) setWillChange(panel, true, "transform");
        const t = gsap.timeline({
          onComplete: () => {
            setWillChange(el, false);
            if (panel) { gsap.set(panel, { clearProps: "transform" }); setWillChange(panel, false); }
          },
        });
        t.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.detailIn, ease: EASE.strong }, 0);
        if (panel) t.fromTo(panel, { y: 24 }, { y: 0, duration: DUR.detailIn, ease: EASE.strong }, 0);
        tl = t;
      })
      .catch(() => { el.style.opacity = "1"; });
    return () => { dead = true; tl?.kill(); };
  }, [reduced]);

  // Fermeture : miroir de l'ouverture (0,22 s, accélération). Repli : fondu de 150 ms.
  const requestClose = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const el = ref.current;
    if (el) {
      try {
        const gsap = await loadGsap();
        const panel = panelOf(el);
        await new Promise<void>((resolve) => {
          const t = gsap.timeline({ onComplete: resolve });
          t.to(el, { opacity: 0, duration: reduced ? DUR.fade : DUR.detailOut, ease: EASE.in }, 0);
          if (panel && !reduced) t.to(panel, { y: 24, duration: DUR.detailOut, ease: EASE.in }, 0);
        });
      } catch {
        // GSAP indisponible : fermeture immédiate
      }
    }
    onClosed();
    requestAnimationFrame(() => {
      if (trigger instanceof HTMLElement && document.contains(trigger)) trigger.focus();
    });
  }, [onClosed, reduced, trigger]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div ref={ref} style={{ opacity: 0 }}>
      <DetailViewer
        piece={piece}
        tenueNom={tenueNom}
        tenueReference={tenueReference}
        whatsappPhone={whatsappPhone}
        onClose={requestClose}
      />
    </div>,
    document.body
  );
}
