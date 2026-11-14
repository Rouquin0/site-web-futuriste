/**
 * src/components/Hotspot.tsx — Repère visuel tactile sobre et accessible (Section V & F)
 * Vitrine Mode Immersive — Haute Couture Sobriété
 */

"use client";

import React from "react";
import type { PieceDetail, ZoneTouchable } from "@/types/catalogue";

export interface HotspotProps {
  /** La pièce de vêtement ou accessoire associée */
  piece: PieceDetail;
  /** Callback déclenché lors de la sélection (toucher, clic, clavier) */
  onSelect: (piece: PieceDetail) => void;
  /** Indique si cette pièce est actuellement ouverte/active */
  isActive?: boolean;
  /** Désactivation temporaire (ex : pendant la transition du mannequin) */
  disabled?: boolean;
  /** Classe CSS additionnelle */
  className?: string;
}

export default function Hotspot({
  piece,
  onSelect,
  isActive = false,
  disabled = false,
  className = "",
}: HotspotProps) {
  const zone: ZoneTouchable = piece.zoneTouchable;

  // Calcul du positionnement basé sur zoneTouchable
  const hasBoundingBox = zone.width > 0 && zone.height > 0;

  const positionStyle: React.CSSProperties = hasBoundingBox
    ? {
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: `${zone.width}%`,
        height: `${zone.height}%`,
      }
    : {
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        transform: "translate(-50%, -50%)",
      };

  const accessibleName =
    zone.nomAccessible || `Voir ${piece.nom} en détail (${piece.type})`;

  return (
    <button
      type="button"
      role="button"
      disabled={disabled}
      onClick={() => onSelect(piece)}
      aria-label={accessibleName}
      aria-pressed={isActive}
      style={positionStyle}
      className={`group absolute z-20 flex items-center justify-center min-w-touch min-h-touch cursor-pointer transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 select-none ${
        disabled
          ? "opacity-30 cursor-not-allowed pointer-events-none"
          : "hover:scale-105 active:scale-95"
      } ${className}`}
      title={accessibleName}
    >
      {/* Pastille visuelle sobre — Fond surface/90, bordure des contrôles (contraste >= 3:1) */}
      <span
        className={`relative flex items-center justify-center w-8 h-8 rounded-full border border-border-control bg-surface/90 text-primary shadow-sm transition-colors duration-150 group-hover:bg-surface group-hover:border-primary ${
          isActive
            ? "border-accent ring-2 ring-accent text-accent"
            : ""
        }`}
        aria-hidden="true"
      >
        {/* Réticule sobre haute couture : loupe et croix d'examen */}
        <svg
          className="w-4 h-4 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="6" />
          <line x1="21" y1="21" x2="15.5" y2="15.5" />
          <line x1="11" y1="8.5" x2="11" y2="13.5" />
          <line x1="8.5" y1="11" x2="13.5" y2="11" />
        </svg>
      </span>
    </button>
  );
}
