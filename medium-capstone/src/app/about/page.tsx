"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About PublishHub
            </h1>
            <p className="text-lg text-muted-foreground">
              A modern platform for sharing ideas and connecting with readers.
            </p>
          </div>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">
                We believe everyone has a story worth sharing. PublishHub
                provides writers and thinkers with a platform to reach an
                audience, build their voice, and connect with others who share
                their interests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-2">Why PublishHub?</h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Simple, intuitive writing tools</li>
                <li>Discover great content from diverse writers</li>
                <li>Build your reader community</li>
                <li>Focus on your craft, not the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
              <p className="text-muted-foreground">
                Creating an account is free and takes less than a minute. Start
                sharing your stories today.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
