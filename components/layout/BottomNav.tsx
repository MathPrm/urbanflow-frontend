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
  const isSearchActive = pathname.startsWith("/itinary/results");
  const isDashboardActive = pathname.startsWith("/dashboard");
  const isProfileActive = pathname.startsWith("/profile");

  const baseLinkClass = "flex flex-col items-center justify-center gap-1 w-[72px] h-[72px] rounded-xl transition-all";
  const activeLinkClass = "text-white font-bold bg-secondary-700 scale-105 shadow-sm";
  const inactiveLinkClass = "text-quinary-500 opacity-70 hover:text-secondary-700 hover:opacity-100 hover:scale-105";
  const activeImageClass = "opacity-100 brightness-0 invert";
  const inactiveImageClass = "opacity-70";

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-border-surface px-2 py-2 flex justify-around items-center z-50 shadow-lg font-poppins"
    >
      <Link
        href="/"
        aria-label="Accueil"
        aria-current={isHomeActive ? "page" : undefined}
        className={`${baseLinkClass} ${isHomeActive ? activeLinkClass : inactiveLinkClass}`}
      >
        <Image
          src="/icons/icon-navbar-accueil.svg"
          alt="Icône Accueil"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isHomeActive ? activeImageClass : inactiveImageClass
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Accueil</span>
      </Link>

      <Link
        href="/itinary/results"
        aria-label="Recherche d'itinéraire"
        aria-current={isSearchActive ? "page" : undefined}
        className={`${baseLinkClass} ${isSearchActive ? activeLinkClass : inactiveLinkClass}`}
      >
        <Image
          src="/icons/icon-navbar-recherche.svg"
          alt="Icône Recherche"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isSearchActive ? activeImageClass : inactiveImageClass
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Recherche</span>
      </Link>

      <Link
        href="/dashboard/co2"
        aria-label="Dashboard Impact CO2"
        aria-current={isDashboardActive ? "page" : undefined}
        className={`${baseLinkClass} ${isDashboardActive ? activeLinkClass : inactiveLinkClass}`}
      >
        <Image
          src="/icons/icon-feuille-ecologie.svg"
          alt="Icône Impact CO2"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isDashboardActive ? activeImageClass : inactiveImageClass
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Impact CO₂</span>
      </Link>

      <Link
        href="/profile"
        aria-label="Mon Profil"
        aria-current={isProfileActive ? "page" : undefined}
        className={`${baseLinkClass} ${isProfileActive ? activeLinkClass : inactiveLinkClass}`}
      >
        <Image
          src="/icons/icon-navbar-profil.svg"
          alt="Icône Profil"
          width={28}
          height={28}
          className={`w-7 h-auto transition-opacity ${
            isProfileActive ? activeImageClass : inactiveImageClass
          }`}
        />
        <span className="text-[11px] font-medium tracking-tight">Profil</span>
      </Link>
    </nav>
  );
}