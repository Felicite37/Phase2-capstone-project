"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { Editor } from "@/components/editor";
import { createPost } from "@/types/posts";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("You must be signed in to publish.");
      if (!draftContent.trim())
        throw new Error("Please write something first.");
      return createPost({
        title: title.trim(),
        content: draftContent.trim(),
        author: {
          id: user.id,
          name: user.name,
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Post published",
        description: "Your story is live in the feed.",
      });
      setTitle("");
      setDraftContent("");
    },
    onError: (error) => {
      toast({
        title: "Unable to publish",
        description:
          error instanceof Error ? error.message : "Try again shortly.",
      });
    },
  });

  const handleSave = (content: string) => {
    setDraftContent(content);
    toast({
      title: "Draft saved",
      description: "We saved the latest version of your draft locally.",
    });
  };

  const handlePublish = () => {
    publishMutation.mutate();
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
              disabled={
                publishMutation.isPending ||
                !title.trim() ||
                !draftContent.trim()
              }
            >
              {publishMutation.isPending ? "Publishing..." : "Publish"}
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
