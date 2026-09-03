"use client";

import dynamic from "next/dynamic";
import { Journey } from "../itinerary/JourneyCard";

const LiveMap = dynamic(() => import("./LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-page text-text-tertiary font-medium text-sm">
      Initialisation de la carte...
    </div>
  )
});

interface LiveMapWrapperProps {
  lat: number;
  lon: number;
  journey?: Journey | null;
}

export default function LiveMapWrapper(props: LiveMapWrapperProps) {
  return <LiveMap {...props} />;
}