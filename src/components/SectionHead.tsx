/**
 * SectionHead.tsx — En-tête de section (V5) : numéro, titre, filet qui se trace au défilement
 */
import React from "react";

interface SectionHeadProps {
  index: string;
  title: string;
  right?: React.ReactNode;
  headingId?: string;
}

export default function SectionHead({ index, title, right, headingId }: SectionHeadProps) {
  return (
    <header data-reveal className="w-full">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={headingId} className="hud-label text-primary">
          <span className="text-accent">{index}</span>
          <span className="mx-3 text-border-control" aria-hidden="true">/</span>
          {title}
        </h2>
        {right && <div className="hud-label text-secondary">{right}</div>}
      </div>
      <svg className="mt-3 block h-2 w-full text-border-control" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <line data-draw x1="0" y1="1" x2="100%" y2="1" pathLength={1} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </header>
  );
}
