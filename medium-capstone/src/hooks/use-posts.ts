import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, fetchPosts, toggleLike } from "@/types/posts";
import { Comment, Post } from "@/types/post";
import { useAuth } from "./use-auth";

const POSTS_QUERY_KEY = ["posts"];

export function usePosts() {
  return useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error("You must be signed in to like posts.");
      return toggleLike(postId, user.id);
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (prev) => {
        if (!prev) return prev;
        return prev.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      if (!user) throw new Error("You must be signed in to comment.");
      const comment: Omit<Comment, "id" | "createdAt"> = {
        postId,
        content,
        author: {
          id: user.id,
          name: user.name,
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        },
      };
      return addComment(postId, comment);
    },
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (prev) => {
        if (!prev) return prev;
        return prev.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
    },
  });
}
