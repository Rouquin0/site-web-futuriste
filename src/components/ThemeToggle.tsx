"use client";

import React, { useEffect, useState } from "react";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Script d'initialisation immédiate du thème pour éviter tout flash visuel (FOUC)
 * A insérer dans le <head> de l'application si nécessaire.
 */
export const themeInitScript = `
  (function() {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeInitScript,
      }}
    />
  );
}

/**
 * ThemeToggle - Commutateur de thème clair / sombre (V4.2)
 *
 * Spécifications :
 * - Thème clair par défaut (#FAFAF9)
 * - Mémorisation dans localStorage
 * - Zone tactile minimale 48x48 px (>= 44 px requis)
 * - Positionné en haut à droite avec respect des safe areas
 * - Icônes SVG haute couture sobres (Soleil / Lune), pas d'émojis
 * - Accessibilité WCAG AA : aria-label explicite, aria-pressed, focus visible
 * - Zéro Look IA : pas de dégradés néon, pas de lueur
 */
export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  // Le thème par défaut imposé est toujours clair (false)
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedTheme = localStorage.getItem("theme");
      const isDarkMode = storedTheme === "dark";
      setIsDark(isDarkMode);

      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Si localStorage n'est pas accessible, maintenir le mode clair imposé
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextThemeIsDark = !isDark;
    setIsDark(nextThemeIsDark);

    try {
      if (nextThemeIsDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch {
      // Gestion silencieuse en cas de restriction de stockage
    }
  };

  const label = isDark ? "Activer le mode clair" : "Activer le mode sombre";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      className={`fixed top-4 right-4 z-50 flex items-center justify-center w-12 h-12 min-w-touch min-h-touch rounded-full border border-border-control bg-surface text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2 hover:bg-background pt-safe pr-safe ${className}`}
      title={label}
    >
      {/* Rendu neutre avant hydratation pour éviter tout décalage d'affichage */}
      {!isMounted ? (
        <span className="w-5 h-5 block" aria-hidden="true" />
      ) : isDark ? (
        /* Icône Soleil - Lignes épurées, sobre et équilibrée */
        <svg
          className="w-5 h-5 stroke-primary"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Icône Lune - Silhouette sobre et fine */
        <svg
          className="w-5 h-5 stroke-primary"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
