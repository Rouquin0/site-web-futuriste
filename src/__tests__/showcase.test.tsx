import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import HorizontalShowcase from "../components/HorizontalShowcase";
import ColorisPicker from "../components/ColorisPicker";
import { tenues } from "../../data/tenues";
import type { Tenue } from "../types/catalogue";

beforeEach(() => { window.history.replaceState(null, "", "/"); });

const live = () => document.querySelector("[aria-live='polite']")!.textContent ?? "";
const press = (key: string) => act(() => { fireEvent.keyDown(window, { key }); });

describe("défilé horizontal", () => {
  it("n'expose qu'une seule carte active ; les voisines sont décoratives (aria-hidden)", () => {
    const { container } = render(<HorizontalShowcase tenues={tenues} />);
    const cards = container.querySelectorAll("[aria-roledescription='diapositive']");
    expect(cards.length).toBeLessThanOrEqual(3);
    const visibles = Array.from(cards).filter((c) => c.getAttribute("aria-hidden") === "false");
    expect(visibles).toHaveLength(1);
    // aucune voisine ne contient d'élément focusable
    Array.from(cards).filter((c) => c.getAttribute("aria-hidden") === "true").forEach((c) => {
      expect(c.querySelectorAll("button, a, input, [tabindex]").length).toBe(0);
    });
  });

  it("ne monte jamais plus de cinq cartes (trois visibles + deux en attente)", () => {
    const { container } = render(<HorizontalShowcase tenues={tenues} />);
    expect(container.querySelectorAll("[aria-roledescription='diapositive']").length).toBeLessThanOrEqual(5);
  });

  it("avance et recule avec les flèches du clavier, sans boucle", () => {
    render(<HorizontalShowcase tenues={tenues} />);
    expect(live()).toContain("Tenue 1 sur 5");
    press("ArrowLeft");
    expect(live()).toContain("Tenue 1 sur 5"); // pas de boucle
    press("ArrowRight");
    expect(live()).toContain("Tenue 2 sur 5");
    press("End");
    expect(live()).toContain("Tenue 5 sur 5");
    press("ArrowRight");
    expect(live()).toContain("Tenue 5 sur 5");
    press("Home");
    expect(live()).toContain("Tenue 1 sur 5");
  });

  it("les boutons précédent / suivant fonctionnent", () => {
    render(<HorizontalShowcase tenues={tenues} />);
    act(() => { fireEvent.click(screen.getByLabelText("Tenue suivante")); });
    expect(live()).toContain("Tenue 2 sur 5");
    act(() => { fireEvent.click(screen.getByLabelText("Tenue précédente")); });
    expect(live()).toContain("Tenue 1 sur 5");
  });

  it("un clic sur une voisine la recentre", () => {
    const { container } = render(<HorizontalShowcase tenues={tenues} />);
    const cards = Array.from(container.querySelectorAll("[aria-roledescription='diapositive']"));
    act(() => { fireEvent.click(cards[1]); });
    expect(live()).toContain("Tenue 2 sur 5");
  });

  it("met à jour l'adresse partageable après une action (?tenue=)", () => {
    render(<HorizontalShowcase tenues={tenues} />);
    expect(window.location.search).toBe("");
    press("ArrowRight");
    expect(window.location.search).toContain("tenue=");
  });

  it("la molette verticale n'est jamais interceptée (la page défile)", () => {
    const { container } = render(<HorizontalShowcase tenues={tenues} />);
    const stage = container.querySelector("[data-showcase-stage]") as HTMLElement;
    const ev = new WheelEvent("wheel", { deltaY: 120, deltaX: 0, cancelable: true, bubbles: true });
    stage.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(false);
  });

  it("le trackpad horizontal fait avancer d'un pas par geste", () => {
    const { container } = render(<HorizontalShowcase tenues={tenues} />);
    const stage = container.querySelector("[data-showcase-stage]") as HTMLElement;
    const ev = new WheelEvent("wheel", { deltaX: 80, deltaY: 2, cancelable: true, bubbles: true });
    act(() => { stage.dispatchEvent(ev); });
    expect(ev.defaultPrevented).toBe(true);
    expect(live()).toContain("Tenue 2 sur 5");
  });
});

describe("pastilles de coloris", () => {
  const t: Tenue = {
    ...tenues[0],
    coloris: [
      { id: "a", nom: "Wengé", famille: "marron", pastille: { type: "couleur", valeur: "#4a2c1a" }, imageId: tenues[0].imageId, defaut: true },
      { id: "b", nom: "Indigo", famille: "bleu", pastille: { type: "couleur", valeur: "#1f3a6e" }, imageId: tenues[0].imageId },
    ],
  };

  it("ne s'affiche pas avec un seul coloris", () => {
    const { container } = render(<ColorisPicker tenue={{ ...t, coloris: [t.coloris![0]] }} selectedId="a" onSelect={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("annonce l'état de chaque coloris et se pilote aux flèches", () => {
    const picked: string[] = [];
    render(<ColorisPicker tenue={t} selectedId="a" onSelect={(id) => picked.push(id)} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
    expect(radios[0].getAttribute("aria-label")).toMatch(/Wengé.*sélectionné/);
    fireEvent.keyDown(radios[0], { key: "ArrowRight" });
    expect(picked).toEqual(["b"]);
  });

  it("n'utilise pas la couleur seule : le nom et le nombre de coloris sont écrits", () => {
    render(<ColorisPicker tenue={t} selectedId="b" onSelect={() => {}} />);
    expect(screen.getByText(/2 coloris — Indigo/)).toBeInTheDocument();
  });
});
