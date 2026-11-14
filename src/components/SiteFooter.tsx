"use client";

import React from "react";
import { ChevronIcon } from "./HudGraphics";

export default function SiteFooter({ nom }: { nom: string }) {
  return (
    <footer className="border-t border-border-decor">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-8">
        <p className="hud-label text-secondary">
          © {new Date().getFullYear()} {nom}
        </p>
        <button
          type="button"
          onClick={() => {
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          }}
          className="inline-flex items-center gap-2 min-h-touch hud-label text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
        >
          Haut de page
          <ChevronIcon direction="up" />
        </button>
      </div>
    </footer>
  );
}
