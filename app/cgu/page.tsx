import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | UrbanFlow Mobility",
  description: "Conditions Générales d'Utilisation régissant la plateforme UrbanFlow Mobility.",
};

export default function CGUPage() {
  return (
    <main className="flex-1 w-full bg-page text-text-primary px-4 py-8 pb-28 md:pb-16 font-poppins">
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
            Conditions Générales d&apos;Utilisation (CGU)
          </h1>
          <p className="text-xs text-text-tertiary">
            En vigueur au 1er septembre 2026
          </p>
        </header>

        <div className="bg-white border-2 border-border-surface rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-8 text-sm leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              1. Champ d&apos;application
            </h2>
            <p className="text-text-primary/90">
              Les présentes Conditions Générales d&apos;Utilisation (dites &quot;CGU&quot;) ont pour objet de définir les conditions et modalités d&apos;accès et d&apos;utilisation de l&apos;application web progressive <strong>UrbanFlow Mobility</strong>. Ce projet a été développé dans un cadre académique pour l&apos;obtention du Titre 6 Concepteur Développeur de Solutions Digitales par Mathilde Primot. Toute utilisation de l&apos;application implique l&apos;acceptation pleine et entière des présentes conditions par l&apos;utilisateur.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              2. Accès aux services
            </h2>
            <p className="text-text-primary/90">
              Le service est accessible gratuitement à tout utilisateur disposant d&apos;un terminal connecté à Internet (smartphone, tablette, ordinateur) ou d&apos;une installation PWA sur son appareil. La création d&apos;un compte personnel est facultative pour la recherche d&apos;itinéraires mais requise pour l&apos;enregistrement et l&apos;analyse continue de l&apos;impact écologique personnel, notamment via le tableau de bord CO₂.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              3. Description des fonctionnalités
            </h2>
            <p className="text-text-primary/90">
              UrbanFlow Mobility fournit les fonctionnalités suivantes :
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-text-primary/90">
              <li>Calcul d&apos;itinéraires multimodaux combinant la marche et les transports en commun (métro, RER, bus).</li>
              <li>Filtre d&apos;accessibilité pour les Personnes à Mobilité Réduite (PMR) et usagers en fauteuil roulant.</li>
              <li>Affichage cartographique interactif des trajets.</li>
              <li>Évaluation des émissions de gaz à effet de serre (CO₂) évitées en comparaison avec un trajet équivalent effectué en voiture individuelle, et suivi sous forme de tableau de bord. L&apos;application intègre les données de transport GTFS et le calculateur carbone de l&apos;API PRIM.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              4. Responsabilité et exactitude des informations
            </h2>
            <p className="text-text-primary/90">
              L&apos;application a été conçue comme une démonstration technique (MVP). Les itinéraires, données de transport (GTFS) et calculs d&apos;émissions (API PRIM) sont utilisés à des fins d&apos;illustration et d&apos;évaluation académique. Malgré les efforts pour assurer une intégration fidèle de ces sources de données ouvertes, l&apos;éditrice (Mathilde Primot) ne saurait être tenue pour responsable d&apos;erreurs de calcul, de retards ou d&apos;inexactitudes.
            </p>
            <p className="text-text-primary/90">
              L&apos;utilisateur demeure seul responsable de sa propre sécurité et de sa vigilance lors de ses déplacements sur la voie publique.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              5. Engagements de l&apos;utilisateur
            </h2>
            <p className="text-text-primary/90">
              L&apos;utilisateur s&apos;engage à utiliser l&apos;application dans le respect de la législation en vigueur, à ne pas tenter de porter atteinte à l&apos;intégrité des systèmes informatiques et à fournir des informations exactes lors de la création de son compte voyageur.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              6. Propriété Intellectuelle
            </h2>
            <p className="text-text-primary/90">
              L&apos;ensemble des éléments constituant l&apos;application (code source React/Next.js, design Figma, logos, intégration des cartes Leaflet) est protégé par les lois sur la propriété intellectuelle. Toute reproduction, totale ou partielle, de cette application, à d&apos;autres fins que celles d&apos;évaluation académique sans l&apos;autorisation expresse de l&apos;éditrice est interdite.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              7. Modification des CGU
            </h2>
            <p className="text-text-primary/90">
              L&apos;éditrice se réserve le droit de modifier les présentes CGU à tout moment, afin de les adapter aux évolutions techniques ou réglementaires du projet.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              8. Droit applicable et juridiction compétente
            </h2>
            <p className="text-text-primary/90">
              Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera privilégiée avant toute action judiciaire.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}