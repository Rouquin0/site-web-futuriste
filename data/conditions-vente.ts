/**
 * data/conditions-vente.ts — Conditions de vente officielles (Sections M & Q)
 * Marché : Brazzaville, République du Congo (Droit congolais)
 * 
 * RÈGLE ABSOLUE :
 * L'agent n'invente AUCUN texte juridique, tarif de livraison ou moyen de paiement.
 * Tous les champs [À COMPLÉTER] doivent être validés avec le client propriétaire.
 */

import type { ConditionsVente } from "../src/types/catalogue";

export const conditionsVente: ConditionsVente = {
  // Moyens de paiement acceptés à Brazzaville (fournis par le client)
  modesPaiement: [
    "[À COMPLÉTER — Ex: Espèces à la livraison]",
    "[À COMPLÉTER — Ex: Mobile Money (Airtel Money Congo, MTN Mobile Money)]",
    "[À COMPLÉTER — Ex: Virement bancaire local]"
  ],

  // Affichage des prix (décision client)
  affichagePrix: "TTC", // ou "HT" selon validation du client

  // Zones et délais de livraison à Brazzaville et hors Brazzaville
  zonesLivraison: [
    {
      zone: "Brazzaville — Centre-ville, Plateau, Bacongo, Poto-Poto",
      delai: "[À COMPLÉTER — Ex: 24h à 48h ouvrées]",
      frais: "[À COMPLÉTER — Ex: 2 000 FCFA ou Offert dès X FCFA]"
    },
    {
      zone: "Brazzaville — Périphérie (Talangaï, Ouenzé, Mfilou, Madibou, Djiri)",
      delai: "[À COMPLÉTER — Ex: 48h à 72h ouvrées]",
      frais: "[À COMPLÉTER — Ex: 3 000 FCFA]"
    },
    {
      zone: "Pointe-Noire et intérieur du Congo",
      delai: "[À COMPLÉTER — Ex: 3 à 5 jours ouvrés via transporteur]",
      frais: "[À COMPLÉTER — Sur devis WhatsApp]"
    },
    {
      zone: "International (Zone CEMAC, Europe, reste du monde)",
      delai: "[À COMPLÉTER — Variable selon transporteur aérien/fret]",
      frais: "[À COMPLÉTER — Devis personnalisé calculé sur WhatsApp]"
    }
  ],

  // Politique d'échange et de rétractation (Droit congolais)
  politiqueEchange:
    "[À COMPLÉTER — Délais d'échange (ex: 7 jours à réception), articles non portés avec étiquette d'origine, frais de retour à la charge du client sauf défaut avéré]",

  // Retrait sur place à l'atelier / boutique de Brazzaville
  retraitBoutique: true
};
