"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();

  // Masquer la navigation si l'utilisateur est sur l'écran de guidage en direct
  if (pathname === "/itinary/live") {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isDashboardActive = pathname.startsWith("/dashboard");
  const isProfileActive = pathname.startsWith("/profile");

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-border-surface px-4 py-2 flex justify-around items-center z-50 shadow-lg font-poppins"
    >
      <Link
        href="/"
        aria-label="Accueil"
        aria-current={isHomeActive ? "page" : undefined}
        className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all ${
          isHomeActive
            ? "text-secondary-700 font-bold bg-secondary-100/60 scale-105"
            : "text-quinary-500 opacity-70 hover:text-secondary-700 hover:opacity-100 hover:scale-105"
        }`}
      >
        <Image
          src="/icons/icon-navbar-accueil.svg"
          alt="Icône Accueil"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isHomeActive ? "opacity-100" : "opacity-70"
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Accueil</span>
      </Link>

      <Link
        href="/"
        aria-label="Recherche d'itinéraire"
        className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl text-quinary-500 opacity-70 hover:text-secondary-700 hover:opacity-100 hover:scale-105 transition-all"
      >
        <Image
          src="/icons/icon-navbar-recherche.svg"
          alt="Icône Recherche"
          width={28}
          height={28}
          className="w-7 h-auto opacity-70"
        />
        <span className="text-[11px] font-medium tracking-tight">Recherche</span>
      </Link>

      <Link
        href="/dashboard/co2"
        aria-label="Dashboard Impact CO2"
        aria-current={isDashboardActive ? "page" : undefined}
        className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all ${
          isDashboardActive
            ? "text-secondary-700 font-bold bg-secondary-100/60 scale-105"
            : "text-quinary-500 opacity-70 hover:text-secondary-700 hover:opacity-100 hover:scale-105"
        }`}
      >
        <Image
          src="/icons/icon-feuille-ecologie.svg"
          alt="Icône Impact CO2"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isDashboardActive ? "opacity-100" : "opacity-70"
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Impact CO₂</span>
      </Link>

      <Link
        href="/profile"
        aria-label="Mon Profil"
        aria-current={isProfileActive ? "page" : undefined}
        className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all ${
          isProfileActive
            ? "text-secondary-700 font-bold bg-secondary-100/60 scale-105"
            : "text-quinary-500 opacity-70 hover:text-secondary-700 hover:opacity-100 hover:scale-105"
        }`}
      >
        <Image
          src="/icons/icon-navbar-profil.svg"
          alt="Icône Profil"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isProfileActive ? "opacity-100" : "opacity-70"
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Profil</span>
      </Link>
    </nav>
  );
}