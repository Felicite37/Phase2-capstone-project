import { Author, Comment, CreatePostInput, Post } from "@/types/post";

let posts: Post[] = [
  {
    id: "post-1",
    title: "Designing for Focus in a World Full of Distractions",
    excerpt:
      "Techniques and mindsets to stay in flow while building modern web apps.",
    content:
      "## Designing for Focus\n\nBuilding products in 2025 means juggling constant notifications...\n\n- Choose intent\n- Design your day\n- Protect deep work\n\n> Productivity is less about apps and more about systems.\n",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    tags: ["Productivity", "Design"],
    author: {
      id: "author-1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      bio: "Product designer exploring mindful tech.",
    },
    publishedAt: "2025-11-15T09:00:00Z",
    readTime: 7,
    likes: 24,
    likedBy: ["author-2"],
    comments: [
      {
        id: "comment-1",
        postId: "post-1",
        author: {
          id: "author-2",
          name: "Marcus Williams",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        },
        content: "Loved the idea about designing a focus dashboard!",
        createdAt: "2025-11-16T10:00:00Z",
      },
    ],
  },
  {
    id: "post-2",
    title: "What React 19 Unlocks for Product Teams",
    excerpt:
      "React is shipping ergonomics improvements that change how we design data flows.",
    content:
      "React 19 is more than compiler hints. It forces teams to rethink ...",
    coverImage: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    tags: ["React", "Engineering"],
    author: {
      id: "author-2",
      name: "Marcus Williams",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      bio: "Engineering manager @ BuildLabs",
    },
    publishedAt: "2025-11-14T09:00:00Z",
    readTime: 6,
    likes: 12,
    likedBy: [],
    comments: [],
  },
];

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export async function fetchPosts(): Promise<Post[]> {
  await delay();
  return clone(posts);
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  await delay();
  return clone(posts.find((post) => post.id === id));
}

export async function createPost(
  input: CreatePostInput & { author: Author }
): Promise<Post> {
  await delay();
  const newPost: Post = {
    id: `post-${posts.length + 1}`,
    title: input.title,
    content: input.content,
    excerpt:
      input.excerpt ?? input.content.slice(0, 140).trim().concat("..."),
    coverImage: input.coverImage,
    tags: input.tags ?? [],
    author: input.author,
    publishedAt: new Date().toISOString(),
    readTime: Math.max(3, Math.round(input.content.split(" ").length / 200)),
    likes: 0,
    likedBy: [],
    comments: [],
  };
  posts = [newPost, ...posts];
  return clone(newPost);
}

export async function toggleLike(postId: string, userId: string): Promise<Post> {
  await delay(250);
  posts = posts.map((post) => {
    if (post.id !== postId) return post;

    const liked = post.likedBy.includes(userId);
    const likedBy = liked
      ? post.likedBy.filter((id) => id !== userId)
      : [...post.likedBy, userId];

    return {
      ...post,
      likedBy,
      likes: likedBy.length,
    };
  });

  const updated = posts.find((post) => post.id === postId);
  if (!updated) {
    throw new Error("Post not found");
  }
  return clone(updated);
}

export async function addComment(
  postId: string,
  comment: Omit<Comment, "id" | "createdAt">
): Promise<Post> {
  await delay(300);
  const newComment: Comment = {
    ...comment,
    id: `comment-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  posts = posts.map((post) => {
    if (post.id !== postId) return post;

    return {
      ...post,
      comments: [...post.comments, newComment],
    };
  });

  const updated = posts.find((post) => post.id === postId);
  if (!updated) {
    throw new Error("Post not found");
  }
  return clone(updated);
}


