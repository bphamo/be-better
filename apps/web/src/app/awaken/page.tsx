"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AwakenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 via-background to-accent/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Glowing effect */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary/30 animate-pulse" />
          <div className="relative space-y-4">
            {/* Logo/Symbol */}
            <div className="flex justify-center">
              <div className="w-16 h-16 border-2 border-primary rounded-lg flex items-center justify-center bg-primary/10">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-foreground tracking-wider">
              AWAKEN
            </h1>

            {/* Main Message */}
            <div className="space-y-6 pt-8">
              <h2 className="text-4xl font-bold text-foreground">
                YOUR<br />AWAKENING<br />BEGINS NOW!
              </h2>

              <p className="text-muted-foreground text-sm px-4">
                Walk your path. Take action. Conquer.<br />Become a legend!
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Button
                size="lg"
                className="w-full max-w-xs bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg h-14 rounded-full"
                onClick={() => router.push("/daily-quests")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
