export type Author = {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
};

export type Comment = {
  id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: number;
  likes: number;
  likedBy: string[];
  comments: Comment[];
};

export type CreatePostInput = {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  status?: "draft" | "published";
};


