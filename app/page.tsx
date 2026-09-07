import Hero from "@/components/layout/Hero";
import SearchCard from "@/components/itinerary/SearchCard";
import InstallPWA from "@/components/pwa/InstallPWA";

export default function Home() {
  return (
    <div className="flex-1 w-full bg-page flex flex-col relative pb-24 md:pb-0">
      <Hero />

      <div className="px-4 mt-6 flex flex-col md:flex-row md:justify-center md:items-start gap-6 w-full max-w-5xl mx-auto">

        <InstallPWA />

        <div className="w-full md:max-w-md">
          <SearchCard />
        </div>
        
      </div>
    </div>
  );
}