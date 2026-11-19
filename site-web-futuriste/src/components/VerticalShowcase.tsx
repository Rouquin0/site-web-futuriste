"use client";

/**
 * VerticalShowcase.tsx — Défilé immersif GSAP (Lot 1, V4.2)
 * Corrigé : useMemo pour éviter la boucle infinie (Maximum update depth)
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo, // Ajout de useMemo
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import InfoPanel from "./InfoPanel";
import type { GarmentDetails } from "./InfoPanel";
import Hotspot from "./Hotspot";
import PiecesAlternativeList from "./PiecesAlternativeList";
import DetailViewer from "./DetailViewer";
import type { Tenue, DroitImage, PieceDetail } from "../types/catalogue";
import { siteConfig } from "../../site.config";
import droitsImagesData from "../../data/droits-images.json";

const droitsMap = new Map<string, DroitImage>(
  (droitsImagesData as DroitImage[]).map((d) => [d.id, d])
);

// ─── Types ───────────────────────────────────────────────────────────────────

interface VerticalShowcaseProps {
  tenues: Tenue[];
}

type Direction = "forward" | "backward";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function padIndex(n: number): string {
  return String(n).padStart(2, "0");
}

function tenueToGarmentDetails(tenue: Tenue): GarmentDetails {
  return {
    title: tenue.nom,
    reference: tenue.reference,
    category: tenue.categorie,
    composition: [tenue.matiere],
    cut: tenue.descriptionCourte,
    details: tenue.couleurs.map((c) => `Coloris : ${c}`),
    sizeGuide: tenue.tailles.map((t) => ({ size: t.taille })),
  };
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function VerticalShowcase({ tenues }: VerticalShowcaseProps) {
  // ✅ CORRECTION 1 : Mémoïser le tri pour éviter la boucle infinie
  const sorted = useMemo(() => {
    return [...tenues].sort((a, b) => a.ordreAffichage - b.ordreAffichage);
  }, [tenues]);
  
  const total = sorted.length;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // ✅ CORRECTION 2 : Sécuriser le useEffect pour qu'il ne tourne qu'une fois
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("tenue");
    if (slug) {
      const idx = sorted.findIndex((t) => t.slug === slug);
      if (idx !== -1 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted]); 

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [queuedDirection, setQueuedDirection] = useState<Direction | null>(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<PieceDetail | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const observerRef = useRef<{ kill: () => void } | null>(null);
  const isTransitioningRef = useRef(false);
  const infoPanelOpenRef = useRef(false);
  const detailViewerOpenRef = useRef(false);
  const detailTriggerRef = useRef<Element | null>(null);
  const detailOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => { isTransitioningRef.current = isTransitioning; }, [isTransitioning]);
  useEffect(() => { infoPanelOpenRef.current = isInfoPanelOpen; }, [isInfoPanelOpen]);
  useEffect(() => { detailViewerOpenRef.current = selectedPiece !== null; }, [selectedPiece]);

  useEffect(() => {
    if (!selectedPiece) return;
    const overlay = detailOverlayRef.current;
    if (!overlay) return;

    import("gsap").then(({ default: gsap }) => {
      gsap.fromTo(
        overlay,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0.15 : 0.4,
          ease: reducedMotion ? "none" : "power2.out",
        }
      );
    });
  }, [selectedPiece, reducedMotion]);

  useEffect(() => {
    if (sorted[currentIndex]) {
      history.replaceState(null, "", `/?tenue=${sorted[currentIndex].slug}`);
    }
  }, [currentIndex, sorted]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) return;
    const nextTenue = sorted[nextIndex];
    const nextDroit = nextTenue ? droitsMap.get(nextTenue.imageId) : undefined;
    const src = nextDroit?.fichier ?? `/images/tenues/${nextTenue.imageId}.webp`;

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(() => {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "image";
          link.href = src;
          document.head.appendChild(link);
        })
      : undefined;

    return () => {
      if (idleId !== undefined && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [currentIndex, sorted, total]);

  const goTo = useCallback(
    async (nextIndex: number, direction: Direction) => {
      if (nextIndex < 0 || nextIndex >= total) return;
      if (isTransitioningRef.current) {
        setQueuedDirection(direction);
        return;
      }

      setIsTransitioning(true);
      isTransitioningRef.current = true;

      const slot = slotRef.current;
      if (!slot) {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        isTransitioningRef.current = false;
        return;
      }

      const gsap = (await import("gsap")).default;

      if (reducedMotion) {
        slot.style.willChange = "opacity";
        await new Promise<void>((resolve) => {
          gsap.to(slot, { opacity: 0, duration: 0.15, ease: "none", onComplete: resolve });
        });
        slot.style.visibility = "hidden";
        slot.setAttribute("inert", "");
        setCurrentIndex(nextIndex);
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        slot.style.visibility = "visible";
        slot.removeAttribute("inert");
        gsap.fromTo(
          slot,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.15,
            ease: "none",
            onComplete: () => {
              slot.style.willChange = "auto";
              setIsTransitioning(false);
              isTransitioningRef.current = false;
            },
          }
        );
      } else {
        const exitY = direction === "forward" ? -40 : 40;
        const enterY = direction === "forward" ? 60 : -60;
        slot.style.willChange = "transform, opacity";

        await new Promise<void>((resolve) => {
          gsap.to(slot, { y: exitY, opacity: 0, duration: 0.35, ease: "power2.in", onComplete: resolve });
        });

        slot.style.visibility = "hidden";
        slot.setAttribute("inert", "");
        gsap.set(slot, { y: 0, opacity: 0 });
        setCurrentIndex(nextIndex);

        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        );

        slot.style.visibility = "visible";
        slot.removeAttribute("inert");

        gsap.fromTo(
          slot,
          { y: enterY, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            onComplete: () => {
              slot.style.willChange = "auto";
              setIsTransitioning(false);
              isTransitioningRef.current = false;
            },
          }
        );
      }
    },
    [total, reducedMotion]
  );

  useEffect(() => {
    if (!isTransitioning && queuedDirection !== null) {
      const dir = queuedDirection;
      setQueuedDirection(null);
      if (dir === "forward" && currentIndex < total - 1) goTo(currentIndex + 1, "forward");
      else if (dir === "backward" && currentIndex > 0) goTo(currentIndex - 1, "backward");
    }
  }, [isTransitioning, queuedDirection, currentIndex, total, goTo]);

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) goTo(currentIndex + 1, "forward");
    else setQueuedDirection(null);
  }, [currentIndex, total, goTo]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1, "backward");
    else setQueuedDirection(null);
  }, [currentIndex, goTo]);

  const handleSelectPiece = useCallback(
    async (piece: PieceDetail) => {
      if (isTransitioningRef.current || detailViewerOpenRef.current || infoPanelOpenRef.current) return;
      detailTriggerRef.current = document.activeElement;
      detailViewerOpenRef.current = true;
      setSelectedPiece(piece);

      const gsap = (await import("gsap")).default;
      const slot = slotRef.current;
      if (slot) {
        gsap.to(slot, { opacity: 0.3, duration: reducedMotion ? 0.15 : 0.35, ease: reducedMotion ? "none" : "power2.out" });
      }
    },
    [reducedMotion]
  );

  const handleCloseDetailViewer = useCallback(async () => {
    const gsap = (await import("gsap")).default;
    const overlay = detailOverlayRef.current;
    if (overlay) {
      await new Promise<void>((resolve) => {
        gsap.to(overlay, { opacity: 0, y: 20, duration: reducedMotion ? 0.1 : 0.25, ease: "power2.in", onComplete: resolve });
      });
    }

    const slot = slotRef.current;
    if (slot) {
      gsap.to(slot, { opacity: 1, duration: reducedMotion ? 0.1 : 0.3, ease: reducedMotion ? "none" : "power2.out" });
    }

    setSelectedPiece(null);
    detailViewerOpenRef.current = false;

    requestAnimationFrame(() => {
      if (detailTriggerRef.current instanceof HTMLElement) {
        detailTriggerRef.current.focus();
      }
    });
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion) return;
      let loadedObserver: { kill: () => void } | null = null;

      import("gsap/Observer").then(({ Observer }) => {
        import("gsap").then(({ default: gsap }) => {
          gsap.registerPlugin(Observer);
          loadedObserver = Observer.create({
            target: sceneRef.current,
            type: "wheel,touch",
            wheelSpeed: -1,
            tolerance: 10,
            preventDefault: true,
            onDown: () => {
              if (infoPanelOpenRef.current || detailViewerOpenRef.current) return;
              if (isTransitioningRef.current) { setQueuedDirection("backward"); return; }
              goPrev();
            },
            onUp: () => {
              if (infoPanelOpenRef.current || detailViewerOpenRef.current) return;
              if (isTransitioningRef.current) { setQueuedDirection("forward"); return; }
              goNext();
            },
          });
          observerRef.current = loadedObserver;
        });
      });

      return () => {
        loadedObserver?.kill();
        observerRef.current = null;
      };
    },
    { scope: sceneRef, dependencies: [reducedMotion, goNext, goPrev] }
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInfoPanelOpen || selectedPiece !== null) return;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInfoPanelOpen, selectedPiece, goNext, goPrev]);

  const tenue = sorted[currentIndex];
  const droitActif = tenue ? droitsMap.get(tenue.imageId) : undefined;
  const imageSrc = droitActif?.fichier ?? `/images/tenues/${tenue?.imageId}.webp`;
  const imageAlt = droitActif?.texteAlternatif ?? tenue?.descriptionCourte ?? "";
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <>
      <div
        ref={sceneRef}
        className="relative w-full bg-background overflow-hidden"
        style={{ height: "100dvh", overscrollBehavior: "none", touchAction: "none" }}
        aria-label="Défilé de mode"
        role="region"
      >
        <div ref={slotRef} className="absolute inset-0 flex items-center justify-center" aria-hidden={false}>
          {tenue && (
            <div className="relative w-full h-full max-w-md mx-auto" style={{ position: "relative" }}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                draggable={false}
              />

              {tenue.pieces && tenue.pieces.length > 0 &&
                tenue.pieces.map((piece) => (
                  <Hotspot
                    key={piece.id}
                    piece={piece}
                    onSelect={handleSelectPiece}
                    isActive={selectedPiece?.id === piece.id}
                    disabled={isTransitioning || !!selectedPiece || isInfoPanelOpen}
                  />
                ))}
            </div>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {`Tenue ${currentIndex + 1} sur ${total}${tenue ? ` : ${tenue.nom}` : ""}`}
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-xs text-secondary tracking-widest select-none" aria-hidden="true">
          {padIndex(currentIndex + 1)}&nbsp;/&nbsp;{padIndex(total)}
        </div>

        <button
          ref={infoButtonRef}
          type="button"
          onClick={() => setIsInfoPanelOpen(true)}
          aria-label={`Informations sur la tenue : ${tenue?.nom ?? ""}`}
          className="absolute top-6 left-6 z-10 flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-control bg-surface text-primary hover:bg-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
        >
          <svg className="w-4 h-4 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="8.01" strokeWidth="2" />
            <polyline points="11 11 12 11 12 16 13 16" />
          </svg>
        </button>

        {tenue && (
          <div className="absolute bottom-28 left-0 right-0 px-6 pb-2 pointer-events-none">
            <p className="font-sans text-xs uppercase tracking-widest text-secondary mb-1">{tenue.collection}</p>
            <h1 className="font-serif text-2xl md:text-3xl text-primary font-normal leading-tight">{tenue.nom}</h1>
            <p className="font-sans text-sm text-secondary mt-1">{tenue.prixXAF.toLocaleString("fr-CG")}&nbsp;FCFA</p>
          </div>
        )}

        {(isFirst || isLast) && (
          <div className="absolute bottom-28 left-0 right-0 px-6 pointer-events-none flex justify-center">
            <div className="pointer-events-auto mt-16 text-center">
              {isLast && (
                <div className="space-y-3">
                  <p className="font-sans text-xs text-secondary tracking-wide">Fin de la collection</p>
                  <Link href="/catalogue" className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-accent border border-accent px-4 py-2.5 min-h-touch hover:bg-accent hover:text-accent-contrast transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
                    Voir tout le catalogue
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {tenue && tenue.pieces && tenue.pieces.length > 0 && !selectedPiece && !isInfoPanelOpen && (
          <div className="absolute bottom-20 left-6 right-6 z-10">
            <PiecesAlternativeList pieces={tenue.pieces} onSelectPiece={handleSelectPiece} selectedPieceId={null} />
          </div>
        )}

        <nav className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 px-6" aria-label="Navigation entre les tenues">
          <button type="button" onClick={goPrev} aria-label="Tenue précédente" aria-disabled={isFirst} className={`flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-control bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 ${isFirst ? "opacity-30 cursor-default" : "text-primary hover:bg-background"}`} tabIndex={isFirst ? -1 : 0}>
            <svg className="w-4 h-4 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15" /></svg>
          </button>

          <span className="font-sans text-xs text-secondary tracking-widest min-w-[4rem] text-center select-none" aria-hidden="true">
            {padIndex(currentIndex + 1)}&nbsp;/&nbsp;{padIndex(total)}
          </span>

          <button type="button" onClick={goNext} aria-label="Tenue suivante" aria-disabled={isLast} className={`flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-control bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 ${isLast ? "opacity-30 cursor-default" : "text-primary hover:bg-background"}`} tabIndex={isLast ? -1 : 0}>
            <svg className="w-4 h-4 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </nav>
      </div>

      {tenue && (
        <InfoPanel isOpen={isInfoPanelOpen} onClose={() => setIsInfoPanelOpen(false)} garment={tenueToGarmentDetails(tenue)} triggerRef={infoButtonRef} />
      )}

      {selectedPiece && tenue && (
        <div ref={detailOverlayRef}>
          <DetailViewer piece={selectedPiece} tenueNom={tenue.nom} tenueReference={tenue.reference} whatsappPhone={siteConfig.telephoneWhatsApp} onClose={handleCloseDetailViewer} />
        </div>
      )}
    </>
  );
}
