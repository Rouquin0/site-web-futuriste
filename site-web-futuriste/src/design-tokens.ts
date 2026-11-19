/**
 * src/design-tokens.ts — Jetons de design officiels (V4.4)
 * Section F & V — Zéro Look IA — Haute Couture Sobriété
 */

export const designTokens = {
  colors: {
    light: {
      background: "#FAFAF9",
      surface: "#FFFFFF",
      primary: "#1C1917",
      secondary: "#57534E",
      borderDecor: "#D6D3D1",
      borderControl: "#78716C",
      accent: "#A16207",
      accentContrast: "#FAFAF9",
      scrim: "rgb(28 25 23 / 0.6)",
    },
    dark: {
      background: "#1C1917",
      surface: "#292524",
      primary: "#FAFAF9",
      secondary: "#A8A29E",
      borderDecor: "#44403C",
      borderControl: "#78716C",
      accent: "#D4A04A",
      accentContrast: "#1C1917",
      scrim: "rgb(28 25 23 / 0.6)",
    },
  },
  typography: {
    fontFamilies: {
      serif: "var(--font-cormorant), Georgia, serif",
      sans: "var(--font-montserrat), system-ui, -apple-system, sans-serif",
    },
  },
  touchTarget: {
    minWidth: "44px",
    minHeight: "44px",
    spacing: "8px",
  },
  focus: {
    outlineWidth: "2px",
    outlineOffset: "2px",
    outlineColor: "var(--color-border-control)",
  },
} as const;

export type DesignTokens = typeof designTokens;
export type ColorTheme = "light" | "dark";
