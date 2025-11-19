"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { usePosts, useToggleLike, useAddComment } from "@/hooks/use-posts";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function PostsPage() {
  const { user } = useAuth();
  const { data: posts = [], isLoading, isError } = usePosts();
  const toggleLike = useToggleLike();
  const addComment = useAddComment();
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const { toast } = useToast();

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
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-wide text-primary">
          Community stories
        </p>
        <h1 className="text-4xl font-bold text-foreground">Latest Posts</h1>
        <p className="text-muted-foreground">
          Dive into the freshest writing from creators across PublishHub.
        </p>
      </header>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="h-24 rounded-xl border border-border bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
          We couldn&apos;t load posts right now. Please refresh.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-8">
          {posts.map((post) => {
            const isLiked = user ? post.likedBy.includes(user.id) : false;
            return (
              <article
                key={post.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{post.author.name}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>

                <div className="mt-4 space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 uppercase tracking-wide"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      disabled={toggleLike.isPending}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Heart
                        size={18}
                        className={isLiked ? "fill-red-500 text-red-500" : ""}
                      />
                      {post.likes} likes
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {post.comments.length} comments
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/write?draftFrom=${post.id}`}>Remix story</Link>
                  </Button>
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <p className="font-semibold text-card-foreground">
                      Comments ({post.comments.length})
                    </p>
                    {!user && <p className="text-xs">Sign in to participate</p>}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
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
    </main>
  );
}


