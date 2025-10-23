"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function InfoPage() {
  const stats = [
    { label: "STRENGTH", value: 10 },
    { label: "VITALITY", value: 10 },
    { label: "AGILITY", value: 10 },
    { label: "INTELLIGENCE", value: 10 },
    { label: "SENSE", value: 10 },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-2xl mx-auto bg-card border-2 border-primary/50 shadow-xl">
        {/* Header */}
        <div className="bg-primary/10 border-b-2 border-primary/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center bg-background">
              <span className="text-primary font-bold">i</span>
            </div>
            <h1 className="text-2xl font-bold tracking-[0.3em]">STATUS</h1>
          </div>
          <button className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-primary/30">
                <AvatarImage src="/placeholder-avatar.png" />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                  SJ
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="text-primary font-semibold">NAME:</span>
                  <span className="ml-2 text-foreground">SUNG JIN-WOO</span>
                </div>
                <div>
                  <span className="text-primary font-semibold">LEVEL:</span>
                  <span className="ml-2 text-foreground">1</span>
                </div>
                <div className="col-span-2">
                  <span className="text-primary font-semibold">JOB:</span>
                  <span className="ml-2 text-muted-foreground">NONE</span>
                </div>
                <div className="col-span-2">
                  <span className="text-primary font-semibold">TITLE:</span>
                  <span className="ml-2 text-muted-foreground">NONE</span>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">HP:</span>
                  <span className="text-xs font-mono">100</span>
                </div>
                <Progress value={100} className="h-2 bg-muted" />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-muted-foreground">MP:</span>
                  <span className="text-xs font-mono">10</span>
                </div>
                <Progress value={100} className="h-2 bg-muted" />
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Attributes */}
          <div className="space-y-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between p-3 border border-border rounded hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary">{stat.label}:</span>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={stat.value * 10} className="w-32 h-2" />
                  <span className="text-xs text-muted-foreground">►</span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-border" />

          {/* Remaining Points */}
          <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded">
            <span className="text-sm font-semibold tracking-wider">REMAINING POINTS:</span>
            <Badge variant="outline" className="text-lg font-bold border-primary text-primary px-4">
              3
            </Badge>
          </div>
        </div>

        {/* Footer Decorative Corners */}
        <div className="relative h-8">
          <div className="absolute top-0 left-0 w-12 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
          <div className="absolute top-0 right-0 w-12 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
        </div>
      </Card>
    </div>
  );
}
