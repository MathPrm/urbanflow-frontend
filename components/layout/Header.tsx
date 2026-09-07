import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-page px-4 pt-2 pb-4 flex items-center justify-start md:hidden">
      <Link href="/" aria-label="UrbanFlow Mobility - Retour à l'accueil" className="inline-block transition-opacity hover:opacity-90">
        <Image
          src="/icons/logo-urbanflow-mobility-wordmark.svg"
          alt="Logo UrbanFlow Mobility"
          width={261}
          height={61}
          priority
          className="h-auto w-auto max-w-[261px]"
        />
      </Link>
    </header>
  );
}