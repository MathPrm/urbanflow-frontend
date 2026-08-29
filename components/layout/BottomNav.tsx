import Image from "next/image";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-page border-t-2 border-border-surface px-6 py-4 flex justify-around items-center z-50">

      <button className="flex flex-col items-center transition-transform hover:scale-110">
        <Image
          src="/icons/icon-navbar-accueil.svg"
          alt="Accueil"
          width={32}
          height={32}
          className="w-8 h-auto"
        />
      </button>

      <button className="flex flex-col items-center transition-transform hover:scale-110">
        <Image
          src="/icons/icon-navbar-recherche.svg"
          alt="Recherche"
          width={32}
          height={32}
          className="w-8 h-auto"
        />
      </button>

      <button className="flex flex-col items-center transition-transform hover:scale-110">
        <Image
          src="/icons/icon-navbar-profil.svg"
          alt="Profil"
          width={32}
          height={32}
          className="w-8 h-auto"
        />
      </button>

    </nav>
  );
}