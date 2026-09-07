import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-surface-dark text-quinary-200 font-poppins text-xs border-t border-secondary-600/30 px-6 pt-8 pb-24 md:pb-8 mt-auto w-full transition-colors"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <span className="font-lato font-bold text-white text-sm tracking-wide">
            UrbanFlow Mobility
          </span>
          <p className="text-quinary-200/70 text-[11px]">
            © {currentYear} UrbanFlow Mobility. Tous droits réservés.
          </p>
        </div>

        <nav
          aria-label="Informations légales et conformité"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center"
        >
          <Link
            href="/mentions-legales"
            className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-secondary-300 rounded"
          >
            Mentions Légales
          </Link>
          <Link
            href="/confidentialite"
            className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-secondary-300 rounded"
          >
            Politique de Confidentialité (RGPD)
          </Link>
          <Link
            href="/cgu"
            className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-secondary-300 rounded"
          >
            CGU
          </Link>
          <a
            href="mailto:contact@urbanflow-mobility.fr"
            className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-secondary-300 rounded"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
