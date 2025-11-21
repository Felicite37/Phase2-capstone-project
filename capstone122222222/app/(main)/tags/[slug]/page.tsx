import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import PostCard from '@/components/post/PostCard'

export default async function TagPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()

  const { data: tag, error: tagError } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (tagError || !tag) {
    notFound()
  }

  // First get post IDs with this tag
  const { data: postTags } = await supabase
    .from('post_tags')
    .select('post_id')
    .eq('tag_id', tag.id)

  const postIds = postTags?.map((pt) => pt.post_id) || []

  const { data: posts } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:profiles(id, full_name, username, avatar_url),
      tags:post_tags(tag:tags(id, name, slug))
    `
    )
    .eq('published', true)
    .in('id', postIds)
    .order('published_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">#{tag.name}</h1>
          <p className="text-gray-600">
            {posts?.length || 0} {posts?.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

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
            <p className="text-gray-500">No posts found for this tag.</p>
          )}
        </div>
      </div>
    </div>
  )
}

