"use client";

interface Co2BadgeProps {
  amount: number;
}

export default function Co2Badge({ amount }: Co2BadgeProps) {
  // Définition des paliers de pollution
  const isEco = amount <= 100;
  const isModerate = amount > 100 && amount <= 500;
  
  // Variables pour stocker les classes
  let badgeClasses = "";

  if (isEco) {
    badgeClasses = "bg-badge-eco-bg text-badge-eco-text";
  } else if (isModerate) {
    badgeClasses = "bg-badge-moderate-bg text-badge-moderate-text";
  } else {
    badgeClasses = "bg-badge-alert-bg text-badge-alert-text";
  }

  return (
    <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm ${badgeClasses}`}>
      
      {/* Icône de feuille utilisant la technique du masque CSS */}
      <div 
        className="w-3.5 h-3.5 bg-current" 
        style={{
          WebkitMask: "url('/icons/icon-feuille-ecologie.svg') no-repeat center / contain",
          mask: "url('/icons/icon-feuille-ecologie.svg') no-repeat center / contain"
        }}
        aria-hidden="true"
      />

      <span className="text-xs font-bold font-lato">
        {amount} g
      </span>
    </div>
  );
}