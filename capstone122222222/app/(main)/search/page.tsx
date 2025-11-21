'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createSupabaseClient } from '@/lib/supabase/client'
import PostCard from '@/components/post/PostCard'
import { useDebounce } from '@/hooks/useDebounce'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return []

      const supabase = createSupabaseClient()
      const { data, error } = await supabase
        .from('posts')
        .select(
          `
          *,
          author:profiles(id, full_name, username, avatar_url),
          tags:post_tags(tag:tags(id, name, slug))
        `
        )
        .eq('published', true)
        .or(
          `title.ilike.%${debouncedQuery}%,content.ilike.%${debouncedQuery}%,excerpt.ilike.%${debouncedQuery}%`
        )
        .order('published_at', { ascending: false })
        .limit(20)

      if (error) throw error
      return data || []
    },
    enabled: debouncedQuery.length > 0,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Search</h1>

        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
          />
        </div>

        {isLoading && <p className="text-gray-500">Searching...</p>}

        {!isLoading && debouncedQuery && (
          <p className="text-gray-600 mb-6">
            Found {posts.length} {posts.length === 1 ? 'result' : 'results'} for
            "{debouncedQuery}"
          </p>
        )}

        <div className="space-y-8">
          {posts.length > 0 ? (
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
            debouncedQuery && (
              <p className="text-gray-500">No posts found.</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

