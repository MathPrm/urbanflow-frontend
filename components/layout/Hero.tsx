import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-surface-dark px-4 py-8 relative overflow-hidden flex items-center min-h-[160px]">

      <h1 className="font-raleway text-[24px] font-extrabold text-text-secondary leading-tight relative z-10">
        Votre mobilité<br />
        urbaine,<br />
        simplifiée et durable.
      </h1>

      <div className="absolute bottom-0 right-4 z-0 pointer-events-none">
        <Image
          src="/icons/icon-plante-ecologie.svg"
          alt=""
          width={110}
          height={110}
          className="w-auto h-auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}