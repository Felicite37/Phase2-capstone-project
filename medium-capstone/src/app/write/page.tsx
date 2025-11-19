"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { Editor } from "@/components/editor";

export default function WritePage() {
  const [title, setTitle] = useState("");

  const handleSave = (content: string) => {
    // This is where you would call your API to save a draft
    // For now we just log it so the flow is visible.
    console.log("Draft saved:", { title, content });
  };

  const handlePublish = () => {
    // This is where you would call your API to publish the post
    console.log("Publish requested for:", title);
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title..."
              className="flex-1 text-4xl font-bold bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handlePublish}
              disabled={!title.trim()}
            >
              Publish
            </Button>
          </div>

          <div className="border border-border rounded-lg overflow-hidden min-h-[500px]">
            <Editor onSave={handleSave} />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
