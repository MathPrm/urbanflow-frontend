import Hero from "@/components/layout/Hero";
import SearchCard from "@/components/itinerary/SearchCard";
import InstallPWA from "@/components/pwa/InstallPWA";

export default function Home() {
  return (
    <main className="min-h-screen bg-page flex flex-col relative pb-24">
      <Hero />

      <div className="px-4 mt-6 flex flex-col md:max-w-5xl md:mx-auto md:w-full md:grid md:grid-cols-2 md:gap-6 md:items-start">
        <InstallPWA />
        <SearchCard />
      </div>
    </main>
  );
}