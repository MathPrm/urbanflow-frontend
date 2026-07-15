import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchCard from "@/components/SearchCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-page flex flex-col relative pb-24">
      <Header />
      <Hero />
      <div className="px-4 mt-6 flex flex-col gap-6">
        <SearchCard />
        
        {/* Le futur composant "Mes trajets récents" viendra ici */}
      </div>
    </main>
  );
}