/**
 * src/components/DetailViewer.tsx — Visionneuse de détail et rotation 360° photo (Section V)
 *
 * RÈGLES CARDINALES :
 * - UN SEUL mannequin visible (aucun second mannequin, la vue de détail isole la pièce ou plan serré).
 * - SANS WebGL ni librairie 3D : la rotation 360° est un échange d'images préchargées.
 * - Accessibilité : piège du focus, touche Échap, cibles tactiles >= 44px, réduction d'animations.
 */

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { PieceDetail } from "@/types/catalogue";
import { formatPriceXAF } from "@/lib/formatters";

export interface DetailViewerProps {
  /** La pièce sélectionnée */
  piece: PieceDetail;
  /** Nom de la tenue parente */
  tenueNom: string;
  /** Référence de la tenue parente */
  tenueReference: string;
  /** Numéro WhatsApp pour la commande */
  whatsappPhone: string;
  /** Callback de fermeture */
  onClose: () => void;
}

export default function DetailViewer({
  piece,
  tenueNom,
  tenueReference,
  whatsappPhone,
  onClose,
}: DetailViewerProps) {
  // Mode d'affichage : "rotation" si disponible, sinon "photos"
  const hasRotation = Boolean(piece.rotation && piece.rotation.nombreImages > 0);
  const [viewMode, setViewMode] = useState<"rotation" | "photos">(
    hasRotation ? "rotation" : "photos"
  );

  // État de la rotation 360° (index 0 à N-1)
  const totalFrames = piece.rotation?.nombreImages ?? 0;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(0);

  // État des photos macros
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Zoom (1x ou 1.5x)
  const [isZoomed, setIsZoomed] = useState(false);

  // Focus trap ref
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ── Accessibilité : Piège du focus & touche Échap ─────────────────────────────
  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowLeft") {
        if (viewMode === "rotation" && totalFrames > 0) {
          setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames);
        } else if (piece.photos.length > 0) {
          setSelectedPhotoIndex((prev) => (prev - 1 + piece.photos.length) % piece.photos.length);
        }
      } else if (e.key === "ArrowRight") {
        if (viewMode === "rotation" && totalFrames > 0) {
          setCurrentFrame((prev) => (prev + 1) % totalFrames);
        } else if (piece.photos.length > 0) {
          setSelectedPhotoIndex((prev) => (prev + 1) % piece.photos.length);
        }
      }

      // Piège de focus Tab
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, viewMode, totalFrames, piece.photos.length]);

  // ── Gestion de la rotation 360° par glisser ──────────────────────────────────
  const handlePointerDown = (clientX: number) => {
    if (viewMode !== "rotation" || totalFrames <= 0) return;
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragStartFrameRef.current = currentFrame;
  };

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!isDragging || totalFrames <= 0) return;
      const deltaX = clientX - dragStartXRef.current;
      // 1 frame tous les 15px de déplacement horizontal
      const framesDiff = Math.floor(deltaX / 15);
      const newFrame = (dragStartFrameRef.current - framesDiff) % totalFrames;
      setCurrentFrame(newFrame >= 0 ? newFrame : newFrame + totalFrames);
    },
    [isDragging, totalFrames]
  );

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // ── URL de l'image de rotation courante ────────────────────────────────────────
  const getRotationImageUrl = (frameIndex: number): string => {
    if (!piece.rotation) return "";
    const frameNumber = String(frameIndex + 1).padStart(2, "0");
    return `${piece.rotation.dossier}/frame-${frameNumber}.webp`;
  };

  // ── Lien WhatsApp pour la pièce ───────────────────────────────────────────────
  const sanitizedPhone = whatsappPhone.replace(/\+|\s/g, "");
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je souhaite me renseigner sur la pièce : ${piece.nom} (${piece.type}) de la tenue ${tenueNom} (Réf : ${tenueReference}).`
  );
  const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-viewer-title"
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-surface border border-border-control rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-border-decor">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondary">
              {piece.type} · Réf {tenueReference}
            </span>
            <h2
              id="detail-viewer-title"
              className="font-serif text-xl sm:text-2xl font-light text-primary truncate max-w-sm"
            >
              {piece.nom}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer la vue de détail (Échap)"
            className="flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-control bg-surface text-primary hover:bg-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control select-none"
          >
            <svg
              className="w-5 h-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Zone Média Principale */}
        <div
          className="relative flex-1 min-h-[300px] sm:min-h-[400px] bg-background flex items-center justify-center select-none overflow-hidden touch-none"
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
        >
          {viewMode === "rotation" && hasRotation ? (
            <div
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-200 ${
                isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-grab active:cursor-grabbing"
              }`}
              style={{ position: "relative" }}
              onDoubleClick={() => setIsZoomed((prev) => !prev)}
            >
              <Image
                src={getRotationImageUrl(currentFrame)}
                alt={`${piece.nom} — angle ${currentFrame + 1} sur ${totalFrames}`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute bottom-3 right-3 bg-surface/90 border border-border-control text-[11px] font-mono text-secondary px-2.5 py-1 rounded">
                {currentFrame + 1} / {totalFrames} (360°)
              </div>
            </div>
          ) : (
            <div
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-200 ${
                isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
              style={{ position: "relative" }}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              {piece.photos.length > 0 ? (
                <Image
                  src={piece.photos[selectedPhotoIndex] || piece.photos[0]}
                  alt={`${piece.nom} — photo macro ${selectedPhotoIndex + 1}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              ) : (
                <div className="text-secondary text-xs uppercase tracking-wider">
                  Photos en cours de préparation
                </div>
              )}
            </div>
          )}

          {/* Contrôles de Zoom et Navigation 360° */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              aria-label={isZoomed ? "Réduire le zoom" : "Agrandir le zoom"}
              className="w-10 h-10 min-w-touch min-h-touch bg-surface/90 border border-border-control rounded-full flex items-center justify-center text-primary hover:bg-surface focus-visible:outline focus-visible:outline-2"
            >
              <span className="font-mono text-sm">{isZoomed ? "−" : "+"}</span>
            </button>
          </div>
        </div>

        {/* Sélecteur de mode ou de vignettes */}
        <div className="p-4 bg-surface border-t border-border-decor flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {hasRotation && (
                <button
                  type="button"
                  onClick={() => setViewMode("rotation")}
                  className={`px-3 py-1.5 min-h-touch rounded text-xs font-sans uppercase tracking-wider border ${
                    viewMode === "rotation"
                      ? "border-accent bg-accent text-accent-contrast font-medium"
                      : "border-border-control bg-surface text-secondary hover:text-primary"
                  }`}
                >
                  Vue 360°
                </button>
              )}
              {piece.photos.length > 0 && (
                <button
                  type="button"
                  onClick={() => setViewMode("photos")}
                  className={`px-3 py-1.5 min-h-touch rounded text-xs font-sans uppercase tracking-wider border ${
                    viewMode === "photos"
                      ? "border-accent bg-accent text-accent-contrast font-medium"
                      : "border-border-control bg-surface text-secondary hover:text-primary"
                  }`}
                >
                  Gros plans ({piece.photos.length})
                </button>
              )}
            </div>

            {piece.prixXAF && (
              <span className="font-mono text-sm font-medium text-primary">
                {formatPriceXAF(piece.prixXAF)}
              </span>
            )}
          </div>

          {/* Description & Matière */}
          <div className="text-xs text-secondary leading-relaxed">
            <p className="font-medium text-primary mb-1">Matière : {piece.matiere}</p>
            <p>{piece.description}</p>
          </div>

          {/* Bouton Commande WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 min-h-touch bg-accent text-accent-contrast rounded border border-accent hover:opacity-95 font-sans text-xs uppercase tracking-widest font-semibold transition-opacity"
          >
            Se renseigner sur cette pièce via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
