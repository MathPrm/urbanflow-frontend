"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as unknown as { standalone?: boolean }).standalone === true;

      if (isStandalone) return;

      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-border-surface rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span className="material-symbols-outlined text-action-primary text-2xl" aria-hidden="true">
          install_mobile
        </span>
        <h2 className="font-lato font-bold text-text-primary text-lg">
          Installez UrbanFlow Mobility
        </h2>
      </div>

      <p className="font-poppins text-sm text-text-tertiary leading-relaxed">
        Profitez d&apos;une expérience fluide, rapide et accessible même hors-ligne sur votre appareil.
      </p>

      <button
        type="button"
        onClick={handleInstallClick}
        className="w-full mt-1 bg-action-primary hover:bg-action-primary-hover active:scale-[0.98] text-white font-poppins font-medium rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
      >
        <span className="material-symbols-outlined text-[20px] leading-none" aria-hidden="true">
          download
        </span>
        <span>Installer l&apos;application</span>
      </button>
    </div>
  );
}
