import { Metadata } from "next";
import CO2Dashboard from "@/components/dashboard/CO2Dashboard";

export const metadata: Metadata = {
  title: "Dashboard Impact CO₂ | UrbanFlow Mobility",
  description:
    "Suivez vos économies d'émissions de carbone et visualisez votre impact écologique urbain.",
};

export default function DashboardCO2Page() {
  return <CO2Dashboard />;
}
