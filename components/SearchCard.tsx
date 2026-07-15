"use client";

export default function SearchCard() {
  return (
    // Remplacement de shadow-lg par shadow-xl
    <div className="bg-page border-2 border-border-surface rounded-2xl p-5 shadow-xl flex flex-col gap-4 w-full">
      
      <h2 className="font-lato text-[20px] font-bold text-text-primary">
        Rechercher un itinéraire
      </h2>

      <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        
        <input
          type="text"
          placeholder="Départ | Choisir une destination ..."
          className="w-full border-2 border-border-default rounded-lg px-4 py-3 font-poppins text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-hover transition-colors"
        />

        <input
          type="text"
          placeholder="Arrivée | Choisir une destination ..."
          className="w-full border-2 border-border-default rounded-lg px-4 py-3 font-poppins text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-hover transition-colors"
        />

        <button
          type="submit"
          className="w-full bg-action-primary hover:bg-action-primary-hover text-text-secondary font-poppins font-medium rounded-lg px-4 py-3 mt-1 transition-colors"
        >
          Rechercher
        </button>
        
      </form>
    </div>
  );
}