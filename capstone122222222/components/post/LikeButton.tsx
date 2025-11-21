'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  postId: string
  initialLikeCount: number
}

export default function LikeButton({
  postId,
  initialLikeCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const supabase = createSupabaseClient()

  useEffect(() => {
    if (user) {
      checkLiked()
    }
  }, [user, postId])

  const checkLiked = async () => {
    if (!user) return

    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    setLiked(!!data)
  }

  const handleLike = async () => {
    if (!user) {
      alert('Please sign in to like posts')
      return
    }

    setLoading(true)

    try {
      if (liked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id)

        if (error) throw error
        setLiked(false)
        setLikeCount((prev) => Math.max(0, prev - 1))
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          })

        if (error) throw error
        setLiked(true)
        setLikeCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading || !user}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        liked
          ? 'bg-red-50 text-red-600 hover:bg-red-100'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
      <span>{likeCount}</span>
    </button>
  )
}

