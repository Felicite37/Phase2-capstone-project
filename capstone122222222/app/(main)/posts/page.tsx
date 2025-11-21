import { createServerClient } from '@/lib/supabase/server'
import PostCard from '@/components/post/PostCard'

export default async function PostsPage() {
  const supabase = createServerClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:profiles(id, full_name, username, avatar_url),
      tags:post_tags(tag:tags(id, name, slug))
    `
    )
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">
            Explore Stories
          </h1>

          <div className="space-y-8">
            {posts && posts.length > 0 ? (
              posts.map((post: any) => (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    tags: post.tags?.map((pt: any) => pt.tag) || [],
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No posts yet. Be the first to write something!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

