"use client";

// On type de manière stricte les noms d'icônes disponibles dans ton projet
export type IconName = 
  | "plante-ecologie" 
  | "timer" 
  | "price" 
  | "trajet-pieton" 
  | "trajet-transports" 
  | "feuille-ecologie";

interface IconProps {
  name: IconName;
  className?: string; // Permet de surcharger la taille et la couleur (ex: w-6 h-6 bg-red-500)
}

export default function Icon({ name, className = "w-5 h-5 bg-current" }: IconProps) {
  return (
    <div
      className={className}
      style={{
        WebkitMask: `url('/icons/icon-${name}.svg') no-repeat center / contain`,
        mask: `url('/icons/icon-${name}.svg') no-repeat center / contain`,
      }}
      aria-hidden="true"
    />
  );
}