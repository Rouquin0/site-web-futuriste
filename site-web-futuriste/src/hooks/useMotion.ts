"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { finePointerAvailable, saveDataOn } from "../lib/motion";

export interface MotionState {
  /** Réduction des animations OU économie de données : état final immédiat. */
  reduced: boolean;
  /** Inverse de `reduced` : le mouvement décoratif est autorisé. */
  allowed: boolean;
  /** Pointeur précis avec survol (jamais en tactile). */
  fine: boolean;
}

/**
 * Hook unique pour décider si une animation peut jouer.
 * Réutilise `useReducedMotion` existant et y ajoute l'économie de données et le pointeur précis.
 */
export function useMotion(): MotionState {
  const reducedPref = useReducedMotion();
  const [saveData, setSaveData] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setSaveData(saveDataOn());
    setFine(finePointerAvailable());
    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    const onChange = () => setSaveData(saveDataOn());
    conn?.addEventListener?.("change", onChange);
    return () => conn?.removeEventListener?.("change", onChange);
  }, []);

  const reduced = reducedPref || saveData;
  return { reduced, allowed: !reduced, fine: fine && !reduced };
}
