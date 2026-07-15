import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-page px-4 pt-2 pb-4 flex items-center justify-start">
      <Image
        src="/icons/logo-urbanflow-mobility-wordmark.svg"
        alt="Logo UrbanFlow Mobility"
        width={261}
        height={61}
        priority
        className="h-auto w-auto max-w-[261px]" 
      />
    </header>
  );
}