/**
 * src/lib/motion.ts — Jetons et utilitaires de mouvement (couche « instrument de précision »)
 *
 * Règles (cahier des charges V4.2 / V5) :
 *  - GSAP uniquement, importé dynamiquement ;
 *  - on n'anime que `transform` et `opacity` ;
 *  - chaque animation a un repli : réduction des animations OU économie de données
 *    => état final immédiat, aucun mouvement ;
 *  - `will-change` n'est posé que pendant l'animation.
 */

export type Gsap = typeof import("gsap").default;

/** Durées (secondes). Toutes < 1 s. */
export const DUR = {
  ring: 0.7,
  arcs: 0.9,
  title: 0.8,
  group: 0.6,
  reveal: 0.6,
  line: 0.5,
  counter: 0.25,
  underline: 0.25,
  detailIn: 0.32,
  detailOut: 0.22,
  flip: 0.3,
  icon: 0.25,
  cue: 0.9,
  tilt: 0.3,
  fade: 0.15,
} as const;

/** Courbes d'accélération. */
export const EASE = {
  out: "power2.out",
  inOut: "power2.inOut",
  in: "power2.in",
  strong: "power3.out",
  strongInOut: "power3.inOut",
  expo: "expo.out",
} as const;

/** Décalages entre éléments (secondes). Jamais plus de 80 ms. */
export const STAGGER = {
  letters: 0.025,
  group: 0.06,
  max: 0.08,
} as const;

/** Inclinaison maximale (degrés) de la micro-perspective CSS. */
export const TILT_MAX_DEG = 2;

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

/** Vrai si l'utilisateur demande une réduction des animations. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Vrai si le mode économie de données est actif. */
export function saveDataOn(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean((navigator as NavigatorWithConnection).connection?.saveData);
}

/** Vrai si le mouvement décoratif est autorisé (ni réduction des animations, ni économie de données). */
export function motionAllowed(): boolean {
  return !prefersReducedMotion() && !saveDataOn();
}

/** Vrai pour un pointeur précis capable de survol (souris, trackpad) : jamais en tactile. */
export function finePointerAvailable(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Chargement dynamique de GSAP (le module n'entre pas dans le lot initial). */
export async function loadGsap(): Promise<Gsap> {
  return (await import("gsap")).default;
}

type Targets = Element | null | ArrayLike<Element | null>;

function toList(t: Targets): Array<HTMLElement | SVGElement> {
  if (!t) return [];
  const arr = "length" in (t as object) ? Array.from(t as ArrayLike<Element | null>) : [t as Element];
  return arr.filter((e): e is HTMLElement | SVGElement => e instanceof HTMLElement || e instanceof SVGElement);
}

/** `will-change` posé seulement pendant l'animation, retiré ensuite. */
export function setWillChange(t: Targets, on: boolean, props = "transform, opacity"): void {
  toList(t).forEach((el) => {
    el.style.willChange = on ? props : "";
  });
}
