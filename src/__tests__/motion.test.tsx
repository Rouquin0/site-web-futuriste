import React from "react";
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import SectionHead from "../components/SectionHead";
import Odometer from "../components/Odometer";
import { DUR, STAGGER, TILT_MAX_DEG, motionAllowed, prefersReducedMotion, saveDataOn, setWillChange } from "../lib/motion";

// GSAP simulé : une animation « se termine » immédiatement (le rendu final est testé, pas la courbe)
vi.mock("gsap", () => {
  const tween = { kill() {}, isActive: () => false };
  const g = {
    fromTo: (_el: unknown, _from: unknown, to: { onComplete?: () => void }) => { to.onComplete?.(); return tween; },
    to: (_el: unknown, v: { onComplete?: () => void }) => { v.onComplete?.(); return tween; },
    set() {}, killTweensOf() {}, registerPlugin() {}, delayedCall() {}, quickTo: () => () => {},
    timeline: () => ({ fromTo() { return this; }, to() { return this; }, call() { return this; }, kill() {} }),
  };
  return { default: g };
});

const mql = (matches: boolean) => ({
  matches, media: "", onchange: null,
  addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
});
const realMatchMedia = window.matchMedia;
afterEach(() => {
  window.matchMedia = realMatchMedia;
  Object.defineProperty(navigator, "connection", { value: undefined, configurable: true });
});

// ─── 1. Jetons de mouvement : bornes du cahier des charges ───────────────────────

describe("jetons de mouvement", () => {
  it("toutes les durées sont inférieures à 1 s", () => {
    Object.entries(DUR).forEach(([k, v]) => expect(v, k).toBeLessThan(1));
  });
  it("décalage entre éléments ≤ 80 ms, inclinaison ≤ 2°", () => {
    expect(STAGGER.max).toBeLessThanOrEqual(0.08);
    expect(STAGGER.group).toBeLessThanOrEqual(0.08);
    expect(TILT_MAX_DEG).toBeLessThanOrEqual(2);
  });
  it("will-change est posé puis retiré", () => {
    const el = document.createElement("div");
    setWillChange(el, true);
    expect(el.style.willChange).toContain("transform");
    setWillChange(el, false);
    expect(el.style.willChange).toBe("");
  });
});

// ─── 2. Décision « le mouvement est-il autorisé ? » ─────────────────────────────

describe("motionAllowed", () => {
  it("refuse en réduction des animations", () => {
    window.matchMedia = ((q: string) => mql(q.includes("prefers-reduced-motion"))) as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(true);
    expect(motionAllowed()).toBe(false);
  });
  it("autorise sans préférence ni économie de données", () => {
    window.matchMedia = (() => mql(false)) as typeof window.matchMedia;
    expect(motionAllowed()).toBe(true);
  });
  it("refuse en économie de données (saveData)", () => {
    window.matchMedia = (() => mql(false)) as typeof window.matchMedia;
    Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true });
    expect(saveDataOn()).toBe(true);
    expect(motionAllowed()).toBe(false);
  });
});

// ─── 3. Replis : tout est visible, sans mouvement ────────────────────────────────

describe("repli réduction des animations (par défaut dans ces tests)", () => {
  it("Hero : tous les éléments animés sont à leur état final", () => {
    const { container } = render(<Hero nom="Atelier" ville="Brazzaville" pays="Congo" slogan={null} totalTenues={5} />);
    const animes = container.querySelectorAll("[data-hero],[data-char],[data-ring]");
    expect(animes.length).toBeGreaterThan(0);
    animes.forEach((el) => expect(el.classList.contains("is-revealed")).toBe(true));
  });

  it("Hero : un seul titre, lisible au lecteur d'écran (aria-label), sans dégradé ni tracé SVG animé", () => {
    const { container } = render(<Hero nom="Atelier" ville="Brazzaville" pays="Congo" slogan={null} totalTenues={5} />);
    expect(screen.getByRole("heading", { level: 1, name: "Atelier" })).toBeInTheDocument();
    expect(container.querySelector("[data-draw]")).toBeNull();
    expect(container.querySelector("animateTransform")).toBeNull();
    expect(container.querySelector("linearGradient, radialGradient")).toBeNull();
  });

  it("Reveal : [data-reveal], [data-mask] et [data-line] sont visibles d'emblée", () => {
    const { container } = render(
      <Reveal>
        <div data-reveal>a</div>
        <span data-mask>b</span>
        <i data-line />
      </Reveal>
    );
    container.querySelectorAll("[data-reveal],[data-mask],[data-line]").forEach((el) =>
      expect(el.classList.contains("is-revealed")).toBe(true)
    );
  });

  it("SectionHead : titre accessible, masque et filet présents (états finaux en réduction)", () => {
    const { container } = render(
      <Reveal>
        <SectionHead title="Défilé" eyebrow="Test" />
      </Reveal>
    );
    expect(screen.getByRole("heading", { level: 2, name: "Défilé" })).toBeInTheDocument();
    expect(container.querySelector("[data-mask]")).not.toBeNull();
    expect(container.querySelector("[data-line]")?.classList.contains("is-revealed")).toBe(true);
  });

  it("Odometer : la valeur est remplacée directement, largeur réservée", () => {
    const { container, rerender } = render(<Odometer value={1} digits={2} />);
    expect(container.textContent).toBe("1");
    rerender(<Odometer value={7} digits={2} />);
    expect(container.textContent).toBe("7");
    expect((container.firstChild as HTMLElement).style.minWidth).toBe("2ch");
  });
});

// ─── 4. Chemin animé : l'odomètre se stabilise sur la bonne valeur ───────────────

describe("Odometer avec mouvement autorisé", () => {
  it("affiche la paire pendant le défilement puis la valeur finale", async () => {
    window.matchMedia = (() => mql(false)) as typeof window.matchMedia;
    const { container, rerender } = render(<Odometer value={3} />);
    await act(async () => {});
    rerender(<Odometer value={4} />);
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });
    expect(container.textContent).toBe("4");
  });
});

// ─── 5. Garde-fou « zéro look IA » + règles d'animation, sur le code source ─────

function listSources(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "__tests__") listSources(p, out); }
    else if (/\.(tsx?|css)$/.test(e.name)) out.push(p);
  }
  return out;
}
const stripComments = (t: string) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/[^\n]*/g, "");

const INTERDITS: Array<[string, RegExp]> = [
  ["verre dépoli / flou d'arrière-plan", /backdrop-blur|backdrop-filter/],
  ["ombre portée", /\bshadow-(sm|md|lg|xl|2xl|inner)\b|drop-shadow/],
  ["dégradé", /gradient/],
  ["lueur", /\bglow\b/],
  ["noir ou blanc brut hors palette", /\bbg-(black|white)\b/],
  ["transparence sur un jeton (altère les contrastes)", /\b(?:bg|text|border|ring)-[a-z][a-z-]*\/\d+/],
  ["animation infinie / SMIL", /animateTransform|repeatCount|repeat:\s*-1|\binfinite\b/],
  ["tracé par stroke-dashoffset (hors transform/opacity)", /strokeDashoffset|stroke-dashoffset|data-draw/],
];

describe("conformité du code source (section F et règle d'animation)", () => {
  const files = listSources(path.resolve(__dirname, ".."));
  it("trouve des fichiers à contrôler", () => expect(files.length).toBeGreaterThan(10));
  INTERDITS.forEach(([nom, re]) => {
    it(`aucun usage de : ${nom}`, () => {
      const hits = files.flatMap((f) => (re.test(stripComments(fs.readFileSync(f, "utf8"))) ? [path.relative(process.cwd(), f)] : []));
      expect(hits).toEqual([]);
    });
  });
  it("GSAP est toujours importé dynamiquement (aucun import statique)", () => {
    const hits = files.filter((f) => /^\s*import\s[^;]*from\s+["']gsap(\/[^"']*)?["']/m.test(stripComments(fs.readFileSync(f, "utf8"))));
    expect(hits.map((f) => path.relative(process.cwd(), f))).toEqual([]);
  });
});
