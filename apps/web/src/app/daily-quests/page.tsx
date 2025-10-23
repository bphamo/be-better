"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Info, Home, Calendar, User, Bell } from "lucide-react";

type Quest = {
  id: string;
  name: string;
  type: "Daily Quest" | "Weekly Quest";
  current: number;
  target: number;
  unit?: string;
  completed: boolean;
};

export default function DailyQuestsPage() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [quests, setQuests] = useState<Quest[]>([
    { id: "1", name: "Strange Training", type: "Daily Quest", current: 4, target: 4, unit: "tasks", completed: false },
    { id: "2", name: "Sit-ups", type: "Daily Quest", current: 50, target: 100, completed: false },
    { id: "3", name: "Squats", type: "Daily Quest", current: 50, target: 100, completed: false },
    { id: "4", name: "Running", type: "Daily Quest", current: 6, target: 5, unit: "km", completed: false },
    { id: "5", name: "Push-ups", type: "Daily Quest", current: 100, target: 100, completed: true },
    { id: "6", name: "Diamond Push-ups", type: "Daily Quest", current: 100, target: 100, completed: true },
  ]);

  const planQuests = quests.filter(q => !q.completed && q.id !== "1");
  const completedQuests = quests.filter(q => q.completed);

  const toggleQuestTask = (taskIndex: number) => {
    if (!selectedQuest) return;
    setQuests(quests.map(q => 
      q.id === selectedQuest.id 
        ? { ...q, current: q.current === q.target ? q.current - 1 : q.current + 1 }
        : q
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wider">DAILY QUESTS</h1>
          <div className="w-8 h-8 border border-primary rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Strange Training Card */}
        <Card className="bg-primary/10 border-primary/30 p-4" onClick={() => setSelectedQuest(quests[0])}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Strange Training</p>
              <p className="text-xs text-muted-foreground">4 Tasks</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </div>
        </Card>

        {/* Plan Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground">PLAN</h2>
          {planQuests.map(quest => (
            <Card 
              key={quest.id}
              className="bg-card/50 border-border p-4 cursor-pointer hover:bg-card"
              onClick={() => setSelectedQuest(quest)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{quest.name}</p>
                  <p className="text-xs text-muted-foreground">{quest.type}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  [{quest.current} / {quest.target}]
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Completed Section */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground">COMPLETED</h2>
          {completedQuests.map(quest => (
            <Card 
              key={quest.id}
              className="bg-card/50 border-border p-4 opacity-60"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium line-through">{quest.name}</p>
                  <p className="text-xs text-muted-foreground">{quest.type}</p>
                </div>
                <Badge variant="outline" className="text-xs text-primary">
                  [{quest.current} / {quest.target}]
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quest Info Dialog */}
      <Dialog open={!!selectedQuest} onOpenChange={() => setSelectedQuest(null)}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-card border-2 border-primary/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <Info className="w-5 h-5 text-primary" />
              <span className="tracking-wider">QUEST INFO</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedQuest && (
            <div className="space-y-6 pt-4">
              <div className="text-center">
                <p className="text-sm text-primary mb-2">
                  [Daily Quest: {selectedQuest.name} has Arrived.]
                </p>
                <h3 className="text-2xl font-bold text-primary tracking-wider mb-4">GOAL</h3>
              </div>

              <div className="space-y-2">
                {Array.from({ length: selectedQuest.target / (selectedQuest.unit === "km" ? 1 : selectedQuest.target === 4 ? 1 : 10) }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={i < selectedQuest.current / (selectedQuest.unit === "km" ? 1 : selectedQuest.target === 4 ? 1 : 10)}
                        onCheckedChange={() => toggleQuestTask(i)}
                      />
                      <span className="text-sm">
                        {selectedQuest.id === "1" 
                          ? ["Push-ups", "Sit-ups", "Squats", "Running"][i]
                          : `[INCOMPLETE] ${selectedQuest.name}`
                        }
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {selectedQuest.unit === "km" ? `[${i}/${selectedQuest.target}${selectedQuest.unit}]` : `[0/100]`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-center">
                <p className="text-xs text-destructive font-semibold">
                  WARNING! - FAILURE TO COMPLETE THIS DAILY QUEST WILL BRING A PUNISHMENT ASSOCIATED WITH THIS QUEST.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around p-2">
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
            <Home className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
            <Calendar className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2 text-primary">
            <Calendar className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 h-auto py-2">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
