"use client";

import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 bg-muted rounded-full"></div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">Your Name</h1>
              <p className="text-muted-foreground">@username</p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Bio</h2>
            <p className="text-muted-foreground">
              Add a bio to tell other writers about yourself.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Your Articles
            </h2>
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">
                No articles published yet. Start writing today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
