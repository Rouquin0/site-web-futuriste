/**
 * src/components/PiecesAlternativeList.tsx — Liste textuelle accessible (Section V & F)
 * Vitrine Mode Immersive — Alternative WCAG pour les pièces de tenue
 */

"use client";

import React from "react";
import type { PieceDetail } from "@/types/catalogue";

export interface PiecesAlternativeListProps {
  /** Liste des pièces composant la tenue */
  pieces?: PieceDetail[];
  /** Callback lors de la sélection d'une pièce */
  onSelectPiece: (piece: PieceDetail) => void;
  /** Identifiant de la pièce actuellement sélectionnée */
  selectedPieceId?: string | null;
  /** Classe CSS additionnelle */
  className?: string;
  /** Titre accessible de la navigation (défaut : "Pièces de la tenue") */
  label?: string;
}

export default function PiecesAlternativeList({
  pieces,
  onSelectPiece,
  selectedPieceId,
  className = "",
  label = "Pièces de la tenue",
}: PiecesAlternativeListProps) {
  if (!pieces || pieces.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={label}
      className={`pieces-alternative-nav font-sans ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs uppercase tracking-widest text-secondary font-medium"
          id="pieces-alternative-heading"
        >
          {label}
        </span>
        <span className="text-xs text-secondary font-mono">
          ({pieces.length})
        </span>
      </div>

      <ul
        aria-labelledby="pieces-alternative-heading"
        className="flex flex-wrap gap-2"
        role="list"
      >
        {pieces.map((piece, index) => {
          const isSelected = selectedPieceId === piece.id;
          const accessibleActionLabel = piece.zoneTouchable?.nomAccessible
            ? piece.zoneTouchable.nomAccessible
            : `Examiner la pièce ${piece.nom} (${piece.type}) en détail`;

          return (
            <li key={piece.id} className="inline-block">
              <button
                type="button"
                onClick={() => onSelectPiece(piece)}
                aria-label={accessibleActionLabel}
                aria-pressed={isSelected}
                className={`group flex items-center gap-2.5 px-3.5 py-2.5 min-h-touch min-w-touch rounded border text-xs font-sans uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 select-none ${
                  isSelected
                    ? "border-accent bg-accent text-accent-contrast font-semibold"
                    : "border-border-control bg-surface text-primary hover:bg-background hover:border-primary active:scale-[0.98]"
                }`}
              >
                {/* Numérotation éditoriale */}
                <span
                  className={`font-mono text-[10px] ${
                    isSelected ? "text-accent-contrast" : "text-secondary"
                  }`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Nom de la pièce */}
                <span className="font-medium truncate max-w-[140px] sm:max-w-none">
                  {piece.nom}
                </span>

                {/* Badge type sobre */}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    isSelected
                      ? "border border-accent-contrast text-accent-contrast"
                      : "bg-background text-secondary border border-border-decor"
                  }`}
                  aria-hidden="true"
                >
                  {piece.type}
                </span>

                {/* Chevron discret */}
                <svg
                  className={`w-3.5 h-3.5 stroke-current transition-transform duration-150 ${
                    isSelected ? "rotate-90" : "group-hover:translate-x-0.5"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
