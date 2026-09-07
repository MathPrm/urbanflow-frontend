import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales | UrbanFlow Mobility",
  description: "Mentions légales et informations éditoriales de la plateforme UrbanFlow Mobility.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-page text-text-primary px-4 py-8 pb-28 md:pb-16 font-poppins">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-text-tertiary hover:text-text-primary transition-colors w-fit focus:outline-none focus:ring-1 focus:ring-secondary-500 rounded"
        >
          <span aria-hidden="true">←</span>
          <span>Retour à l&apos;accueil</span>
        </Link>

        <header className="flex flex-col gap-2">
          <h1 className="font-lato font-bold text-2xl sm:text-3xl text-text-primary">
            Mentions Légales
          </h1>
          <p className="text-xs text-text-tertiary">
            Dernière mise à jour : Septembre 2026
          </p>
        </header>

        <div className="bg-white border-2 border-border-surface rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-8 text-sm leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              1. Éditeur de l&apos;application
            </h2>
            <p className="text-text-primary/90">
              L&apos;application web progressive (PWA) <strong>UrbanFlow Mobility</strong> est éditée par la société UrbanFlow Mobility SAS, société par actions simplifiée au capital de 10 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro B 987 654 321.
            </p>
            <p className="text-text-primary/90">
              <strong>Siège social :</strong> 12 rue de la Mobilité Durable, 75011 Paris, France.<br />
              <strong>Courrier électronique :</strong> contact@urbanflow-mobility.fr<br />
              <strong>Numéro de TVA intracommunautaire :</strong> FR 12 987654321
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              2. Direction de la publication
            </h2>
            <p className="text-text-primary/90">
              Le directeur de la publication est le représentant légal de la société UrbanFlow Mobility SAS en sa qualité de Président.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              3. Hébergement
            </h2>
            <p className="text-text-primary/90">
              L&apos;application et ses bases de données associées sont hébergées sur des infrastructures cloud situées au sein de l&apos;Union Européenne (France / Allemagne), respectant l&apos;ensemble des exigences techniques et organisationnelles du RGPD.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              4. Objet du service
            </h2>
            <p className="text-text-primary/90">
              UrbanFlow Mobility met à disposition des usagers une solution numérique d&apos;information voyageur multimodale facilitant les déplacements urbains écoresponsables (marche à pied, vélo, transports collectifs, accessibilité PMR) et l&apos;évaluation comparative des émissions de gaz à effet de serre (CO₂).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              5. Propriété intellectuelle
            </h2>
            <p className="text-text-primary/90">
              L&apos;ensemble des éléments composant l&apos;interface (marques, logos, graphismes, icônes, textes, codes sources) sont la propriété exclusive d&apos;UrbanFlow Mobility SAS ou font l&apos;objet d&apos;une licence d&apos;exploitation concédée. Toute reproduction, représentation, modification ou diffusion totale ou partielle sans autorisation expresse préalable est prohibée conformément au Code de la propriété intellectuelle.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              6. Données cartographiques et sources ouvertes
            </h2>
            <p className="text-text-primary/90">
              Les données géographiques et fonds cartographiques reposent sur les projets ouverts OpenStreetMap et CartoDB, mis à disposition selon la licence Open Database License (ODbL). Les flux d&apos;horaires et de réseaux sont consolidés à partir des API publiques ouvertes (ex: Navitia, Île-de-France Mobilités).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
