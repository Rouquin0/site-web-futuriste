module.exports = [
"[next]/internal/font/google/cormorant_f7d05b5.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$cormorant_f7d05b5$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/cormorant_f7d05b5.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$cormorant_f7d05b5$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Cormorant', 'Cormorant Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$cormorant_f7d05b5$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$cormorant_f7d05b5$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/cormorant_f7d05b5.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "cormorant_f7d05b5-module__qqDjDa__className",
  "variable": "cormorant_f7d05b5-module__qqDjDa__variable",
});
}),
"[next]/internal/font/google/montserrat_b0410d95.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$montserrat_b0410d95$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/montserrat_b0410d95.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$montserrat_b0410d95$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Montserrat', 'Montserrat Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$montserrat_b0410d95$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$montserrat_b0410d95$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/montserrat_b0410d95.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "montserrat_b0410d95-module__FrTg-a__className",
  "variable": "montserrat_b0410d95-module__FrTg-a__variable",
});
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime;
}),
"[project]/site.config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * site.config.ts — Configuration centrale du projet
 * RÈGLE : Aucune occurrence du nom n'est écrite en dur dans les composants.
 * Tous les champs marqués [À COMPLÉTER] bloquent le build de production.
 */ __turbopack_context__.s([
    "siteConfig",
    ()=>siteConfig
]);
const siteConfig = {
    // ─── Identité commerciale ───────────────────────────────────────────────────
    nomCommercial: "Boutique",
    estNomProvisoire: true,
    raisonSociale: "[À COMPLÉTER — Raison sociale légale]",
    slogan: "[À COMPLÉTER — Slogan de la boutique]",
    // ─── Localisation ───────────────────────────────────────────────────────────
    pays: "Congo",
    paysCode: "CG",
    ville: "Brazzaville",
    langue: "fr-CG",
    // ─── Devise ─────────────────────────────────────────────────────────────────
    devise: {
        code: "XAF",
        symbole: "FCFA",
        // Aucune décimale. Format : « 15 000 FCFA » via formatPriceXAF()
        decimales: 0
    },
    // ─── Contact WhatsApp ────────────────────────────────────────────────────────
    telephoneWhatsApp: "+242060000000",
    // Format wa.me (sans + ni espaces) — généré automatiquement
    get telephoneWaMeSanitized () {
        return this.telephoneWhatsApp.replace(/\+|\s/g, "");
    },
    // ─── URLs & domaine ──────────────────────────────────────────────────────────
    // Lire depuis variable d'environnement NEXT_PUBLIC_SITE_URL en priorité
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "[À COMPLÉTER — URL de production]",
    // ─── Coordonnées ────────────────────────────────────────────────────────────
    adressePhysique: "[À COMPLÉTER — Adresse physique de la boutique]",
    email: "[À COMPLÉTER — Email de contact]",
    // ─── Liens du pied de page ───────────────────────────────────────────────────
    liensFooter: {
        cgv: "/cgv",
        mentionsLegales: "/mentions-legales",
        politiqueConfidentialite: "/confidentialite"
    },
    // ─── Partage / OpenGraph ─────────────────────────────────────────────────────
    descriptionPartage: "[À COMPLÉTER — Description courte pour partage réseaux sociaux]",
    // ─── Logo ───────────────────────────────────────────────────────────────────
    // Fichier unique SVG à deux variantes (clair/sombre). Logotype provisoire accepté.
    logoProvisoire: true
};
// ─── Validation au démarrage (nom provisoire bloque le build prod) ─────────────
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * src/app/layout.tsx — Root Layout (V4.2)
 */ __turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata,
    "viewport",
    ()=>viewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$cormorant_f7d05b5$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/cormorant_f7d05b5.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$montserrat_b0410d95$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/montserrat_b0410d95.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/site.config.ts [app-rsc] (ecmascript)");
;
;
;
;
;
// ── Script de thème (Inline pour éviter les conflits) ────────────────────────
const themeInitScript = `
  (function() {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;
const metadata = {
    title: {
        default: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].nomCommercial,
        template: `%s — ${__TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].nomCommercial}`
    },
    description: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].descriptionPartage,
    metadataBase: new URL(__TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].siteUrl.startsWith("[À COMPLÉTER") ? "http://localhost:3000" : __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].siteUrl),
    openGraph: {
        type: "website",
        locale: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].langue,
        siteName: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].nomCommercial,
        title: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].nomCommercial,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].descriptionPartage
    },
    robots: {
        index: ("TURBOPACK compile-time value", "development") === "production",
        follow: ("TURBOPACK compile-time value", "development") === "production"
    },
    alternates: {
        canonical: "/"
    }
};
const viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
        {
            media: "(prefers-color-scheme: light)",
            color: "#FAFAF9"
        },
        {
            media: "(prefers-color-scheme: dark)",
            color: "#1C1917"
        }
    ]
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "fr",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                    suppressHydrationWarning: true,
                    dangerouslySetInnerHTML: {
                        __html: themeInitScript
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                suppressHydrationWarning: true,
                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$cormorant_f7d05b5$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$montserrat_b0410d95$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} bg-background text-primary font-sans antialiased`,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1ka61ac3r52bn._.js.map