"use client";

/**
 * DetailOverlay.tsx — Ouverture / fermeture animée de la vue de détail (V5 §V)
 *
 * - Rendue dans un portail (document.body) : aucun parent transformé ne perturbe `position: fixed`
 * - Fondu d'opacité uniquement (150 ms en réduction des animations)
 * - Le défilement de la page est suspendu tant que la vue est ouverte
 * - Le focus revient sur l'élément déclencheur à la fermeture
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DetailViewer from "./DetailViewer";
import type { PieceDetail } from "../types/catalogue";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface DetailOverlayProps {
  piece: PieceDetail;
  tenueNom: string;
  tenueReference: string;
  whatsappPhone: string;
  onClosed: () => void;
}

export default function DetailOverlay({ piece, tenueNom, tenueReference, whatsappPhone, onClosed }: DetailOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
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

  // Fondu d'entrée
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tween: { kill: () => void } | undefined;
    import("gsap").then(({ default: gsap }) => {
      tween = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: reduced ? 0.15 : 0.4, ease: "power2.out" });
    });
    return () => tween?.kill();
  }, [reduced]);

  const requestClose = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const el = ref.current;
    if (el) {
      const { default: gsap } = await import("gsap");
      await new Promise<void>((resolve) =>
        gsap.to(el, { opacity: 0, duration: reduced ? 0.1 : 0.25, ease: "power2.in", onComplete: resolve })
      );
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
