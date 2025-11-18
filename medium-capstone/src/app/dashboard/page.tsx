"use client";

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Manage your articles and account.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-muted-foreground text-sm font-medium">
                Total Articles
              </h3>
              <p className="text-3xl font-bold text-foreground mt-2">0</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-muted-foreground text-sm font-medium">
                Total Reads
              </h3>
              <p className="text-3xl font-bold text-foreground mt-2">0</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-muted-foreground text-sm font-medium">
                Total Likes
              </h3>
              <p className="text-3xl font-bold text-foreground mt-2">0</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
