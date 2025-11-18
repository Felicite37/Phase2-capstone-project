"use client";

import { Button } from "@/components/ui/button";

export default function WritePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">New Article</h1>
            <Button className="bg-primary hover:bg-primary/90">Publish</Button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Article title..."
              className="w-full text-4xl font-bold bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />

            <textarea
              placeholder="Tell your story..."
              className="w-full min-h-96 p-4 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
