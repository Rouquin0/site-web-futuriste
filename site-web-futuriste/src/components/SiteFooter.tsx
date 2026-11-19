"use client";

/**
 * SiteFooter.tsx — Pied de page pro : contact WhatsApp / Instagram / Facebook,
 * navigation, univers, aide — puis barre légale.
 *
 * Les liens sociaux sont lus depuis siteConfig.sociaux :
 * remplacez simplement les URL par vos vrais comptes, aucun code à toucher.
 */
import React from "react";
import { siteConfig } from "../../site.config";
import { ChevronIcon } from "./HudGraphics";

interface SiteFooterProps {
  nom: string;
  collections?: string[];
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5 2 1c-.5 1.5-1.5 2-3 1.5-3-1-6-4-7-7-.5-1.5 0-2.5 1.5-3l1 2L9 9.5Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6.5v3H9v9h3v-9h2.5l.5-3H12V6.8c0-.7.3-1 .8-1.3H15V3Z" />
    </svg>
  );
}

export default function SiteFooter({ nom, collections = [] }: SiteFooterProps) {
  const sociaux = [
    { nom: "WhatsApp", href: siteConfig.sociaux.whatsapp, Icon: WhatsAppIcon, cta: true },
    { nom: "Instagram", href: siteConfig.sociaux.instagram, Icon: InstagramIcon, cta: false },
    { nom: "Facebook", href: siteConfig.sociaux.facebook, Icon: FacebookIcon, cta: false },
  ];

  return (
    <footer className="border-t border-border-decor bg-surface">
      {/* Bloc contact pro */}
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="hud-label text-accent">✦ Restons en contact</p>
            <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-primary md:text-4xl">
              Une envie, une cérémonie, une mesure ?
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-secondary">
              Écrivez-nous — réponse rapide, devis sur-mesure et prise de mesures à {siteConfig.ville}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {sociaux.map(({ nom: reseau, href, Icon, cta }) => (
                <a
                  key={reseau}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${nom} sur ${reseau} (nouvel onglet)`}
                  className={
                    cta
                      ? "inline-flex min-h-touch items-center gap-2 bg-primary px-5 py-3 hud-label text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
                      : "inline-flex min-h-touch items-center gap-2 border border-border-control px-5 py-3 hud-label text-primary transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
                  }
                >
                  <Icon />
                  {reseau}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Pied de page — navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="hud-label text-secondary">Maison</p>
              <ul className="mt-4 space-y-3 font-sans text-sm text-primary">
                <li><a href="#defile" className="link-rule transition-colors hover:text-accent">Le défilé</a></li>
                <li><a href="#defile" className="link-rule transition-colors hover:text-accent">Vestiaire femme</a></li>
                <li><a href="#defile" className="link-rule transition-colors hover:text-accent">Vestiaire homme</a></li>
              </ul>
            </div>
            <div>
              <p className="hud-label text-secondary">Univers</p>
              <ul className="mt-4 space-y-3 font-sans text-sm text-primary">
                {(collections.length > 0 ? collections.slice(0, 4) : ["Capsule Wax", "Bazin Prestige", "Soirée"]).map((c) => (
                  <li key={c}><span>{c}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="hud-label text-secondary">Aide</p>
              <ul className="mt-4 space-y-3 font-sans text-sm text-primary">
                <li><a href={siteConfig.sociaux.whatsapp} target="_blank" rel="noopener noreferrer" className="link-rule transition-colors hover:text-accent">Commander sur WhatsApp</a></li>
                <li><a href={siteConfig.liensFooter.cgv} className="link-rule transition-colors hover:text-accent">Conditions de vente</a></li>
                <li><a href={siteConfig.liensFooter.mentionsLegales} className="link-rule transition-colors hover:text-accent">Mentions légales</a></li>
                <li><a href={siteConfig.liensFooter.politiqueConfidentialite} className="link-rule transition-colors hover:text-accent">Confidentialité</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Barre légale */}
      <div>
        <div data-line aria-hidden="true" className="h-px w-full bg-border-decor" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <p className="hud-label text-secondary">
            © {new Date().getFullYear()} {nom} <span aria-hidden="true" className="mx-1 text-border-control">·</span> {siteConfig.ville} — {siteConfig.pays}
          </p>
          <button
            type="button"
            onClick={() => {
              const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
            }}
            className="inline-flex min-h-touch items-center gap-2 hud-label text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-control focus-visible:outline-offset-2"
          >
            Haut de page
            <ChevronIcon direction="up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
