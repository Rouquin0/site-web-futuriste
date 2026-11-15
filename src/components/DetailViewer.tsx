"use client";

/**
 * DetailViewer.tsx — Visionneuse de détail + 360° universel
 *
 * - Si piece.rotation existe ET que les frames chargent : vraie rotation 360° (24 frames).
 * - Sinon : « Studio 360° » simulé — la photo pivote en 3D (rotateY) au glisser,
 *   avec compteur de degrés 0→360°. Fonctionne pour TOUTES les pièces/tenues,
 *   même avec une seule photo. Aucun WebGL, aucune lib 3D.
 * - Accessibilité : piège du focus, Échap, cibles >= 44px.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { PieceDetail } from "@/types/catalogue";
import { formatPriceXAF } from "@/lib/formatters";

export interface DetailViewerProps {
  piece: PieceDetail;
  tenueNom: string;
  tenueReference: string;
  whatsappPhone: string;
  onClose: () => void;
}

export default function DetailViewer({ piece, tenueNom, tenueReference, whatsappPhone, onClose }: DetailViewerProps) {
  const declaredRotation = Boolean(piece.rotation && piece.rotation.nombreImages > 0);
  const [viewMode, setViewMode] = useState<"rotation" | "photos">(declaredRotation ? "rotation" : "photos");
  // Si les frames 404 (dossier pas encore déposé), on bascule en Studio 360°
  const [framesOk, setFramesOk] = useState(true);
  const real360 = declaredRotation && framesOk;

  const totalFrames = piece.rotation?.nombreImages ?? 0;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(0);
  // Studio 360° : angle simulé 0-360°
  const [angle, setAngle] = useState(0);
  const dragStartAngleRef = useRef(0);
  const [autoSpin, setAutoSpin] = useState(true);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-rotation douce du Studio 360° jusqu'au premier toucher
  useEffect(() => {
    if (viewMode !== "rotation" || real360 || !autoSpin) return;
    const id = window.setInterval(() => setAngle((a) => (a + 2) % 360), 50);
    return () => window.clearInterval(id);
  }, [viewMode, real360, autoSpin]);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowLeft") {
        if (viewMode === "rotation") {
          if (real360 && totalFrames > 0) setCurrentFrame((p) => (p - 1 + totalFrames) % totalFrames);
          else setAngle((a) => (a - 15 + 360) % 360);
        } else if (piece.photos.length > 0) setSelectedPhotoIndex((p) => (p - 1 + piece.photos.length) % piece.photos.length);
      } else if (e.key === "ArrowRight") {
        if (viewMode === "rotation") {
          if (real360 && totalFrames > 0) setCurrentFrame((p) => (p + 1) % totalFrames);
          else setAngle((a) => (a + 15) % 360);
        } else if (piece.photos.length > 0) setSelectedPhotoIndex((p) => (p + 1) % piece.photos.length);
      }
      if (e.key === "Tab" && modalRef.current) {
        const els = modalRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (els.length === 0) return;
        const first = els[0]; const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, viewMode, real360, totalFrames, piece.photos.length]);

  const down = (clientX: number) => {
    if (viewMode !== "rotation") return;
    setAutoSpin(false);
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragStartFrameRef.current = currentFrame;
    dragStartAngleRef.current = angle;
  };
  const move = useCallback((clientX: number) => {
    if (!isDragging || viewMode !== "rotation") return;
    const dx = clientX - dragStartXRef.current;
    if (real360 && totalFrames > 0) {
      const diff = Math.floor(dx / 15);
      const nf = (dragStartFrameRef.current - diff) % totalFrames;
      setCurrentFrame(nf >= 0 ? nf : nf + totalFrames);
    } else {
      setAngle(((dragStartAngleRef.current + dx) % 360 + 360) % 360);
    }
  }, [isDragging, viewMode, real360, totalFrames]);
  const up = () => setIsDragging(false);

  const getRotationImageUrl = (frameIndex: number): string => {
    if (!piece.rotation) return "";
    return `${piece.rotation.dossier}/frame-${String(frameIndex + 1).padStart(2, "0")}.webp`;
  };

  const sanitizedPhone = whatsappPhone.replace(/\+|\s/g, "");
  const whatsappMessage = encodeURIComponent(`Bonjour, je souhaite me renseigner sur la pièce : ${piece.nom} (${piece.type}) de la tenue ${tenueNom} (Réf : ${tenueReference}).`);
  const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${whatsappMessage}`;

  // tilt 3D simulé : -18°..+18° + léger scale, pour donner la sensation de rotation
  const tilt = Math.sin((angle * Math.PI) / 180) * 18;
  const depth = 1 + Math.abs(Math.cos((angle * Math.PI) / 180)) * 0.04;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="detail-viewer-title" ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border-control bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-decor p-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">{piece.type} · Réf {tenueReference}</span>
            <h2 id="detail-viewer-title" className="max-w-sm truncate font-serif text-xl font-light text-primary sm:text-2xl">{piece.nom}</h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fermer la vue de détail (Échap)"
            className="flex h-11 min-h-touch w-11 min-w-touch select-none items-center justify-center rounded-full border border-border-control bg-surface text-primary transition-colors hover:bg-background">
            <svg className="h-5 w-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="relative flex min-h-[300px] flex-1 select-none items-center justify-center overflow-hidden bg-background sm:min-h-[400px] touch-none"
          onMouseDown={(e) => down(e.clientX)} onMouseMove={(e) => move(e.clientX)} onMouseUp={up} onMouseLeave={up}
          onTouchStart={(e) => down(e.touches[0].clientX)} onTouchMove={(e) => move(e.touches[0].clientX)} onTouchEnd={up}>
          {viewMode === "rotation" ? (
            real360 ? (
              <div className={`relative flex h-full w-full items-center justify-center transition-transform duration-200 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-grab active:cursor-grabbing"}`}
                onDoubleClick={() => setIsZoomed((p) => !p)}>
                <Image src={getRotationImageUrl(currentFrame)} alt={`${piece.nom} — angle ${currentFrame + 1} sur ${totalFrames}`}
                  fill priority className="object-contain" sizes="(max-width: 768px) 100vw, 600px"
                  onError={() => setFramesOk(false)} />
                <div className="absolute bottom-3 right-3 rounded border border-border-control bg-surface/90 px-2.5 py-1 font-mono text-[11px] text-secondary">
                  {currentFrame + 1} / {totalFrames} (360°)
                </div>
                <p className="absolute bottom-3 left-3 rounded bg-surface/90 px-2.5 py-1 font-sans text-[11px] text-secondary">Glissez pour pivoter · double-clic = zoom</p>
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: "900px" }}>
                <div className={`${isDragging ? "" : "transition-transform duration-150"} ${isZoomed ? "cursor-zoom-out" : "cursor-grab active:cursor-grabbing"}`}
                  style={{ transform: `rotateY(${tilt}deg) scale(${depth * (isZoomed ? 1.5 : 1)})`, transformStyle: "preserve-3d" }}
                  onDoubleClick={() => setIsZoomed((p) => !p)}>
                  {piece.photos.length > 0 ? (
                    <div className="relative h-[320px] w-[260px] sm:h-[400px] sm:w-[320px]">
                      <Image src={piece.photos[selectedPhotoIndex] || piece.photos[0]} alt={`${piece.nom} — Studio 360° (${Math.round(angle)}°)`}
                        fill priority className="object-cover object-top" sizes="320px" draggable={false} />
                    </div>
                  ) : (
                    <div className="text-xs uppercase tracking-wider text-secondary">Photos en cours de préparation</div>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 rounded border border-accent bg-surface/95 px-2.5 py-1 font-mono text-[11px] text-accent">
                  {String(Math.round(angle)).padStart(3, "0")}° — Studio 360°
                </div>
                <p className="absolute bottom-3 left-3 max-w-[60%] rounded bg-surface/90 px-2.5 py-1 font-sans text-[11px] text-secondary">
                  Glissez pour pivoter{declaredRotation ? " · photos 360° en cours d'ajout" : ""} · double-clic = zoom
                </p>
                {/* jauge d'angle */}
                <div className="absolute left-1/2 top-3 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-border-decor" aria-hidden="true">
                  <div className="h-full bg-accent" style={{ width: `${(angle / 360) * 100}%` }} />
                </div>
              </div>
            )
          ) : (
            <div className={`relative flex h-full w-full items-center justify-center transition-transform duration-200 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
              onClick={() => setIsZoomed((p) => !p)}>
              {piece.photos.length > 0 ? (
                <Image src={piece.photos[selectedPhotoIndex] || piece.photos[0]} alt={`${piece.nom} — photo macro ${selectedPhotoIndex + 1}`}
                  fill priority className="object-contain" sizes="(max-width: 768px) 100vw, 600px" />
              ) : (
                <div className="text-xs uppercase tracking-wider text-secondary">Photos en cours de préparation</div>
              )}
            </div>
          )}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
            <button type="button" onClick={() => setIsZoomed((p) => !p)} aria-label={isZoomed ? "Réduire le zoom" : "Agrandir le zoom"}
              className="flex h-10 min-h-touch w-10 min-w-touch items-center justify-center rounded-full border border-border-control bg-surface/90 text-primary hover:bg-surface">
              <span className="font-mono text-sm">{isZoomed ? "−" : "+"}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-decor bg-surface p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" onClick={() => setViewMode("rotation")}
                className={`min-h-touch rounded border px-3 py-1.5 font-sans text-xs uppercase tracking-wider ${viewMode === "rotation" ? "border-accent bg-accent font-medium text-accent-contrast" : "border-border-control bg-surface text-secondary hover:text-primary"}`}>
                Vue 360°{real360 ? "" : " ★"}
              </button>
              {piece.photos.length > 0 && (
                <button type="button" onClick={() => setViewMode("photos")}
                  className={`min-h-touch rounded border px-3 py-1.5 font-sans text-xs uppercase tracking-wider ${viewMode === "photos" ? "border-accent bg-accent font-medium text-accent-contrast" : "border-border-control bg-surface text-secondary hover:text-primary"}`}>
                  Gros plans ({piece.photos.length})
                </button>
              )}
            </div>
            {piece.prixXAF && <span className="font-mono text-sm font-medium text-primary">{formatPriceXAF(piece.prixXAF)}</span>}
          </div>
          <div className="text-xs leading-relaxed text-secondary">
            <p className="mb-1 font-medium text-primary">Matière : {piece.matiere}</p>
            <p>{piece.description}</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="flex min-h-touch w-full items-center justify-center gap-2 rounded border border-accent bg-accent py-3 font-sans text-xs font-semibold uppercase tracking-widest text-accent-contrast transition-opacity hover:opacity-95">
            Se renseigner sur cette pièce via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
