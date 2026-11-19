/**
 * src/design-tokens.ts — Jetons de design officiels (V4.4)
 * Section F & V — Zéro Look IA — Haute Couture Sobriété
 */

export const designTokens = {
  colors: {
    // ── Thème clair : ivoire + beige froid + bordeaux + noir ───────────────
    //   Fond ivoire #FAF7F1 (jamais de blanc pur : reposant pour l'œil).
    //   Beige froid #E7E0D0 : beige à sous-ton gris, mat, sans jaune criard.
    //   Bordeaux #7A1E2B : accent profond désaturé (contraste ≈ 9:1 sur ivoire).
    //   Noir #1C1917 : textes et contours (contraste ≈ 14:1 sur ivoire).
    light: {
      background: "#FAF7F1",
      surface: "#FFFFFF",
      beige: "#E7E0D0",
      primary: "#1C1917",
      secondary: "#6B5F52",
      borderDecor: "#D9D2C2",
      borderControl: "#6E6257",
      accent: "#7A1E2B",
      accentContrast: "#FAF7F1",
      bordeaux: "#7A1E2B",
      encre: "#1C1917",
    },
    // ── Thème sombre : le beige disparaît, bordeaux + noir restent ─────────
    //   Le beige froid est remappé sur un brun-noir #2A2320 (aucune plage claire).
    //   Bordeaux éclairci #D78E98 : même teinte, lisible sur fond noir (≈ 7:1).
    //   Fond noir chaud #141110 (jamais de noir pur #000 : moins agressif).
    dark: {
      background: "#141110",
      surface: "#221B18",
      beige: "#2A2320",
      primary: "#F6EFE3",
      secondary: "#B9AFA1",
      borderDecor: "#3A2E29",
      borderControl: "#8A7B6C",
      accent: "#D78E98",
      accentContrast: "#141110",
      bordeaux: "#D78E98",
      encre: "#F6EFE3",
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
