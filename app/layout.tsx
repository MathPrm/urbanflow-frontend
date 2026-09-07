import type { Metadata } from "next";
import { Raleway, Lato, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";

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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#01210A" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={`${raleway.variable} ${lato.variable} ${poppins.variable} font-poppins antialiased bg-page text-text-primary flex flex-col min-h-screen`}>
        
        <div className="md:fixed md:top-0 md:left-0 md:w-full md:bg-white md:border-b-2 md:border-border-surface md:z-50 md:flex md:items-center md:justify-between md:px-8 md:py-2.5">
          <Header />
          <BottomNav />
        </div>

        <main className="flex-1 md:pt-[76px] flex flex-col">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
} 