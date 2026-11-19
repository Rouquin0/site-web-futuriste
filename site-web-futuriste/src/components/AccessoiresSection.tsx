"use client";

/**
 * AccessoiresSection.tsx — Accessoires & pièces (V5 §C1)
 *
 * Présente les pièces des tenues (accessoires en premier). Le toucher ouvre la vue de détail
 * (gros plans, rotation 360° si disponible). Les accessoires ajoutés dans les données
 * apparaissent automatiquement ici. Aucune image n'est inventée : sans photo, un repère SVG s'affiche.
 */

import React, { useRef, useState } from "react";
import Image from "next/image";
import SectionHead from "./SectionHead";
import DetailOverlay from "./DetailOverlay";
import { CornerBrackets, PieceGlyph } from "./HudGraphics";
import { useTilt } from "../hooks/useTilt";
import type { PieceDetail } from "../types/catalogue";
import { siteConfig } from "../../site.config";

export interface PieceEntry {
  piece: PieceDetail;
  tenueNom: string;
  tenueReference: string;
}

function PieceCell({ entry, index, onOpen }: { entry: PieceEntry; index: number; onOpen: (e: PieceEntry) => void }) {
  const [failed, setFailed] = useState(false);
  const { piece } = entry;
  const photo = piece.photos[0];
  const label = piece.type === "accessoire" ? "Accessoire" : "Pièce";
  // Micro-perspective n°1 : inclinaison ≤ 2° au survol, pointeur précis uniquement
  const hostRef = useRef<HTMLButtonElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(hostRef, tiltRef);

  return (
    <li data-reveal className="bg-background">
      <button
        ref={hostRef}
        type="button"
        onClick={() => onOpen(entry)}
        aria-label={`Examiner en détail : ${piece.nom} (${label.toLowerCase()}, ${entry.tenueNom})`}
        className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:-outline-offset-4"
      >
        <div ref={tiltRef} className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
          <PieceGlyph className="absolute inset-0 m-auto h-1/2 w-1/2 text-border-control opacity-60" />
          {photo && !failed && (
            <Image
              src={photo}
              alt={piece.texteAlternatif}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              draggable={false}
              onError={() => setFailed(true)}
            />
          )}
          <div className="pointer-events-none absolute inset-3 text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <CornerBrackets size={12} />
          </div>
        </div>
        <div className="p-4 md:p-5">
          <p className="hud-label text-secondary">
            <span aria-hidden="true" className="mr-2 inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
            {label}
          </p>
          <h3 className="mt-2 font-serif text-xl md:text-2xl font-normal leading-tight text-primary">{piece.nom}</h3>
          <p className="mt-1 font-sans text-xs text-secondary">{entry.tenueNom}</p>
        </div>
      </button>
    </li>
  );
}

export default function AccessoiresSection({ pieces }: { pieces: PieceEntry[] }) {
  const [open, setOpen] = useState<PieceEntry | null>(null);
  if (pieces.length === 0) return null;

  // Les accessoires d'abord
  const ordered = [...pieces].sort((a, b) => Number(b.piece.type === "accessoire") - Number(a.piece.type === "accessoire"));

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead eyebrow="Atelier — gros plans" title="Accessoires & pièces" variant="atelier" right={<span aria-hidden="true" className="inline-flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />{ordered.length} pièce{ordered.length > 1 ? "s" : ""}</span>} />
        <ul className="mt-10 grid grid-cols-2 gap-px border border-border-decor bg-border-decor md:grid-cols-4">
          {ordered.map((entry, i) => (
            <PieceCell key={entry.piece.id} entry={entry} index={i} onOpen={setOpen} />
          ))}
        </ul>
      </div>

      {open && (
        <DetailOverlay
          piece={open.piece}
          tenueNom={open.tenueNom}
          tenueReference={open.tenueReference}
          whatsappPhone={siteConfig.telephoneWhatsApp}
          onClosed={() => setOpen(null)}
        />
      )}
    </>
  );
}
