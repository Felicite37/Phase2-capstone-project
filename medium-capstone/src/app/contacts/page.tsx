"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const contacts = [
  { title: "Press & Partnerships", email: "press@publishhub.app" },
  { title: "Support", email: "support@publishhub.app" },
  { title: "Creator Success", email: "creators@publishhub.app" },
];

export default function ContactsPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 800);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <header className="text-center space-y-4">
        <p className="text-sm uppercase tracking-wide text-primary">Let&apos;s talk</p>
        <h1 className="text-4xl font-bold text-foreground">Contacts</h1>
        <p className="text-muted-foreground">
          Whether you&apos;re collaborating on a story or need help with your account, we&apos;re here.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {contacts.map((card) => (
          <div key={card.title} className="rounded-2xl border border-border p-5 bg-card">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              {card.title}
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground break-words">
              {card.email}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-border bg-card p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Send us a note</h2>
          <p className="text-muted-foreground">
            We usually reply within one business day.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Message sent" : "Send message"}
          </Button>
        </form>
      </section>
    </main>
  );
}


