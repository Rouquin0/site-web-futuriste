module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/data/tenues.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * data/tenues.ts — Jeu de données pilote (3-5 tenues)
 * ─────────────────────────────────────────────────────
 * RÈGLES :
 *  - Prix en XAF : entier positif, sans décimales (45000 = 45 000 FCFA)
 *  - imageId DOIT correspondre à une entrée dans data/droits-images.json
 *  - ZÉRO image Pinterest
 *  - Toutes les valeurs [À COMPLÉTER] sont bloquantes : fournies par le client
 */ __turbopack_context__.s([
    "tenues",
    ()=>tenues
]);
const tenues = [
    // ─── 1. Robe Wax Wengé ─────────────────────────────────────────────────────
    {
        id: "robe-wax-wenge-001",
        slug: "robe-wax-wenge-imprime-geometrique",
        nom: "Robe Wax Wengé à Motifs Géométriques",
        genre: "femme",
        categorie: "robe",
        collection: "Capsule Wax 2026",
        descriptionCourte: "Robe longue en wax wengé à motifs géométriques dorés. Coupe droite évasée, col rond, manches trois-quarts.",
        descriptionLongue: "Confectionnée en wax 100 % coton imprimé de motifs géométriques dorés sur fond wengé, cette robe longue allie élégance africaine et modernité. La coupe droite légèrement évasée en bas garantit confort et aisance. Idéale pour les cérémonies, soirées et occasions festives. Disponible en tailles XS à XL.",
        matiere: "100 % coton wax imprimé",
        couleurs: [
            "Wengé imprimé or"
        ],
        prixXAF: 45000,
        reference: "RW-2026-001",
        imageId: "img-robe-wax-001-principale",
        imagesSecondairesIds: [
            "img-robe-wax-001-detail"
        ],
        tailles: [
            {
                taille: "XS",
                statut: "disponible",
                derniereMiseAJour: "2026-11-01"
            },
            {
                taille: "S",
                statut: "disponible",
                derniereMiseAJour: "2026-11-01"
            },
            {
                taille: "M",
                statut: "disponible",
                derniereMiseAJour: "2026-11-01"
            },
            {
                taille: "L",
                statut: "limite",
                derniereMiseAJour: "2026-11-01"
            },
            {
                taille: "XL",
                statut: "epuise",
                derniereMiseAJour: "2026-11-01"
            }
        ],
        ordreAffichage: 1,
        dateMiseEnLigne: "2026-10-15",
        enAvant: true,
        pieces: [
            {
                id: "robe-wax-col-buste-001",
                nom: "Buste & Col Wax",
                type: "vetement",
                zoneTouchable: {
                    x: 38,
                    y: 22,
                    width: 24,
                    height: 28,
                    nomAccessible: "Examiner le buste et le col en détail"
                },
                matiere: "Wax 100% coton imprimé main",
                description: "Col rond structuré avec surpiqûres dorées et raccord géométrique parfait.",
                texteAlternatif: "Gros plan sur le col rond et la surpiqûre dorée de la robe en wax wengé",
                photos: [
                    "/images/pieces/robe-wax-col-macro.webp"
                ],
                rotation: {
                    dossier: "/images/pieces/rotation-robe-wax",
                    nombreImages: 24
                }
            },
            {
                id: "robe-wax-manches-001",
                nom: "Manches Trois-Quarts",
                type: "vetement",
                zoneTouchable: {
                    x: 64,
                    y: 38,
                    width: 18,
                    height: 20,
                    nomAccessible: "Examiner les manches et les finitions"
                },
                matiere: "Wax 100% coton",
                description: "Ourlet soigné avec motif chevron doré continu.",
                texteAlternatif: "Gros plan sur l'ourlet de la manche trois-quarts et le motif géométrique du wax",
                photos: [
                    "/images/pieces/robe-wax-manche-macro.webp"
                ]
            }
        ]
    },
    // ─── 2. Ensemble Bazin Bleu Indigo ─────────────────────────────────────────
    {
        id: "ensemble-bazin-bleu-001",
        slug: "ensemble-bazin-riche-bleu-indigo-brode",
        nom: "Ensemble Bazin Riche Bleu Indigo Brodé",
        genre: "femme",
        categorie: "ensemble",
        collection: "Capsule Bazin Prestige",
        descriptionCourte: "Ensemble deux pièces en bazin riche bleu indigo avec broderies dorées. Haut tunique col V et pantalon droit assorti.",
        descriptionLongue: "Taillé dans un bazin riche d'exception en bleu indigo profond, cet ensemble deux pièces incarne l'élégance congolaise. La tunique à col V est ornée de broderies dorées aux emmanchures et à l'encolure. Le pantalon droit assorti, fluide et confortable, complète silhouette parfaite. Pour mariages, cérémonies et soirées de prestige.",
        matiere: "Bazin riche 100 % coton mercerisé",
        couleurs: [
            "Bleu indigo"
        ],
        prixXAF: 85000,
        reference: "EB-2026-001",
        imageId: "img-ensemble-bazin-001-principale",
        tailles: [
            {
                taille: "XS",
                statut: "limite",
                derniereMiseAJour: "2026-11-05"
            },
            {
                taille: "S",
                statut: "disponible",
                derniereMiseAJour: "2026-11-05"
            },
            {
                taille: "M",
                statut: "disponible",
                derniereMiseAJour: "2026-11-05"
            },
            {
                taille: "L",
                statut: "disponible",
                derniereMiseAJour: "2026-11-05"
            },
            {
                taille: "XL",
                statut: "limite",
                derniereMiseAJour: "2026-11-05"
            }
        ],
        ordreAffichage: 2,
        dateMiseEnLigne: "2026-10-20",
        enAvant: true,
        pieces: [
            {
                id: "bazin-tunique-broderie-001",
                nom: "Tunique Broderie Or",
                type: "vetement",
                zoneTouchable: {
                    x: 36,
                    y: 24,
                    width: 28,
                    height: 32,
                    nomAccessible: "Examiner la tunique brodée en détail"
                },
                matiere: "Bazin riche 100% coton mercerisé",
                description: "Broderie artisanale en fil d'or réalisée au point de feston.",
                texteAlternatif: "Gros plan sur la broderie dorée artisanale à l'encolure en V de la tunique en bazin",
                photos: [
                    "/images/pieces/bazin-broderie-macro.webp"
                ]
            },
            {
                id: "bazin-pantalon-droit-001",
                nom: "Pantalon Droit Bazin",
                type: "vetement",
                zoneTouchable: {
                    x: 35,
                    y: 62,
                    width: 30,
                    height: 30,
                    nomAccessible: "Examiner la coupe du pantalon"
                },
                matiere: "Bazin riche fluide",
                description: "Tombé fluide et droit avec ceinture intérieure renforcée.",
                texteAlternatif: "Gros plan sur la taille élastiquée et les coutures de finition du pantalon en bazin",
                photos: [
                    "/images/pieces/bazin-pantalon-macro.webp"
                ]
            }
        ]
    },
    // ─── 3. Chemise Kente Homme ────────────────────────────────────────────────
    {
        id: "chemise-kente-multicolore-001",
        slug: "chemise-homme-kente-multicolore",
        nom: "Chemise Homme Kente Multicolore",
        genre: "homme",
        categorie: "chemise",
        collection: "Collection Homme 2026",
        descriptionCourte: "Chemise homme en tissu kente multicolore rouge, vert et or. Coupe ajustée, col classique, manches courtes.",
        descriptionLongue: "Tissée selon la tradition, cette chemise en kente authentique multicolore aux bandes verticales rouge, vert et or apporte caractère et distinction. Coupe ajustée moderne, col classique rebordé et manches courtes pour un port confortable. Idéale pour les occasions semi-formelles, cérémonies et sorties culturelles.",
        matiere: "Tissu kente tissé main (coton et soie artificielle)",
        couleurs: [
            "Rouge, vert et or"
        ],
        prixXAF: 32000,
        reference: "CH-2026-001",
        imageId: "img-chemise-kente-001-principale",
        tailles: [
            {
                taille: "S",
                statut: "disponible",
                derniereMiseAJour: "2026-11-08"
            },
            {
                taille: "M",
                statut: "disponible",
                derniereMiseAJour: "2026-11-08"
            },
            {
                taille: "L",
                statut: "disponible",
                derniereMiseAJour: "2026-11-08"
            },
            {
                taille: "XL",
                statut: "disponible",
                derniereMiseAJour: "2026-11-08"
            }
        ],
        ordreAffichage: 3,
        dateMiseEnLigne: "2026-11-01",
        enAvant: false
    },
    // ─── 4. Robe de Soirée Satin Blanc ────────────────────────────────────────
    {
        id: "robe-soie-blanche-001",
        slug: "robe-soiree-satin-blanc-ivoire-sirene",
        nom: "Robe de Soirée Satin Blanc Ivoire Sirène",
        genre: "femme",
        categorie: "robe",
        collection: "Collection Soirée",
        descriptionCourte: "Robe de soirée en satin blanc ivoire coupe sirène, encolure asymétrique, fente latérale et drapé à la hanche.",
        descriptionLongue: "Robe longue de soirée d'une élégance intemporelle, taillée dans un satin fluide blanc ivoire. La coupe sirène épouse délicatement les courbes jusqu'au genou puis s'évase en godets. L'encolure asymétrique et le drapé subtil à la hanche apportent une touche de sophistication unique. La fente latérale facilite le déplacement. Parfaite pour les mariages, galas et soirées de prestige.",
        matiere: "Satin polyester haute qualité, doublure 100 % coton",
        couleurs: [
            "Blanc ivoire"
        ],
        prixXAF: 120000,
        reference: "RS-2026-001",
        imageId: "img-robe-soie-blanche-001-principale",
        tailles: [
            {
                taille: "XS",
                statut: "disponible",
                derniereMiseAJour: "2026-11-10"
            },
            {
                taille: "S",
                statut: "disponible",
                derniereMiseAJour: "2026-11-10"
            },
            {
                taille: "M",
                statut: "disponible",
                derniereMiseAJour: "2026-11-10"
            },
            {
                taille: "L",
                statut: "limite",
                derniereMiseAJour: "2026-11-10"
            },
            {
                taille: "XL",
                statut: "epuise",
                derniereMiseAJour: "2026-11-10"
            }
        ],
        ordreAffichage: 4,
        dateMiseEnLigne: "2026-11-05",
        enAvant: true
    },
    // ─── 5. Tailleur Ankara Terracotta ────────────────────────────────────────
    {
        id: "tailleur-ankara-terracotta-001",
        slug: "tailleur-femme-ankara-terracotta-orange",
        nom: "Tailleur Femme Ankara Terracotta & Orange",
        genre: "femme",
        categorie: "tailleur",
        collection: "Capsule Wax 2026",
        descriptionCourte: "Tailleur deux pièces en ankara terracotta et orange : veste courte boutonnée et jupe crayon mi-genou.",
        descriptionLongue: "Tailleur féminin aux couleurs chaudes de la terre, confectionné dans un ankara premium aux motifs africains terracotta et orange. La veste courte structurée, à deux boutons recouverts, s'associe parfaitement à la jupe crayon mi-genou. Un ensemble polyvalent qui se porte aussi bien en milieu professionnel que lors d'occasions festives. Réalisé en coton léger, idéal pour le climat de Brazzaville.",
        matiere: "Ankara 100 % coton imprimé premium",
        couleurs: [
            "Terracotta et orange"
        ],
        prixXAF: 68000,
        reference: "TA-2026-001",
        imageId: "img-tailleur-ankara-001-principale",
        tailles: [
            {
                taille: "XS",
                statut: "epuise",
                derniereMiseAJour: "2026-11-12"
            },
            {
                taille: "S",
                statut: "disponible",
                derniereMiseAJour: "2026-11-12"
            },
            {
                taille: "M",
                statut: "disponible",
                derniereMiseAJour: "2026-11-12"
            },
            {
                taille: "L",
                statut: "disponible",
                derniereMiseAJour: "2026-11-12"
            },
            {
                taille: "XL",
                statut: "limite",
                derniereMiseAJour: "2026-11-12"
            }
        ],
        ordreAffichage: 5,
        dateMiseEnLigne: "2026-11-10",
        enAvant: false
    }
];
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/**
 * src/app/page.tsx — Page d'accueil (Composant Serveur)
 *
 * - Charge les tenues côté serveur (zéro requête client pour les données)
 * - Passe les tenues au composant VerticalShowcase (chargement dynamique, ssr:false)
 * - ThemeToggle positionné en haut à droite (position:fixed dans son propre composant)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ThemeToggle.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VerticalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/VerticalShowcase.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$tenues$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/tenues.ts [app-rsc] (ecmascript)");
;
;
;
;
function HomePage() {
    // Trier par ordreAffichage côté serveur pour hydrater dans le bon ordre
    const tenuesSorted = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$tenues$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tenues"]
    ].sort((a, b)=>a.ordreAffichage - b.ordreAffichage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VerticalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                tenues: tenuesSorted
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/ThemeToggle.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeScript",
    ()=>ThemeScript,
    "default",
    ()=>__TURBOPACK__default__export__,
    "themeInitScript",
    ()=>themeInitScript
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ThemeScript = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ThemeScript() from the server but ThemeScript is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ThemeToggle.tsx", "ThemeScript");
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/ThemeToggle.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ThemeToggle.tsx", "default");
const themeInitScript = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call themeInitScript() from the server but themeInitScript is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ThemeToggle.tsx", "themeInitScript");
}),
"[project]/src/components/ThemeToggle.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/ThemeToggle.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/VerticalShowcase.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/VerticalShowcase.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/VerticalShowcase.tsx", "default");
}),
"[project]/src/components/VerticalShowcase.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VerticalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/VerticalShowcase.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$VerticalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1fi_4msnahq5_._.js.map