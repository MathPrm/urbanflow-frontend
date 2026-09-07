import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité (RGPD) | UrbanFlow Mobility",
  description: "Politique de protection des données personnelles et respect de la vie privée d'UrbanFlow Mobility.",
};

export default function ConfidentialitePage() {
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
            Politique de Confidentialité (RGPD)
          </h1>
          <p className="text-xs text-text-tertiary">
            Conformité au Règlement Général sur la Protection des Données (UE 2016/679) et à la loi Informatique et Libertés
          </p>
        </header>

        <div className="bg-white border-2 border-border-surface rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-8 text-sm leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              1. Responsable du traitement
            </h2>
            <p className="text-text-primary/90">
              Le responsable du traitement des données à caractère personnel collectées sur l&apos;application UrbanFlow Mobility est la société UrbanFlow Mobility SAS, joignable par courrier électronique à l&apos;adresse : <strong>dpo@urbanflow-mobility.fr</strong>.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              2. Données collectées et finalités
            </h2>
            <div className="flex flex-col gap-3 text-text-primary/90">
              <p>
                Dans le cadre de la fourniture de nos services de mobilité, nous pouvons collecter les catégories de données suivantes :
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>
                  <strong>Données de compte :</strong> Adresse électronique, prénom et mot de passe chiffré lors de l&apos;inscription ou de la connexion.
                </li>
                <li>
                  <strong>Données de géolocalisation ponctuelle :</strong> Les coordonnées GPS émises par le navigateur de l&apos;usager uniquement s&apos;il active expressément la détection de sa position de départ. Cette information n&apos;est utilisée que pour la requête immédiate et n&apos;est pas stockée de manière persistante sur nos serveurs.
                </li>
                <li>
                  <strong>Données d&apos;impact écologique et trajets enregistrés :</strong> Modes de transport empruntés, kilomètres parcourus et estimations d&apos;émissions de CO₂ évitées, dans l&apos;unique but de restituer votre tableau de bord personnel.
                </li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              3. Bases légales des traitements
            </h2>
            <p className="text-text-primary/90">
              Les traitements de données reposent sur :
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 text-text-primary/90">
              <li><strong>L&apos;exécution contractuelle (art. 6.1.b du RGPD) :</strong> Fourniture du calcul d&apos;itinéraire, affichage des correspondances et maintien de votre profil utilisateur.</li>
              <li><strong>Le consentement explicite (art. 6.1.a du RGPD) :</strong> Autorisation d&apos;accès au capteur de géolocalisation de votre appareil.</li>
              <li><strong>L&apos;intérêt légitime (art. 6.1.f du RGPD) :</strong> Sécurisation des accès et prévention des abus ou attaques techniques.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              4. Durée de conservation
            </h2>
            <p className="text-text-primary/90">
              Les données de compte et d&apos;historique écologique sont conservées pendant toute la durée d&apos;activité du compte. En cas d&apos;inactivité continue de 24 mois ou dès réception d&apos;une demande de suppression de compte, l&apos;ensemble des données nominatives est définitivement purgé sous un délai maximal de 30 jours.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              5. Droits des utilisateurs (CNIL)
            </h2>
            <p className="text-text-primary/90">
              Conformément à la réglementation européenne et française, vous disposez des droits suivants sur vos données :
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 text-text-primary/90">
              <li>Droit d&apos;accès et de communication</li>
              <li>Droit de rectification et de mise à jour</li>
              <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d&apos;opposition</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p className="text-text-primary/90 mt-2">
              Pour exercer ces droits, adressez votre demande à <strong>dpo@urbanflow-mobility.fr</strong>. Vous disposez également du droit d&apos;introduire une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) sur <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-action-primary underline">cnil.fr</a>.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-lato font-bold text-lg text-text-primary">
              6. Cookies et stockage local
            </h2>
            <p className="text-text-primary/90">
              UrbanFlow Mobility n&apos;utilise <strong>aucun traceur publicitaire ni cookie tiers intrusif</strong>. L&apos;application utilise uniquement le stockage local de votre navigateur (<code>localStorage</code>) strictement indispensable au maintien de votre session connectée et au fonctionnement hors-ligne de la PWA.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
