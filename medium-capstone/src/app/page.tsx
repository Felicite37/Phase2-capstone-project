"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  reads: number;
  likes: number;
  category: string;
}

const featuredArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    excerpt:
      "Exploring the latest trends and technologies shaping the web development landscape in 2025.",
    author: "Sarah Chen",
    date: "Nov 15, 2025",
    reads: 2400,
    likes: 320,
    category: "Technology",
  },
  {
    id: "2",
    title: "Building Better User Experiences",
    excerpt:
      "A deep dive into UX principles that make applications both beautiful and functional.",
    author: "Marcus Williams",
    date: "Nov 14, 2025",
    reads: 1800,
    likes: 245,
    category: "Design",
  },
  {
    id: "3",
    title: "Scaling Your Startup: Lessons Learned",
    excerpt:
      "Real-world advice from founders who scaled their startups from zero to millions in revenue.",
    author: "Alex Rivera",
    date: "Nov 13, 2025",
    reads: 3100,
    likes: 420,
    category: "Business",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Share Your Stories with the World
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Join thousands of writers sharing their insights, experiences, and
            ideas. Start publishing today.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <Link href="/signup">Start Writing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">Explore Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Stories
            </h2>
            <p className="text-muted-foreground">
              Discover great reads from our community
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-lg text-card-foreground line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 bg-accent/10 text-accent rounded-full whitespace-nowrap">
                      {article.category}
                    </span>
                  </div>

                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-card-foreground">
                      {article.author}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                    <span className="flex items-center gap-1">
                      {article.reads} reads
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={16} />
                      {article.likes}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
                      <Heart size={16} />
                      <span className="hidden sm:inline">Like</span>
                    </button>
                    <button className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
                      <MessageCircle size={16} />
                      <span className="hidden sm:inline">Comment</span>
                    </button>
                    <button className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1">
                      <Share2 size={16} />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to share your story?
          </h2>
          <p className="text-lg opacity-90">
            Join our community of writers and start publishing today.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-6">
            <Link href="/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-foreground mb-4">PublishHub</h3>
              <p className="text-sm text-muted-foreground">
                A platform for sharing ideas and stories with the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-foreground transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
            <p>&copy; 2025 PublishHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
