import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import SearchCard from "@/components/itinerary/SearchCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-page flex flex-col relative pb-24">
      <Header />
      <Hero />
      <div className="px-4 mt-6 flex flex-col gap-6">
        <SearchCard />

      </div>
    </main>
  );
}