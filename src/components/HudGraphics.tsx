/**
 * src/components/HudGraphics.tsx — Graphismes SVG (V5)
 *
 * Esthétique : dessin technique, traits fins, aplats uniquement.
 * Aucun dégradé, aucune lueur, aucun flou décoratif (Section F : zéro look IA).
 * Toutes les couleurs viennent de currentColor (jetons sémantiques du thème).
 */

import React from "react";

/* ─── Mannequin de couture (buste sur pied) — sans aucun trait facial ───────── */

interface MannequinSvgProps {
  className?: string;
  /** Ajoute les repères de mesure (buste, taille, hanches) */
  annotated?: boolean;
  /** @deprecated Sans effet : le tracé par stroke-dashoffset a été retiré (seuls transform et opacity sont animés). */
  drawable?: boolean;
}

export function MannequinSvg({ className = "", annotated = false }: MannequinSvgProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
    pathLength: 1,
  };

  return (
    <svg
      viewBox="0 0 200 470"
      className={className}
      role="img"
      aria-label="Mannequin de couture stylisé, sans visage"
      focusable="false"
    >
      {/* Tête lisse : aucun trait */}
      <ellipse cx="100" cy="36" rx="16" ry="21" {...common} />
      {/* Cou */}
      <path d="M93 56 L94 72 M107 56 L106 72" {...common} />
      {/* Buste */}
      <path
        d="M94 72 C76 74 58 80 54 96 C52 106 56 118 58 132 C60 150 64 168 66 182
           C67 196 62 212 58 228 C56 240 62 252 74 258 L126 258
           C138 252 144 240 142 228 C138 212 133 196 134 182
           C136 168 140 150 142 132 C144 118 148 106 146 96
           C142 80 124 74 106 72"
        {...common}
       
      />
      {/* Lignes de repère : buste, taille, hanches */}
      <path d="M58 124 Q100 134 142 124" {...common} strokeDasharray="2 4" opacity={0.6} />
      <path d="M66 182 Q100 192 134 182" {...common} strokeDasharray="2 4" opacity={0.6} />
      <path d="M58 232 Q100 244 142 232" {...common} strokeDasharray="2 4" opacity={0.6} />
      {/* Pied et socle */}
      <path d="M100 258 L100 412" {...common} />
      <ellipse cx="100" cy="420" rx="46" ry="8" {...common} />
      <ellipse cx="100" cy="420" rx="28" ry="4.5" {...common} opacity={0.6} />

      {annotated && (
        <g {...common} opacity={0.75} fontFamily="ui-monospace, Menlo, monospace" fontSize="7" letterSpacing="1.2">
          <path d="M152 129 H178 M152 187 H178 M152 238 H178" />
          <text x="150" y="124" fill="currentColor" stroke="none">BUSTE</text>
          <text x="150" y="182" fill="currentColor" stroke="none">TAILLE</text>
          <text x="150" y="233" fill="currentColor" stroke="none">HANCHES</text>
        </g>
      )}
    </svg>
  );
}

/* ─── Grille de fond : fines lignes, très discrète ───────────────────────────── */

export function GridBackdrop({ className = "", size = 64 }: { className?: string; size?: number }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`g-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#g-${id})`} />
    </svg>
  );
}

/* ─── Repères d'angle (cadrage de visée) ─────────────────────────────────────── */

export function CornerBrackets({ className = "", size = 16 }: { className?: string; size?: number }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      {/* Les angles sont ancrés par des SVG imbriqués pour garder une taille fixe */}
      <svg x="0" y="0" width={s} height={s} overflow="visible"><path d={`M0 ${s} V0 H${s}`} {...p} /></svg>
      <svg x="100%" y="0" width={s} height={s} overflow="visible"><path d={`M${-s} 0 H0 V${s}`} {...p} /></svg>
      <svg x="0" y="100%" width={s} height={s} overflow="visible"><path d={`M0 ${-s} V0 H${s}`} {...p} /></svg>
      <svg x="100%" y="100%" width={s} height={s} overflow="visible"><path d={`M${-s} 0 H0 V${-s}`} {...p} /></svg>
    </svg>
  );
}

/* ─── Plateforme de défilé (ellipses concentriques sous la tenue active) ────── */

export function Platform({ className = "" }: { className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg className={className} viewBox="0 0 600 120" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="300" cy="60" rx="290" ry="52" {...p} opacity={0.5} />
      <ellipse cx="300" cy="60" rx="220" ry="38" {...p} opacity={0.7} />
      <ellipse cx="300" cy="60" rx="150" ry="24" {...p} />
      <path d="M10 60 H40 M560 60 H590 M300 8 V20 M300 100 V112" {...p} />
    </svg>
  );
}

/* ─── Icônes à trait fin ─────────────────────────────────────────────────────── */

const icon = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChevronIcon({ direction, className = "w-4 h-4" }: { direction: "left" | "right" | "up" | "down"; className?: string }) {
  const d = {
    left: "M15 5 L8 12 L15 19",
    right: "M9 5 L16 12 L9 19",
    up: "M5 15 L12 8 L19 15",
    down: "M5 9 L12 16 L19 9",
  }[direction];
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} {...icon} />
    </svg>
  );
}

export function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 12 H20 M14 6 L20 12 L14 18" {...icon} />
    </svg>
  );
}

export function PieceGlyph({ className = "" }: { className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="38" {...p} />
      <circle cx="60" cy="60" r="22" {...p} opacity={0.6} />
      <path d="M60 14 V30 M60 90 V106 M14 60 H30 M90 60 H106" {...p} />
      <circle cx="60" cy="60" r="2" fill="currentColor" />
    </svg>
  );
}
