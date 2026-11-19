"use client";

/**
 * Odometer.tsx — Compteur à défilement vertical (transform uniquement)
 *
 * - Largeur fixe (chiffres tabulaires, `ch`) : aucun décalage de mise en page (CLS)
 * - Sens miroir : valeur croissante = défilement vers le haut, décroissante = vers le bas
 * - Repli (réduction des animations / économie de données) : remplacement direct
 * - Purement visuel : à placer dans un conteneur `aria-hidden` (l'annonce vocale est ailleurs)
 */

import React, { useEffect, useRef, useState } from "react";
import { useMotion } from "../hooks/useMotion";
import { DUR, EASE, loadGsap, setWillChange } from "../lib/motion";

interface OdometerProps {
  value: number;
  /** Nombre de chiffres réservés (défaut : celui de la valeur) */
  digits?: number;
  className?: string;
}

const LINE = "1.25em";

export default function Odometer({ value, digits, className = "" }: OdometerProps) {
  const { allowed } = useMotion();
  const prev = useRef(value);
  const colRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [pair, setPair] = useState<{ from: number; to: number } | null>(null);

  // Nouvelle valeur : on prépare la paire (ancienne / nouvelle) ou on remplace directement
  useEffect(() => {
    if (value === prev.current) return;
    const from = prev.current;
    prev.current = value;
    if (!allowed) {
      setPair(null);
      setShown(value);
      return;
    }
    setPair({ from, to: value });
  }, [value, allowed]);

  // Défilement GSAP de la paire
  useEffect(() => {
    if (!pair || !colRef.current) return;
    const el = colRef.current;
    const forward = pair.to > pair.from;
    let dead = false;
    let tween: { kill: () => void } | undefined;
    loadGsap().then((gsap) => {
      if (dead) return;
      setWillChange(el, true, "transform");
      tween = gsap.fromTo(
        el,
        { yPercent: forward ? 0 : -50 },
        {
          yPercent: forward ? -50 : 0,
          duration: DUR.counter,
          ease: EASE.inOut,
          onComplete: () => {
            setWillChange(el, false);
            setShown(pair.to);
            setPair(null);
          },
        }
      );
    });
    return () => {
      dead = true;
      tween?.kill();
      setWillChange(el, false);
    };
  }, [pair]);

  const width = `${Math.max(digits ?? 0, String(Math.max(value, shown)).length)}ch`;
  const forward = pair ? pair.to > pair.from : true;
  const cell = { display: "block", height: LINE, lineHeight: LINE } as const;

  return (
    <span
      className={`inline-block overflow-hidden align-bottom tabular-nums ${className}`}
      style={{ height: LINE, minWidth: width, textAlign: "right" }}
    >
      {pair ? (
        <span
          ref={colRef}
          className="block"
          style={{ transform: forward ? undefined : "translate3d(0, -50%, 0)" }}
        >
          <span style={cell}>{forward ? pair.from : pair.to}</span>
          <span style={cell}>{forward ? pair.to : pair.from}</span>
        </span>
      ) : (
        <span style={cell}>{shown}</span>
      )}
    </span>
  );
}
