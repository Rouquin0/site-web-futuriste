"use client";

import React from "react";

/** Lien vers une tenue du défilé : fonctionne aussi sans JavaScript (?tenue=slug#defile). */
export default function CollectionLink({ slug, className = "", children }: { slug: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`/?tenue=${slug}#defile`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("showcase:goto", { detail: slug }));
      }}
    >
      {children}
    </a>
  );
}
