"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAddComment, usePosts, useToggleLike } from "@/hooks/use-posts";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: posts = [], isLoading, isError } = usePosts();
  const toggleLike = useToggleLike();
  const addComment = useAddComment();
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const sortedPosts = useMemo(
    () => posts.slice().sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    [posts]
  );

  const handleLike = (postId: string) => {
    toggleLike.mutate(postId, {
      onError: (error) => {
        toast({
          title: "Unable to update like",
          description:
            error instanceof Error ? error.message : "Please try again in a moment.",
        });
      },
    });
  };

  const handleShare = async (postId: string, title: string) => {
    if (typeof window === "undefined") return;
    const fallbackUrl = `${window.location.origin}/posts/${postId}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url: fallbackUrl });
      } else {
        await window.navigator.clipboard.writeText(fallbackUrl);
        toast({
          title: "Link copied",
          description: "Post URL copied to your clipboard.",
        });
      }
    } catch {
      toast({
        title: "Share cancelled",
        description: "We could not share the post right now.",
      });
    }
  };

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;
    addComment.mutate(
      { postId, content },
      {
        onSuccess: () => {
          setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
          toast({
            title: "Comment added",
            description: "Your comment has been added to the conversation.",
          });
        },
        onError: (error) => {
          toast({
            title: "Unable to add comment",
            description:
              error instanceof Error ? error.message : "Please try again later.",
          });
        },
      }
    );
  };

  return (
    <main>
      <section className="min-h-[60vh] bg-linear-to-b from-primary/5 to-background flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm uppercase tracking-wide text-primary">
            Publishing Platform
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Share Your Stories with the World
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Join thousands of writers sharing their insights, experiences, and ideas.
            Start publishing today.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link href="/signup">Start Writing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">Explore Stories</Link>
            </Button>
          </div>
        </div>
      </section>

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

          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 rounded-lg border border-border bg-muted animate-pulse"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
              We couldn&apos;t load posts right now. Please refresh.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => {
                const isLiked = user ? post.likedBy.includes(user.id) : false;
                return (
                  <article
                    key={post.id}
                    className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full bg-muted bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.author.avatar})` }}
                        aria-hidden
                      />
                      <div>
                        <p className="font-semibold text-card-foreground">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString()} ·{" "}
                          {post.readTime} min read
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-card-foreground line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <button
                        className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
                        onClick={() => handleLike(post.id)}
                        disabled={toggleLike.isPending}
                      >
                        <Heart
                          size={16}
                          className={isLiked ? "fill-red-500 text-red-500" : ""}
                        />
                        <span>{post.likes}</span>
                      </button>
                      <div className="flex-1 text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <MessageCircle size={16} />
                        <span>{post.comments.length}</span>
                      </div>
                      <button
                        className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
                        onClick={() => handleShare(post.id, post.title)}
                      >
                        <Share2 size={16} />
                        <span className="hidden sm:inline">Share</span>
                      </button>
                    </div>

                    <div className="space-y-3 rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p className="font-semibold text-card-foreground">
                          Comments ({post.comments.length})
                        </p>
                        {!user && <p className="text-xs">Sign in to participate</p>}
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {post.comments.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            Be the first to comment.
                          </p>
                        )}
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="text-sm">
                            <p className="font-semibold text-card-foreground">
                              {comment.author.name}
                            </p>
                            <p className="text-muted-foreground">{comment.content}</p>
                            <p className="text-[11px] text-muted-foreground">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={commentInputs[post.id] ?? ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          placeholder={
                            user ? "Share your thoughts..." : "Sign in to comment"
                          }
                          className="w-full resize-none rounded-md border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                          disabled={!user || addComment.isPending}
                        />
                        <Button
                          size="sm"
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => handleAddComment(post.id)}
                          disabled={
                            !user || addComment.isPending || !commentInputs[post.id]
                          }
                        >
                          {addComment.isPending ? "Posting..." : "Post comment"}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

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
    </main>
  );
}

