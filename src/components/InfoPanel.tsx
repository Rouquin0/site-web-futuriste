"use client";

import React, { useEffect, useRef, useState } from "react";

export interface GarmentDetails {
  title?: string;
  reference?: string;
  category?: string;
  composition?: string[];
  cut?: string;
  details?: string[];
  careInstructions?: string[];
  sizeGuide?: {
    size: string;
    bust?: string;
    waist?: string;
    hips?: string;
  }[];
}

export interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  garment?: GarmentDetails;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

// Données de présentation de repli pour la haute couture V4.2
const DEFAULT_GARMENT: GarmentDetails = {
  title: "Pièce d'Atelier",
  reference: "V42-ATELIER",
  category: "Haute Couture",
  composition: [
    "100% Laine vierge peignée d'Italie",
    "Doublure 100% Soie naturelle",
  ],
  cut: "Coupe cintrée architecturée, épaules structurées et tombé droit fluide.",
  details: [
    "Fermeture bord à bord boutonnée",
    "Boutons en corne véritable travaillés à la main",
    "Finitions coutures anglaises intérieures",
    "Fentes d'aisance latérales",
  ],
  careInstructions: [
    "Nettoyage à sec professionnel uniquement",
    "Repassage doux à basse température sur l'envers",
    "Ne pas utiliser de chlore",
  ],
  sizeGuide: [
    { size: "S / 36", bust: "82 - 86 cm", waist: "64 - 68 cm", hips: "90 - 94 cm" },
    { size: "M / 38", bust: "86 - 90 cm", waist: "68 - 72 cm", hips: "94 - 98 cm" },
    { size: "L / 40", bust: "90 - 94 cm", waist: "72 - 76 cm", hips: "98 - 102 cm" },
    { size: "XL / 42", bust: "94 - 98 cm", waist: "76 - 80 cm", hips: "102 - 106 cm" },
  ],
};

/**
 * InfoPanel - Tiroir d'informations du vêtement (V4.2)
 *
 * Spécifications :
 * - S'ouvre sans changer de tenue
 * - Bloque le défilement de l'arrière-plan tant qu'il est ouvert
 * - Piège le focus clavier (Focus Trap) et fermeture obligatoire par Échap
 * - Restaure le focus sur l'élément appelant à la fermeture
 * - Responsive : Bottom sheet sur smartphone (<= 768px) et panneau latéral épuré sur écran large
 * - Contrastes conformes WCAG AA (4.5:1 texte, 3:1 contrôles)
 * - Zéro Look IA : fond opaque sobre (bg-surface), aucun effet dépoli ou néon
 */
export default function InfoPanel({
  isOpen,
  onClose,
  garment = DEFAULT_GARMENT,
  triggerRef,
}: InfoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "sizes">("details");

  // Gestion du Focus Trap et de la touche Échap
  useEffect(() => {
    if (!isOpen) return;

    // Sauvegarde de l'élément actif précédent pour restauration
    if (document.activeElement instanceof HTMLElement) {
      previousActiveElement.current = document.activeElement;
    }

    // Verrouillage du scroll arrière-plan
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mise au point initiale sur le bouton de fermeture
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Fermeture obligatoire avec la touche Échap
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Interception du Tab pour le Focus Trap
      if (e.key === "Tab" && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      // Restauration du focus à la fermeture
      if (triggerRef?.current) {
        triggerRef.current.focus();
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) {
    return null;
  }

  const garmentData = { ...DEFAULT_GARMENT, ...garment };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-panel-title"
    >
      {/* Arrière-plan neutre sobre (Aplat sans flou liquid glass ni glow) */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 
        Conteneur du panneau :
        - Mobile : Bottom sheet avec glissement vers le haut (max-h-[85vh], rounded-t-2xl)
        - Écran large (>= md) : Tiroir latéral épuré à droite (w-[460px], h-full, border-l)
      */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-h-[88vh] md:max-h-full md:h-full md:w-[460px] flex flex-col bg-surface text-primary border-t md:border-t-0 md:border-l border-border-decor shadow-2xl overflow-hidden pb-safe"
      >
        {/* En-tête du panneau */}
        <header className="flex items-center justify-between p-6 border-b border-border-decor">
          <div>
            <span className="text-xs uppercase tracking-widest text-secondary font-sans font-medium">
              {garmentData.category || "Fiche Technique"}
            </span>
            <h2
              id="info-panel-title"
              className="text-2xl font-serif text-primary font-normal mt-1"
            >
              {garmentData.title}
            </h2>
            {garmentData.reference && (
              <p className="text-xs text-secondary font-sans mt-0.5">
                Réf : {garmentData.reference}
              </p>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer le panneau d'informations"
            className="flex items-center justify-center w-11 h-11 min-w-touch min-h-touch rounded-full border border-border-control bg-surface text-primary hover:bg-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
          >
            <svg
              className="w-5 h-5 stroke-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* Navigation par onglets sobres */}
        <nav
          className="flex border-b border-border-decor px-6"
          aria-label="Sections d'informations"
        >
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`py-3 mr-6 text-sm font-sans uppercase tracking-wider border-b-2 transition-colors min-h-touch flex items-center ${
              activeTab === "details"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-secondary hover:text-primary"
            }`}
            aria-current={activeTab === "details" ? "true" : undefined}
          >
            Détails & Coupe
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sizes")}
            className={`py-3 text-sm font-sans uppercase tracking-wider border-b-2 transition-colors min-h-touch flex items-center ${
              activeTab === "sizes"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-secondary hover:text-primary"
            }`}
            aria-current={activeTab === "sizes" ? "true" : undefined}
          >
            Guide des Tailles
          </button>
        </nav>

        {/* Contenu déroulant */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
          {activeTab === "details" ? (
            <>
              {/* Coupe */}
              {garmentData.cut && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                    Coupe & Silhouette
                  </h3>
                  <p className="text-sm leading-relaxed text-primary">
                    {garmentData.cut}
                  </p>
                </section>
              )}

              {/* Composition */}
              {garmentData.composition && garmentData.composition.length > 0 && (
                <section className="pt-4 border-t border-border-decor">
                  <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                    Composition & Matières
                  </h3>
                  <ul className="space-y-1.5 text-sm text-primary">
                    {garmentData.composition.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-border-control mr-2.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Détails de confection */}
              {garmentData.details && garmentData.details.length > 0 && (
                <section className="pt-4 border-t border-border-decor">
                  <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                    Détails d&apos;Atelier
                  </h3>
                  <ul className="space-y-1.5 text-sm text-primary">
                    {garmentData.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-border-control mr-2.5 mt-1.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Entretien */}
              {garmentData.careInstructions && garmentData.careInstructions.length > 0 && (
                <section className="pt-4 border-t border-border-decor">
                  <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                    Conseils d&apos;Entretien
                  </h3>
                  <ul className="space-y-1.5 text-sm text-secondary">
                    {garmentData.careInstructions.map((care, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-border-decor mr-2.5 mt-1.5 flex-shrink-0" />
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          ) : (
            /* Guide des tailles */
            <section className="space-y-4">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-1">
                  Grille des Mensurations
                </h3>
                <p className="text-xs text-secondary">
                  Toutes les mesures sont exprimées en centimètres (cm).
                </p>
              </div>

              <div className="overflow-x-auto border border-border-decor rounded">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background text-xs uppercase tracking-wider text-secondary border-b border-border-decor">
                    <tr>
                      <th scope="col" className="px-3 py-2.5 font-medium">Taille</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Poitrine</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Taille</th>
                      <th scope="col" className="px-3 py-2.5 font-medium">Bassin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-decor">
                    {garmentData.sizeGuide?.map((row, idx) => (
                      <tr key={idx} className="hover:bg-background/50">
                        <td className="px-3 py-2.5 font-medium text-primary">{row.size}</td>
                        <td className="px-3 py-2.5 text-secondary">{row.bust || "—"}</td>
                        <td className="px-3 py-2.5 text-secondary">{row.waist || "—"}</td>
                        <td className="px-3 py-2.5 text-secondary">{row.hips || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-background border border-border-decor rounded text-xs text-secondary leading-relaxed">
                <p className="font-medium text-primary mb-1">Besoin d&apos;un conseil sur-mesure ?</p>
                Pour toute hésitation entre deux tailles ou commande personnalisée, nos conseillers sont à votre écoute sur WhatsApp.
              </div>
            </section>
          )}
        </div>

        {/* Pied du panneau */}
        <footer className="p-6 border-t border-border-decor bg-background/40">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 min-h-touch rounded border border-border-control bg-surface text-primary font-sans text-xs uppercase tracking-widest font-semibold hover:bg-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
          >
            Fermer les informations
          </button>
        </footer>
      </div>
    </div>
  );
}
