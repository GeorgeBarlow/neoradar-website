// src/app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AirspaceDisplay } from "@/components/airspace/AirspaceDisplay";
import { PageTitle } from "@/components/ui/page-title";
import { LandingButton } from "@/components/ui/landing-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Default version information that can be used as fallback

export default function Home() {
  const [version, setVersion] = useState<string | undefined>();

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        // Using our own API endpoint to avoid CORS issues
        const response = await fetch("/api/version");

        if (!response.ok) {
          console.error("Failed to fetch version info:", response.status, response.statusText);
          return; // Keep using the default version
        }

        const data = await response.json();

        if (data.version) {
          setVersion(data.version);
        }
      } catch (error) {
        console.error("Error fetching version:", error);
        // Keep using the default version
      }
    };

    fetchVersion();
  }, []);

  const VersionDisplay = ({ version }: { version?: string }) => {
    if (!version) {
      return null; // Return nothing if version is null
    }

    // Remove any "v" prefix if it exists and add it back consistently
    const formattedVersion = version.replace(/^v/i, "");

    return (
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="font-sans text-xs text-foreground/60">v{formattedVersion}</span>
      </div>
    );
  };

  return (
    <div className=" relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-blue-100 dark:bg-black">
      <div className="absolute inset-0">
        <AirspaceDisplay />
      </div>
      <ThemeToggle />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <PageTitle description="A next generation VATSIM ATC Client for macOS, Linux and Windows." />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <div className="flex flex-row items-center gap-3 sm:gap-4">
              <LandingButton onClick={() => (window.location.href = "https://docs.neoradar.app")}>
                <span className="opacity-90 hover:opacity-100 transition-opacity">Docs</span>
              </LandingButton>
            </div>
          </div>
        </motion.div>
      </div>
      <VersionDisplay version={version} />
    </div>
  );
}
