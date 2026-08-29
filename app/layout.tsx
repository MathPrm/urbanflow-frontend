import type { Metadata } from "next";
import { Raleway, Lato, Poppins } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UrbanFlow Mobility",
  description: "Votre mobilité urbaine, simplifiée et durable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${raleway.variable} ${lato.variable} ${poppins.variable} font-poppins antialiased bg-page text-text-primary`}>

        {children}

        <BottomNav />
        
      </body>
    </html>
  );
}