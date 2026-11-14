import { describe, expect, it } from "vitest";
import { validerColoris, getColorisChoisi, getImageIdPourColoris, colorisEpuise } from "../lib/coloris";
import { validerIntegriteCatalogue } from "../lib/integrite";
import { genererLienWhatsApp } from "../lib/whatsapp";
import { tenues } from "../../data/tenues";
import droits from "../../data/droits-images.json";
import type { DroitImage, Tenue } from "../types/catalogue";

const base: Tenue = tenues[0];
const droitsMap = new Map((droits as DroitImage[]).map((d) => [d.id, d]));
const avecColoris = (coloris: Tenue["coloris"]): Tenue => ({ ...base, coloris });
const c = (id: string, extra: Partial<NonNullable<Tenue["coloris"]>[number]> = {}) => ({
  id, nom: id, famille: "bleu", pastille: { type: "couleur" as const, valeur: "#112233" },
  imageId: base.imageId, ...extra,
});

describe("coloris — validation", () => {
  it("accepte une tenue sans coloris (rétrocompatible)", () => {
    const e: string[] = [], a: string[] = [];
    validerColoris([base], droitsMap, e, a);
    expect(e).toEqual([]);
  });
  it("accepte des coloris valides", () => {
    const e: string[] = [], a: string[] = [];
    validerColoris([avecColoris([c("a", { defaut: true }), c("b")])], droitsMap, e, a);
    expect(e).toEqual([]);
  });
  it("refuse plusieurs coloris par défaut", () => {
    const e: string[] = [];
    validerColoris([avecColoris([c("a", { defaut: true }), c("b", { defaut: true })])], droitsMap, e, []);
    expect(e.join(" ")).toMatch(/plusieurs coloris/);
  });
  it("refuse les identifiants en double", () => {
    const e: string[] = [];
    validerColoris([avecColoris([c("a"), c("a")])], droitsMap, e, []);
    expect(e.join(" ")).toMatch(/en double/);
  });
  it("refuse une photo absente du registre des droits", () => {
    const e: string[] = [];
    validerColoris([avecColoris([c("a", { imageId: "inconnue" })])], droitsMap, e, []);
    expect(e.join(" ")).toMatch(/registre des droits/);
  });
  it("refuse une taille inconnue de la tenue", () => {
    const e: string[] = [];
    validerColoris([avecColoris([c("a", { tailles: [{ taille: "XS", statut: "disponible", derniereMiseAJour: "2026-11-01" }] })])],
      droitsMap, e, []);
    // la tenue 0 possède XS : pas d'erreur ; une taille absente (tenue homme sans XS) en déclenche une
    const homme = tenues.find((t) => !t.tailles.some((x) => x.taille === "XS"))!;
    const e2: string[] = [];
    validerColoris([{ ...homme, coloris: [{ ...c("a"), imageId: homme.imageId, tailles: [{ taille: "XS", statut: "disponible", derniereMiseAJour: "2026-11-01" }] }] }],
      droitsMap, e2, []);
    expect(e).toEqual([]);
    expect(e2.join(" ")).toMatch(/absente de la tenue/);
  });
  it("le catalogue actuel reste valide (rien de cassé)", () => {
    const r = validerIntegriteCatalogue(tenues, droits as DroitImage[]);
    expect(r.erreurs).toEqual([]);
  });
});

describe("coloris — sélection et disponibilité", () => {
  it("retombe sur le coloris par défaut si l'id est inconnu", () => {
    const t = avecColoris([c("a"), c("b", { defaut: true })]);
    expect(getColorisChoisi(t, "zzz")?.id).toBe("b");
    expect(getColorisChoisi(t, "a")?.id).toBe("a");
  });
  it("utilise l'image du coloris choisi, sinon celle de la tenue", () => {
    const t = avecColoris([c("a", { imageId: "img-robe-wax-001-detail" }), c("b", { defaut: true })]);
    expect(getImageIdPourColoris(t, "a")).toBe("img-robe-wax-001-detail");
    expect(getImageIdPourColoris(base, null)).toBe(base.imageId);
  });
  it("détecte un coloris épuisé", () => {
    const epuise = c("a", { tailles: [{ taille: "S", statut: "epuise", derniereMiseAJour: "2026-11-01" }] });
    expect(colorisEpuise(avecColoris([epuise]), epuise)).toBe(true);
  });
  it("le message WhatsApp accepte le nom d'un coloris", () => {
    const t = avecColoris([c("indigo", { nom: "Bleu indigo" })]);
    const r = genererLienWhatsApp({ tenue: t, taille: "M", couleur: "Bleu indigo", urlFiche: "https://exemple.cg/x" });
    expect(r.messageTexte).toContain("Bleu indigo");
    expect(() => genererLienWhatsApp({ tenue: base, taille: "M", couleur: "Inexistant", urlFiche: "x" })).toThrow();
  });
});
