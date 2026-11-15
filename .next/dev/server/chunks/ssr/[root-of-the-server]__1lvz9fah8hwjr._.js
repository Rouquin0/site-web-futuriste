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
 * src/app/page.tsx — Page d'accueil (Composant Serveur) — V5
 *
 * Défilement vertical NATIF (aucune interception). Structure :
 *   1. Accueil (hero)            — dessin technique SVG
 *   2. 01 Défilé                 — défilé horizontal à trois images
 *   3. 02 Accessoires & pièces   — vue de détail au toucher
 *   4. 03 Collections            — index, ouvre la tenue correspondante
 * Chaque section apparaît au défilement avec une petite animation d'entrée (une seule fois).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ThemeToggle.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Hero.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Reveal.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HorizontalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HorizontalShowcase.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccessoiresSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AccessoiresSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CollectionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CollectionsSection.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SiteFooter$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SiteFooter.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/site.config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$tenues$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/tenues.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function HomePage() {
    const tenuesSorted = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$tenues$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tenues"]
    ].sort((a, b)=>a.ordreAffichage - b.ordreAffichage);
    const pieces = tenuesSorted.flatMap((t)=>(t.pieces ?? []).map((piece)=>({
                piece,
                tenueNom: t.nom,
                tenueReference: t.reference
            })));
    // Aucun texte inventé : un slogan encore à compléter n'est pas affiché
    const slogan = __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].slogan.startsWith("[À COMPLÉTER") ? null : __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].slogan;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ThemeToggle$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                nom: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].nomCommercial,
                ville: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].ville,
                pays: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].pays,
                slogan: slogan,
                totalTenues: tenuesSorted.length
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                as: "section",
                "aria-label": "Défilé des tenues",
                start: "top 75%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HorizontalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    tenues: tenuesSorted
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                as: "section",
                "aria-label": "Accessoires et pièces",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccessoiresSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    pieces: pieces
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                as: "section",
                "aria-label": "Collections",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CollectionsSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    tenues: tenuesSorted
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SiteFooter$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                nom: __TURBOPACK__imported__module__$5b$project$5d2f$site$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["siteConfig"].nomCommercial
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/AccessoiresSection.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/AccessoiresSection.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/AccessoiresSection.tsx", "default");
}),
"[project]/src/components/AccessoiresSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccessoiresSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/AccessoiresSection.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccessoiresSection$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/CollectionLink.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/CollectionLink.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/CollectionLink.tsx", "default");
}),
"[project]/src/components/CollectionLink.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CollectionLink$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/CollectionLink.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CollectionLink$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/CollectionsSection.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CollectionsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionHead$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SectionHead.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CollectionLink$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CollectionLink.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HudGraphics$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HudGraphics.tsx [app-rsc] (ecmascript)");
;
;
;
;
function CollectionsSection({ tenues }) {
    const map = new Map();
    [
        ...tenues
    ].sort((a, b)=>a.ordreAffichage - b.ordreAffichage).forEach((t)=>{
        map.set(t.collection, [
            ...map.get(t.collection) ?? [],
            t
        ]);
    });
    const collections = Array.from(map.entries());
    if (collections.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-7xl px-6 pb-24 md:pb-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionHead$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                index: "03",
                title: "Collections",
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    "aria-hidden": "true",
                    children: String(collections.length).padStart(2, "0")
                }, void 0, false, {
                    fileName: "[project]/src/components/CollectionsSection.tsx",
                    lineNumber: 18,
                    columnNumber: 58
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CollectionsSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-6 border-b border-border-decor",
                children: collections.map(([nom, items], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        "data-reveal": true,
                        className: "border-t border-border-decor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CollectionLink$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            slug: items[0].slug,
                            className: "group flex min-h-touch items-center gap-4 py-6 md:py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:-outline-offset-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hud-label w-8 text-accent",
                                    children: String(i + 1).padStart(2, "0")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CollectionsSection.tsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex-1 font-serif text-3xl md:text-5xl font-light leading-none text-primary transition-transform duration-300 ease-out group-hover:translate-x-2",
                                    children: nom
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CollectionsSection.tsx",
                                    lineNumber: 27,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hud-label hidden text-secondary sm:block",
                                    children: [
                                        String(items.length).padStart(2, "0"),
                                        " ",
                                        items.length > 1 ? "tenues" : "tenue"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CollectionsSection.tsx",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HudGraphics$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ArrowIcon"], {
                                    className: "h-5 w-5 text-primary transition-transform duration-300 ease-out group-hover:translate-x-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CollectionsSection.tsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CollectionsSection.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    }, nom, false, {
                        fileName: "[project]/src/components/CollectionsSection.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/CollectionsSection.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CollectionsSection.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Hero.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/Hero.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/Hero.tsx", "default");
}),
"[project]/src/components/Hero.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/Hero.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Hero$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/HorizontalShowcase.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/HorizontalShowcase.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/HorizontalShowcase.tsx", "default");
}),
"[project]/src/components/HorizontalShowcase.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HorizontalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/HorizontalShowcase.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HorizontalShowcase$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/HudGraphics.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowIcon",
    ()=>ArrowIcon,
    "ChevronIcon",
    ()=>ChevronIcon,
    "CornerBrackets",
    ()=>CornerBrackets,
    "GridBackdrop",
    ()=>GridBackdrop,
    "MannequinSvg",
    ()=>MannequinSvg,
    "PieceGlyph",
    ()=>PieceGlyph,
    "Platform",
    ()=>Platform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/**
 * src/components/HudGraphics.tsx — Graphismes SVG (V5)
 *
 * Esthétique : dessin technique, traits fins, aplats uniquement.
 * Aucun dégradé, aucune lueur, aucun flou décoratif (Section F : zéro look IA).
 * Toutes les couleurs viennent de currentColor (jetons sémantiques du thème).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
function MannequinSvg({ className = "", annotated = false, drawable = false }) {
    const draw = drawable ? {
        "data-draw": ""
    } : {};
    const common = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        vectorEffect: "non-scaling-stroke",
        pathLength: 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 200 470",
        className: className,
        role: "img",
        "aria-label": "Mannequin de couture stylisé, sans visage",
        focusable: "false",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "100",
                cy: "36",
                rx: "16",
                ry: "21",
                ...common,
                ...draw
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M93 56 L94 72 M107 56 L106 72",
                ...common,
                ...draw
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M94 72 C76 74 58 80 54 96 C52 106 56 118 58 132 C60 150 64 168 66 182\n           C67 196 62 212 58 228 C56 240 62 252 74 258 L126 258\n           C138 252 144 240 142 228 C138 212 133 196 134 182\n           C136 168 140 150 142 132 C144 118 148 106 146 96\n           C142 80 124 74 106 72",
                ...common,
                ...draw
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M58 124 Q100 134 142 124",
                ...common,
                strokeDasharray: "2 4",
                opacity: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M66 182 Q100 192 134 182",
                ...common,
                strokeDasharray: "2 4",
                opacity: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M58 232 Q100 244 142 232",
                ...common,
                strokeDasharray: "2 4",
                opacity: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M100 258 L100 412",
                ...common,
                ...draw
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "100",
                cy: "420",
                rx: "46",
                ry: "8",
                ...common,
                ...draw
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "100",
                cy: "420",
                rx: "28",
                ry: "4.5",
                ...common,
                opacity: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            annotated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                ...common,
                opacity: 0.75,
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: "7",
                letterSpacing: "1.2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M152 129 H178 M152 187 H178 M152 238 H178"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HudGraphics.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "150",
                        y: "124",
                        fill: "currentColor",
                        stroke: "none",
                        children: "BUSTE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HudGraphics.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "150",
                        y: "182",
                        fill: "currentColor",
                        stroke: "none",
                        children: "TAILLE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HudGraphics.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "150",
                        y: "233",
                        fill: "currentColor",
                        stroke: "none",
                        children: "HANCHES"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HudGraphics.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function GridBackdrop({ className = "", size = 64 }) {
    const id = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useId().replace(/:/g, "");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: "100%",
        height: "100%",
        "aria-hidden": "true",
        focusable: "false",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                    id: `g-${id}`,
                    width: size,
                    height: size,
                    patternUnits: "userSpaceOnUse",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: `M ${size} 0 L 0 0 0 ${size}`,
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HudGraphics.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HudGraphics.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "100%",
                height: "100%",
                fill: `url(#g-${id})`
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function CornerBrackets({ className = "", size = 16 }) {
    const p = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1,
        vectorEffect: "non-scaling-stroke"
    };
    const s = size;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: "100%",
        height: "100%",
        "aria-hidden": "true",
        focusable: "false",
        preserveAspectRatio: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                x: "0",
                y: "0",
                width: s,
                height: s,
                overflow: "visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `M0 ${s} V0 H${s}`,
                    ...p
                }, void 0, false, {
                    fileName: "[project]/src/components/HudGraphics.tsx",
                    lineNumber: 105,
                    columnNumber: 64
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                x: "100%",
                y: "0",
                width: s,
                height: s,
                overflow: "visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `M${-s} 0 H0 V${s}`,
                    ...p
                }, void 0, false, {
                    fileName: "[project]/src/components/HudGraphics.tsx",
                    lineNumber: 106,
                    columnNumber: 67
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                x: "0",
                y: "100%",
                width: s,
                height: s,
                overflow: "visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `M0 ${-s} V0 H${s}`,
                    ...p
                }, void 0, false, {
                    fileName: "[project]/src/components/HudGraphics.tsx",
                    lineNumber: 107,
                    columnNumber: 67
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                x: "100%",
                y: "100%",
                width: s,
                height: s,
                overflow: "visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `M${-s} 0 H0 V${-s}`,
                    ...p
                }, void 0, false, {
                    fileName: "[project]/src/components/HudGraphics.tsx",
                    lineNumber: 108,
                    columnNumber: 70
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
function Platform({ className = "" }) {
    const p = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1,
        vectorEffect: "non-scaling-stroke"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 600 120",
        "aria-hidden": "true",
        focusable: "false",
        preserveAspectRatio: "xMidYMid meet",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "300",
                cy: "60",
                rx: "290",
                ry: "52",
                ...p,
                opacity: 0.5
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "300",
                cy: "60",
                rx: "220",
                ry: "38",
                ...p,
                opacity: 0.7
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "300",
                cy: "60",
                rx: "150",
                ry: "24",
                ...p
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 60 H40 M560 60 H590 M300 8 V20 M300 100 V112",
                ...p
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
/* ─── Icônes à trait fin ─────────────────────────────────────────────────────── */ const icon = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
function ChevronIcon({ direction, className = "w-4 h-4" }) {
    const d = {
        left: "M15 5 L8 12 L15 19",
        right: "M9 5 L16 12 L9 19",
        up: "M5 15 L12 8 L19 15",
        down: "M5 9 L12 16 L19 9"
    }[direction];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        focusable: "false",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: d,
            ...icon
        }, void 0, false, {
            fileName: "[project]/src/components/HudGraphics.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
function ArrowIcon({ className = "w-4 h-4" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        focusable: "false",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 12 H20 M14 6 L20 12 L14 18",
            ...icon
        }, void 0, false, {
            fileName: "[project]/src/components/HudGraphics.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
function PieceGlyph({ className = "" }) {
    const p = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1,
        vectorEffect: "non-scaling-stroke"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 120 120",
        "aria-hidden": "true",
        focusable: "false",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "60",
                cy: "60",
                r: "38",
                ...p
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "60",
                cy: "60",
                r: "22",
                ...p,
                opacity: 0.6
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M60 14 V30 M60 90 V106 M14 60 H30 M90 60 H106",
                ...p
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "60",
                cy: "60",
                r: "2",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/src/components/HudGraphics.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HudGraphics.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Reveal.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/Reveal.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/Reveal.tsx", "default");
}),
"[project]/src/components/Reveal.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/Reveal.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Reveal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/SectionHead.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SectionHead.tsx — En-tête de section (V5) : numéro, titre, filet qui se trace au défilement
 */ __turbopack_context__.s([
    "default",
    ()=>SectionHead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function SectionHead({ index, title, right, headingId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        "data-reveal": true,
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: headingId,
                        className: "hud-label text-primary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: index
                            }, void 0, false, {
                                fileName: "[project]/src/components/SectionHead.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mx-3 text-border-control",
                                "aria-hidden": "true",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SectionHead.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SectionHead.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    right && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hud-label text-secondary",
                        children: right
                    }, void 0, false, {
                        fileName: "[project]/src/components/SectionHead.tsx",
                        lineNumber: 22,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SectionHead.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "mt-3 block h-2 w-full text-border-control",
                "aria-hidden": "true",
                focusable: "false",
                preserveAspectRatio: "none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    "data-draw": true,
                    x1: "0",
                    y1: "1",
                    x2: "100%",
                    y2: "1",
                    pathLength: 1,
                    stroke: "currentColor",
                    strokeWidth: "1",
                    vectorEffect: "non-scaling-stroke"
                }, void 0, false, {
                    fileName: "[project]/src/components/SectionHead.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SectionHead.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SectionHead.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/SiteFooter.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/SiteFooter.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/SiteFooter.tsx", "default");
}),
"[project]/src/components/SiteFooter.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SiteFooter$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/SiteFooter.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SiteFooter$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1lvz9fah8hwjr._.js.map