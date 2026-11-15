"use client";

/**
 * HorizontalShowcase.tsx — Défilé horizontal à trois images (V5 §B, §C2, §D)
 *
 * PRINCIPE
 *  - Au plus trois images visibles : l'image ACTIVE au centre (nette, interactive),
 *    deux voisines atténuées et floutées (décoratives : aria-hidden, sans élément focusable).
 *  - Une position virtuelle continue (`pos`) pilote toutes les cartes : animation GSAP,
 *    glissement au doigt et clavier utilisent le même mécanisme.
 *  - Seuls `transform` et `opacity` sont animés. Le flou est obtenu par fondu d'opacité
 *    entre l'image nette et une variante miniature déjà floutée (jamais de filtre animé).
 *  - Le défilement VERTICAL de la page reste natif (touch-action: pan-y, molette verticale intacte).
 *  - Montage minimal : l'active, ses deux voisines, et deux cartes invisibles en attente.
 *  - Réduction des animations : changement instantané, aucune inertie.
 */

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import InfoPanel from "./InfoPanel";
import type { GarmentDetails } from "./InfoPanel";
import Hotspot from "./Hotspot";
import PiecesAlternativeList from "./PiecesAlternativeList";
import DetailOverlay from "./DetailOverlay";
import CrossfadeImage from "./CrossfadeImage";
import ColorisPicker from "./ColorisPicker";
import SectionHead from "./SectionHead";
import { ChevronIcon, CornerBrackets, MannequinSvg, Platform } from "./HudGraphics";
import type { Coloris, PieceDetail, Tenue } from "../types/catalogue";
import { siteConfig } from "../../site.config";
import { formatPriceXAF } from "../lib/formatters";
import { resoudreImage } from "../lib/images";
import { getColorisChoisi, getColorisDefaut, getImageIdPourColoris } from "../lib/coloris";
import { useReducedMotion } from "../hooks/useReducedMotion";

// ─── Géométrie du défilé ─────────────────────────────────────────────────────

const GAP = 20; // espace entre la carte active et une voisine (px)
const NEIGHBOR_SCALE = 0.82;
const CARD_RATIO = 0.75; // largeur / hauteur (3:4)

interface Metrics {
  cardW: number;
  cardH: number;
  s1: number; // décalage du centre d'une voisine immédiate
  s2: number; // décalage supplémentaire de la carte en attente
}

interface Pose {
  x: number;
  scale: number;
  opacity: number;
  mix: number; // 0 = nette, 1 = floue
  info: number;
}

function poseFor(d: number, m: Metrics): Pose {
  const a = Math.abs(d);
  const s = d < 0 ? -1 : 1;
  if (a <= 1) {
    return { x: s * a * m.s1, scale: 1 - (1 - NEIGHBOR_SCALE) * a, opacity: 1 - 0.45 * a, mix: a, info: Math.max(0, 1 - a * 3) };
  }
  const b = Math.min(a - 1, 1);
  return { x: s * (m.s1 + b * m.s2), scale: NEIGHBOR_SCALE - 0.12 * b, opacity: 0.55 * (1 - b), mix: 1, info: 0 };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pad = (n: number) => String(n).padStart(2, "0");

function tenueToGarmentDetails(tenue: Tenue, coloris?: Coloris): GarmentDetails {
  return {
    title: tenue.nom,
    reference: tenue.reference,
    category: tenue.categorie,
    composition: [tenue.matiere],
    cut: tenue.descriptionCourte,
    details: coloris ? [`Coloris : ${coloris.nom}`] : tenue.couleurs.map((c) => `Coloris : ${c}`),
    sizeGuide: (coloris?.tailles ?? tenue.tailles).map((t) => ({ size: t.taille })),
  };
}

// ─── Carte ───────────────────────────────────────────────────────────────────

interface CardProps {
  index: number;
  total: number;
  tenue: Tenue;
  size: { w: number; h: number };
  heavy: boolean; // les images ne sont chargées que pour l'active et ses voisines
  isActive: boolean;
  imageId: string;
  preloadImageId: string | null;
  register: (i: number, el: HTMLElement | null) => void;
  onNeighborClick: (i: number) => void;
  onInfo: () => void;
  onView360: () => void;
  showTools: boolean;
  children?: React.ReactNode;
}

const Card = React.memo(function Card({
  index, total, tenue, size, heavy, isActive, imageId, preloadImageId, register, onNeighborClick, onInfo, onView360, showTools, children,
}: CardProps) {
  const [failed, setFailed] = useState(false);
  const img = resoudreImage(imageId, tenue.descriptionCourte);

  return (
    <div
      ref={(el) => register(index, el)}
      role="group"
      aria-roledescription="diapositive"
      aria-label={`Tenue ${index + 1} sur ${total}`}
      aria-hidden={!isActive}
      onClick={() => { if (!isActive) onNeighborClick(index); }}
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: size.w,
        height: size.h,
        visibility: "hidden",
        cursor: isActive ? "default" : "pointer",
        transform: "translate3d(-50%, -50%, 0)",
      }}
    >
      {/* Repères de visée (active uniquement) */}
      <div data-info className="pointer-events-none absolute -inset-2 text-accent" style={{ opacity: 0 }}>
        <CornerBrackets size={14} />
      </div>

      <div className="relative w-full h-full overflow-hidden bg-surface border border-border-decor select-none">
        {/* Mannequin de couture dessiné : toujours présent derrière la photo (chargement, image absente) */}
        <MannequinSvg
          className={`absolute inset-0 m-auto h-[86%] w-auto text-border-control ${failed ? "opacity-70" : "opacity-30"}`}
        />

        {heavy && (
          <>
            {/* Image nette */}
            <div data-sharp className="absolute inset-0">
              <CrossfadeImage
                src={img.src}
                alt={isActive ? img.alt : ""}
                sizes="(max-width: 768px) 70vw, 460px"
                onFail={() => setFailed(true)}
              />
            </div>
            {/* Variante miniature floutée (fondu d'opacité avec l'image nette) */}
            <div data-blur className="absolute inset-0 overflow-hidden" style={{ opacity: 0 }}>
              <Image
                src={img.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="48px"
                draggable={false}
                className="object-cover object-top scale-110 blur-[8px]"
              />
            </div>
          </>
        )}

        {/* Préchargement exact (mêmes tailles = même URL) du coloris survolé */}
        {isActive && preloadImageId && (
          <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden="true">
            <Image
              src={resoudreImage(preloadImageId).src}
              alt=""
              fill
              sizes="(max-width: 768px) 70vw, 460px"
              loading="eager"
              draggable={false}
              className="object-cover object-top"
            />
          </div>
        )}

        {/* Éléments réservés à l'image active : points touchables */}
        <div data-info className="absolute inset-0" style={{ opacity: 0 }}>
          {isActive && children}
        </div>

        {/* Actions flottantes en bas à droite de chaque visuel actif : 360° + informations */}
        {isActive && showTools && (
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onView360(); }}
              aria-label={`Voir la tenue ${tenue.nom} en 360°`}
              className="inline-flex min-h-touch min-w-touch items-center gap-1.5 rounded-full border border-accent bg-surface/95 px-3 py-2 hud-label text-accent shadow-md backdrop-blur transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
                <path d="M18.5 2.5v4h-4M5.5 21.5v-4h4" />
              </svg>
              360°
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onInfo(); }}
              aria-label={`Informations sur la tenue : ${tenue.nom}`}
              title="Informations"
              className="flex h-11 min-h-touch w-11 min-w-touch items-center justify-center rounded-full border border-border-control bg-primary text-background shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="7.6" r="0.7" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

// ─── Composant principal ─────────────────────────────────────────────────────

export default function HorizontalShowcase({ tenues }: { tenues: Tenue[] }) {
  const [genre, setGenre] = useState<"tous" | "femme" | "homme">("tous");
  const baseSorted = useMemo(() => [...tenues].sort((a, b) => a.ordreAffichage - b.ordreAffichage), [tenues]);
  const sorted = useMemo(
    () => (genre === "tous" ? baseSorted : baseSorted.filter((t) => t.genre === genre || t.genre === "unisexe")),
    [baseSorted, genre]
  );
  const n = sorted.length;
  const reduced = useReducedMotion();

  const [mountCenter, setMountCenter] = useState(0); // pilote le montage des cartes
  const [metaIndex, setMetaIndex] = useState(0); // tenue affichée dans le bloc d'informations
  const [activeIndex, setActiveIndex] = useState(0); // tenue active (stabilisée)
  const [moving, setMoving] = useState(false);
  const [size, setSize] = useState({ w: 320, h: 427 });
  const [colorisSel, setColorisSel] = useState<Record<string, string>>({});
  const [intent, setIntent] = useState<{ tenueId: string; imageId: string } | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<PieceDetail | null>(null);
  const [tenue360Piece, setTenue360Piece] = useState<{ piece: PieceDetail; nom: string; ref: string } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLElement | null>(null);
  const cardEls = useRef(new Map<number, HTMLElement>());
  const parts = useRef(new WeakMap<HTMLElement, { sharp: HTMLElement[]; blur: HTMLElement[]; info: HTMLElement[] }>());

  const posRef = useRef(0);
  const metrics = useRef<Metrics>({ cardW: 320, cardH: 427, s1: 300, s2: 200 });
  const gsapRef = useRef<typeof import("gsap").default | null>(null);
  const tweenRef = useRef<{ kill: () => void } | null>(null);
  const movingRef = useRef(false);
  const activeRef = useRef(0);
  const metaRefIdx = useRef(0);
  const queuedRef = useRef<1 | -1 | null>(null);
  const overlayOpenRef = useRef(false);
  const inViewRef = useRef(false);
  const userMovedRef = useRef(false);
  const dragRef = useRef<{ id: number; x: number; y: number; start: number; active: boolean; samples: Array<[number, number]> } | null>(null);
  const justDraggedRef = useRef(false);

  useEffect(() => { overlayOpenRef.current = selectedPiece !== null || infoOpen || tenue360Piece !== null; }, [selectedPiece, infoOpen, tenue360Piece]);

  // ── Chargement différé de GSAP ──
  useEffect(() => {
    let alive = true;
    import("gsap").then((m) => { if (alive) gsapRef.current = m.default; });
    return () => { alive = false; tweenRef.current?.kill(); };
  }, []);

  // ── Application des poses (appelée à chaque image de l'animation) ──
  const register = useCallback((i: number, el: HTMLElement | null) => {
    if (el) {
      cardEls.current.set(i, el);
      parts.current.set(el, {
        sharp: Array.from(el.querySelectorAll<HTMLElement>("[data-sharp]")),
        blur: Array.from(el.querySelectorAll<HTMLElement>("[data-blur]")),
        info: Array.from(el.querySelectorAll<HTMLElement>("[data-info]")),
      });
    } else {
      cardEls.current.delete(i);
    }
  }, []);

  const apply = useCallback(() => {
    const m = metrics.current;
    const p = posRef.current;
    cardEls.current.forEach((el, i) => {
      // Les enfants peuvent apparaître après l'enregistrement (images) : on relit les éléments si besoin
      let cached = parts.current.get(el);
      if (!cached || cached.sharp.length === 0) {
        cached = {
          sharp: Array.from(el.querySelectorAll<HTMLElement>("[data-sharp]")),
          blur: Array.from(el.querySelectorAll<HTMLElement>("[data-blur]")),
          info: Array.from(el.querySelectorAll<HTMLElement>("[data-info]")),
        };
        parts.current.set(el, cached);
      }
      const d = i - p;
      const ps = poseFor(d, m);
      el.style.transform = `translate3d(${ps.x - m.cardW / 2}px, -50%, 0) scale(${ps.scale})`;
      el.style.opacity = String(ps.opacity);
      el.style.visibility = ps.opacity <= 0.001 ? "hidden" : "visible";
      el.style.zIndex = String(10 - Math.round(Math.abs(d)));
      cached.sharp.forEach((s) => { s.style.opacity = String(1 - ps.mix); });
      cached.blur.forEach((b) => { b.style.opacity = String(ps.mix); });
      cached.info.forEach((f) => { f.style.opacity = String(ps.info); });
    });
    if (metaRef.current) {
      const frac = Math.abs(p - Math.round(p));
      metaRef.current.style.opacity = String(Math.max(0, 1 - frac * 2.4));
    }
    if (thumbRef.current) {
      thumbRef.current.style.transform = `translate3d(${p * 100}%, 0, 0)`;
    }
  }, []);

  // Réapplique les poses après chaque rendu (nouvelles cartes montées, redimensionnement)
  useLayoutEffect(() => { apply(); });

  // ── Mesures ──
  const measure = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    let cardH = Math.max(240, h - 32);
    let cardW = cardH * CARD_RATIO;
    const maxW = w * 0.62;
    if (cardW > maxW) { cardW = maxW; cardH = cardW / CARD_RATIO; }
    const s1 = cardW * 0.5 + cardW * NEIGHBOR_SCALE * 0.5 + GAP;
    metrics.current = { cardW, cardH, s1, s2: s1 * 0.72 };
    setSize({ w: Math.round(cardW), h: Math.round(cardH) });
  }, []);

  useEffect(() => {
    measure();
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // ── Adresse partageable (remplacement d'historique, après une action de l'utilisateur) ──
  const writeUrl = useCallback((index: number, colorisId?: string) => {
    if (!userMovedRef.current) return;
    const t = sorted[index];
    if (!t) return;
    const url = new URL(window.location.href);
    url.searchParams.set("tenue", t.slug);
    const def = getColorisDefaut(t)?.id;
    if (colorisId && colorisId !== def) url.searchParams.set("coloris", colorisId);
    else url.searchParams.delete("coloris");
    window.history.replaceState(window.history.state, "", url.toString());
  }, [sorted]);

  // ── Stabilisation ──
  const stepRef = useRef<(dir: 1 | -1) => void>(() => {});

  const settle = useCallback((target: number) => {
    movingRef.current = false;
    activeRef.current = target;
    metaRefIdx.current = target;
    setMoving(false);
    setActiveIndex(target);
    setMetaIndex(target);
    setMountCenter(target);
    setIntent(null);
    writeUrl(target, colorisSel[sorted[target]?.id]);
    const q = queuedRef.current;
    queuedRef.current = null;
    if (q) stepRef.current(q);
  }, [sorted, colorisSel, writeUrl]);

  const moveTo = useCallback((rawTarget: number, instant = false) => {
    const target = clamp(rawTarget, 0, n - 1);
    const g = gsapRef.current;
    tweenRef.current?.kill();
    setMountCenter(target);
    if (instant || reduced || !g) {
      posRef.current = target;
      apply();
      settle(target);
      return;
    }
    movingRef.current = true;
    setMoving(true);
    setInfoOpen(false);
    const proxy = { v: posRef.current };
    tweenRef.current = g.to(proxy, {
      v: target,
      duration: 0.62,
      ease: "power3.inOut",
      onUpdate: () => {
        posRef.current = proxy.v;
        apply();
        const r = Math.round(proxy.v);
        if (r !== metaRefIdx.current) { metaRefIdx.current = r; setMetaIndex(r); }
      },
      onComplete: () => { posRef.current = target; apply(); settle(target); },
    });
  }, [n, reduced, apply, settle]);

  const step = useCallback((dir: 1 | -1) => {
    if (overlayOpenRef.current) return;
    userMovedRef.current = true;
    if (movingRef.current) { queuedRef.current = dir; return; } // une seule action en file
    const target = activeRef.current + dir;
    if (target < 0 || target > n - 1) return;
    moveTo(target);
  }, [n, moveTo]);
  useEffect(() => { stepRef.current = step; }, [step]);

  // ── Entrée initiale : ?tenue= / ?coloris= et événement de navigation externe ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("tenue");
    const idx = slug ? sorted.findIndex((t) => t.slug === slug) : -1;
    if (idx >= 0) {
      const cid = params.get("coloris");
      if (cid && sorted[idx].coloris?.some((c) => c.id === cid)) {
        setColorisSel((s) => ({ ...s, [sorted[idx].id]: cid }));
      }
      posRef.current = idx;
      activeRef.current = idx;
      metaRefIdx.current = idx;
      setMountCenter(idx); setActiveIndex(idx); setMetaIndex(idx);
      requestAnimationFrame(() => rootRef.current?.scrollIntoView({ block: "start" }));
    }
    const onGoto = (e: Event) => {
      const slugTarget = (e as CustomEvent<string>).detail;
      const i = sorted.findIndex((t) => t.slug === slugTarget);
      if (i < 0) {
        // La tenue est masquée par le filtre genre : on lève le filtre puis on y va
        const j = baseSorted.findIndex((t) => t.slug === slugTarget);
        if (j < 0) return;
        setGenre("tous");
        userMovedRef.current = true;
        rootRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        window.setTimeout(() => moveTo(j, true), 80);
        return;
      }
      rootRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      if (i >= 0) { userMovedRef.current = true; moveTo(i, true); }
    };
    window.addEventListener("showcase:goto", onGoto);
    return () => window.removeEventListener("showcase:goto", onGoto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted, baseSorted]);

  // ── Changement de filtre genre : retour au début du défilé ──
  useEffect(() => {
    posRef.current = 0;
    activeRef.current = 0;
    metaRefIdx.current = 0;
    setMountCenter(0);
    setActiveIndex(0);
    setMetaIndex(0);
    setInfoOpen(false);
    setSelectedPiece(null);
    setTenue360Piece(null);
    apply();
  }, [genre, apply]);

  // ── Visibilité de la section (clavier global actif seulement quand elle est à l'écran) ──
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => { inViewRef.current = entry.intersectionRatio >= 0.4; }, { threshold: [0, 0.4, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Clavier : flèches gauche/droite, Début, Fin ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current || overlayOpenRef.current) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target instanceof Element ? e.target : null;
      if (t && (t.closest("input, textarea, select, [contenteditable='true'], [role='radiogroup']"))) return;
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      else if (e.key === "Home") { e.preventDefault(); userMovedRef.current = true; if (!movingRef.current) moveTo(0); }
      else if (e.key === "End") { e.preventDefault(); userMovedRef.current = true; if (!movingRef.current) moveTo(n - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, moveTo, n]);

  // ── Trackpad horizontal et Maj + molette (la molette verticale reste native) ──
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let lastEvent = 0;
    const onWheel = (e: WheelEvent) => {
      if (overlayOpenRef.current) return;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 && Math.abs(e.deltaX) > 12;
      const shiftWheel = e.shiftKey && Math.abs(e.deltaY) > 12 && Math.abs(e.deltaX) < 1;
      if (!horizontal && !shiftWheel) return; // geste vertical : la page défile normalement
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastEvent;
      lastEvent = now;
      if (gap < 160) return; // même geste (inertie du trackpad) : un seul pas
      step((horizontal ? e.deltaX : e.deltaY) > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step]);

  // ── Glissement horizontal (pointeur/tactile). touch-action: pan-y laisse le défilement vertical au navigateur ──
  const onPointerDown = (e: React.PointerEvent) => {
    if (overlayOpenRef.current || movingRef.current || (e.pointerType === "mouse" && e.button !== 0)) return;
    dragRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY, start: posRef.current, active: false, samples: [[performance.now(), e.clientX]] };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.active) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      d.active = true;
      userMovedRef.current = true;
      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* noop */ }
      setInfoOpen(false);
      setMountCenter(Math.round(posRef.current));
    }
    const m = metrics.current;
    const raw = d.start - dx / m.s1;
    // Résistance élastique aux extrémités
    const over = raw < 0 ? raw : raw > n - 1 ? raw - (n - 1) : 0;
    posRef.current = clamp(raw - over * 0.65, -0.35, n - 1 + 0.35);
    d.samples.push([performance.now(), e.clientX]);
    if (d.samples.length > 6) d.samples.shift();
    apply();
    const r = clamp(Math.round(posRef.current), 0, n - 1);
    if (r !== metaRefIdx.current) { metaRefIdx.current = r; setMetaIndex(r); setMountCenter(r); }
  };

  const endDrag = (e: React.PointerEvent, cancelled = false) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    if (!d.active) return;
    justDraggedRef.current = true;
    setTimeout(() => { justDraggedRef.current = false; }, 60);
    const m = metrics.current;
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const v = last[0] > first[0] ? (last[1] - first[1]) / (last[0] - first[0]) : 0; // px/ms
    const delta = posRef.current - d.start;
    let target = Math.round(d.start);
    if (!cancelled && (Math.abs(delta) > 0.18 || Math.abs(v) > 0.4)) {
      const dir = Math.abs(delta) > 0.18 ? Math.sign(delta) : -Math.sign(v);
      target = Math.round(d.start) + dir;
    }
    void m;
    moveTo(clamp(target, 0, n - 1), reduced);
  };

  const onNeighborClick = useCallback((i: number) => {
    if (justDraggedRef.current || movingRef.current || overlayOpenRef.current) return;
    userMovedRef.current = true;
    moveTo(i);
  }, [moveTo]);

  // ── Vue 360° au niveau tenue (fonctionne pour TOUTES les tenues, même sans dossier de frames) ──
  const openTenue360 = useCallback((tenue: Tenue) => {
    if (movingRef.current) return;
    const mainSrc = resoudreImage(getImageIdPourColoris(tenue, colorisSel[tenue.id]), tenue.descriptionCourte).src;
    const secondaires = (tenue.imagesSecondairesIds ?? []).map((id) => resoudreImage(id, tenue.descriptionCourte).src);
    const rotationHeritee = tenue.pieces?.find((p) => p.rotation)?.rotation;
    const piece: PieceDetail = {
      id: `tenue-${tenue.id}-vue-360`,
      nom: `Vue 360° — ${tenue.nom}`,
      type: "vetement",
      matiere: tenue.matiere,
      description: tenue.descriptionLongue ?? tenue.descriptionCourte,
      texteAlternatif: `Vue à 360 degrés de ${tenue.nom}`,
      zoneTouchable: { x: 50, y: 50, width: 0, height: 0, nomAccessible: `Voir ${tenue.nom} en 360 degrés` },
      photos: [mainSrc, ...secondaires],
      ...(rotationHeritee ? { rotation: rotationHeritee } : {}),
    };
    setInfoOpen(false);
    if (document.activeElement instanceof HTMLElement) infoButtonRef.current = document.activeElement;
    setTenue360Piece({ piece, nom: tenue.nom, ref: tenue.reference });
  }, [colorisSel]);

  // ── Pièces / détail ──
  const handleSelectPiece = useCallback((piece: PieceDetail) => {
    if (movingRef.current) return;
    setInfoOpen(false);
    setSelectedPiece(piece);
  }, []);

  // ── Coloris ──
  const selectColoris = (tenue: Tenue, id: string) => {
    userMovedRef.current = true;
    setColorisSel((s) => ({ ...s, [tenue.id]: id }));
    const idx = sorted.findIndex((t) => t.id === tenue.id);
    writeUrl(idx, id);
  };

  const onColorisIntent = (tenue: Tenue, c: Coloris) => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return; // jamais en mode économie de données
    setIntent({ tenueId: tenue.id, imageId: c.imageId });
  };

  if (n === 0) return null;

  const metaTenue = sorted[clamp(metaIndex, 0, n - 1)];
  const activeTenue = sorted[clamp(activeIndex, 0, n - 1)];
  const metaColoris = getColorisChoisi(metaTenue, colorisSel[metaTenue.id]);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === n - 1;
  const showMetaTools = metaIndex === activeIndex && !moving;

  const navBtn = (disabled: boolean) =>
    `flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-control bg-surface text-primary transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 ${disabled ? "opacity-30 cursor-default" : ""}`;

  return (
    <div
      ref={rootRef}
      id="defile"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Défilé de mode"
      className="relative scroll-mt-0"
    >
      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <SectionHead
          eyebrow="Le défilé — Brazzaville"
          title="Défilé"
          variant="defile"
          right={
            <span className="inline-flex items-center gap-2" aria-hidden="true">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              {clamp(metaIndex, 0, n - 1) + 1} / {n} créations
            </span>
          }
        />

        {/* Filtre Homme / Femme — segmenté premium */}
        <div data-reveal className="mt-6 flex flex-wrap items-center gap-3">
          <p className="hud-label text-secondary">Vestiaire :</p>
          <div role="group" aria-label="Filtrer les tenues par vestiaire" className="inline-flex items-center gap-1 border border-border-control bg-surface p-1">
            {(["tous", "femme", "homme"] as const).map((g) => {
              const actif = genre === g;
              const count = g === "tous" ? baseSorted.length : baseSorted.filter((t) => t.genre === g || t.genre === "unisexe").length;
              const label = g === "tous" ? "Tous" : g === "femme" ? "Femme" : "Homme";
              return (
                <button
                  key={g}
                  type="button"
                  aria-pressed={actif}
                  onClick={() => { userMovedRef.current = true; setGenre(g); }}
                  className={`inline-flex min-h-touch items-center gap-2 px-4 py-2 hud-label transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 ${actif ? "bg-primary text-background" : "text-secondary hover:text-primary"}`}
                >
                  {actif && <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />}
                  {label}
                  <span aria-hidden="true" className={actif ? "opacity-70" : "opacity-50"}>· {count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p aria-live="polite" className="sr-only">
          {genre === "tous" ? "Toutes les tenues" : genre === "femme" ? "Vestiaire femme" : "Vestiaire homme"} : {n} modèle{n > 1 ? "s" : ""} affiché{n > 1 ? "s" : ""}
        </p>
      </div>

      {/* Scène : touch-action pan-y = le défilement vertical de la page reste natif */}
      <div data-reveal className="relative mt-8">
        <div
          ref={stageRef}
          data-showcase-stage
          className="relative w-full overflow-hidden select-none"
          style={{
            height: "clamp(440px, 68dvh, 700px)",
            touchAction: "pan-y",
            opacity: selectedPiece ? 0.3 : 1,
            transition: "opacity 300ms ease-out",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e)}
          onPointerCancel={(e) => endDrag(e, true)}
        >
          {/* Plateforme de défilé */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[min(92%,780px)] text-border-decor">
            <Platform className="w-full h-auto" />
          </div>

          {sorted.map((t, i) => {
            if (Math.abs(i - mountCenter) > 2) return null;
            const heavy = Math.abs(i - mountCenter) <= 1;
            const isActiveCard = i === activeIndex;
            const imageId = getImageIdPourColoris(t, colorisSel[t.id]);
            return (
              <Card
                key={t.id}
                index={i}
                total={n}
                tenue={t}
                size={size}
                heavy={heavy}
                isActive={isActiveCard}
                imageId={imageId}
                preloadImageId={intent && intent.tenueId === t.id ? intent.imageId : null}
                register={register}
                onNeighborClick={onNeighborClick}
                showTools={isActiveCard && !moving && !selectedPiece && !infoOpen && !tenue360Piece}
                onInfo={() => {
                  if (document.activeElement instanceof HTMLElement) infoButtonRef.current = document.activeElement;
                  setInfoOpen(true);
                }}
                onView360={() => openTenue360(t)}
              >
                {isActiveCard && !moving && t.pieces?.map((piece) => (
                  <Hotspot
                    key={piece.id}
                    piece={piece}
                    onSelect={handleSelectPiece}
                    isActive={selectedPiece?.id === piece.id}
                    disabled={moving || !!selectedPiece || infoOpen}
                  />
                ))}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Informations de la tenue active */}
      <div data-reveal className="relative mx-auto max-w-2xl px-6 pt-6 text-center">
        <div ref={metaRef}>
          <p className="hud-label text-secondary">
            {metaTenue.collection} — {metaTenue.genre}
          </p>
          <h2 className="mt-2 font-serif text-3xl md:text-5xl font-normal leading-tight text-primary">{metaTenue.nom}</h2>
          <p className="mt-2 font-mono text-sm text-secondary tracking-wide">
            {formatPriceXAF(metaTenue.prixXAF)} <span aria-hidden="true">·</span> RÉF {metaTenue.reference}
          </p>

          <div className="mt-4 min-h-[5.5rem]">
            {showMetaTools && (
              <ColorisPicker
                tenue={activeTenue}
                selectedId={metaColoris?.id ?? ""}
                onSelect={(id) => selectColoris(activeTenue, id)}
                onIntent={(c) => onColorisIntent(activeTenue, c)}
              />
            )}
          </div>

          <div className="mt-2 flex flex-col items-center gap-3">
            <p className="hud-label text-secondary">
              <span aria-hidden="true" className="text-accent">◆</span> Toucher les pastilles sur le visuel pour examiner chaque détail
            </p>
            {showMetaTools && activeTenue.pieces && activeTenue.pieces.length > 0 && (
              <PiecesAlternativeList pieces={activeTenue.pieces} onSelectPiece={handleSelectPiece} selectedPieceId={null} className="w-full max-w-md" />
            )}
          </div>
        </div>
      </div>

      {/* Navigation + progression chic (pastilles diamant, sans numérotation 01/02) */}
      <nav aria-label="Navigation entre les tenues" className="relative mx-auto flex max-w-2xl items-center gap-4 px-6 pb-6 pt-8">
        <button type="button" onClick={() => step(-1)} aria-label="Tenue précédente" aria-disabled={isFirst} tabIndex={isFirst ? -1 : 0} className={navBtn(isFirst)}>
          <ChevronIcon direction="left" />
        </button>
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex items-center gap-2" role="presentation">
            {sorted.map((t, i) => (
              <span
                key={t.id}
                aria-hidden="true"
                className={`block h-1.5 rotate-45 border transition-all duration-300 ${i === activeIndex ? "w-1.5 border-accent bg-accent" : "w-1.5 border-border-control bg-transparent opacity-60"}`}
              />
            ))}
          </div>
          <p className="hud-label text-secondary" aria-hidden="true">
            {activeTenue.genre === "homme" ? "Vestiaire homme" : activeTenue.genre === "femme" ? "Vestiaire femme" : "Vestiaire"} — {activeIndex + 1} sur {n}
          </p>
        </div>
        <button type="button" onClick={() => step(1)} aria-label="Tenue suivante" aria-disabled={isLast} tabIndex={isLast ? -1 : 0} className={navBtn(isLast)}>
          <ChevronIcon direction="right" />
        </button>
      </nav>

      {isLast && !moving && (
        <p className="sr-only">Fin de la collection.</p>
      )}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Tenue ${activeIndex + 1} sur ${n} : ${activeTenue.nom}${metaColoris && (activeTenue.coloris?.length ?? 0) > 1 ? `, coloris ${metaColoris.nom}` : ""}`}
      </div>

      <InfoPanel
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        garment={tenueToGarmentDetails(activeTenue, getColorisChoisi(activeTenue, colorisSel[activeTenue.id]))}
        triggerRef={infoButtonRef}
      />

      {tenue360Piece && (
        <DetailOverlay
          piece={tenue360Piece.piece}
          tenueNom={tenue360Piece.nom}
          tenueReference={tenue360Piece.ref}
          whatsappPhone={siteConfig.telephoneWhatsApp}
          onClosed={() => setTenue360Piece(null)}
        />
      )}

      {selectedPiece && (
        <DetailOverlay
          piece={selectedPiece}
          tenueNom={activeTenue.nom}
          tenueReference={activeTenue.reference}
          whatsappPhone={siteConfig.telephoneWhatsApp}
          onClosed={() => setSelectedPiece(null)}
        />
      )}
    </div>
  );
}
