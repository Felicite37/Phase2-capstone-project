'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createSupabaseClient } from '@/lib/supabase/client'
import { slugify, generateExcerpt } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import { Image, Link as LinkIcon, Code, Type, Save, Eye, Send } from 'lucide-react'

export default function WritePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createSupabaseClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth?mode=signin&redirect=/write')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user) {
    return null
  }

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async (publish: boolean) => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content')
      return
    }

    setSaving(true)

    try {
      const slug = slugify(title)
      const postExcerpt = excerpt || generateExcerpt(content)

      // Check if slug exists
      const { data: existingPost } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single()

      let postId: string

      if (existingPost) {
        // Update existing post
        const { data, error } = await supabase
          .from('posts')
          .update({
            title,
            content,
            excerpt: postExcerpt,
            cover_image: coverImage || null,
            published: publish,
            published_at: publish ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingPost.id)
          .select()
          .single()

        if (error) throw error
        postId = data.id
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('posts')
          .insert({
            title,
            slug,
            content,
            excerpt: postExcerpt,
            cover_image: coverImage || null,
            author_id: user.id,
            published: publish,
            published_at: publish ? new Date().toISOString() : null,
          })
          .select()
          .single()

        if (error) throw error
        postId = data.id
      }

      // Handle tags
      if (tags.length > 0) {
        // Get or create tags
        const tagPromises = tags.map(async (tagName) => {
          const tagSlug = slugify(tagName)
          // Check if tag exists
          const { data: existingTag } = await supabase
            .from('tags')
            .select('id')
            .eq('slug', tagSlug)
            .single()

          if (existingTag) {
            return existingTag.id
          } else {
            // Create new tag
            const { data: newTag, error } = await supabase
              .from('tags')
              .insert({
                name: tagName,
                slug: tagSlug,
              })
              .select()
              .single()

            if (error) throw error
            return newTag.id
          }
        })

        const tagIds = await Promise.all(tagPromises)

        // Remove old post_tags
        await supabase.from('post_tags').delete().eq('post_id', postId)

        // Add new post_tags
        const postTagInserts = tagIds.map((tagId) => ({
          post_id: postId,
          tag_id: tagId,
        }))

        await supabase.from('post_tags').insert(postTagInserts)
      }

      if (publish) {
        router.push(`/posts/${slug}`)
      } else {
        alert('Draft saved successfully!')
      }
    } catch (error: any) {
      console.error('Error saving post:', error)
      alert('Error saving post: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Editor Toolbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Formatting tools */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Insert Image"
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-orange-500 bg-orange-50 rounded-lg transition-colors"
                title="Insert Link"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Insert Code"
              >
                <Code className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1 px-2 text-gray-600">
                <Type className="w-5 h-5" />
                <span className="text-sm animate-pulse">|</span>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{saving ? 'Publishing...' : 'Publish'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cover Image Upload Area */}
        <div className="mb-8">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-20 text-center cursor-pointer hover:border-gray-400 transition-colors bg-white min-h-[400px] flex items-center justify-center"
            onClick={() => document.getElementById('cover-image-input')?.click()}
          >
            {coverImage ? (
              <div className="relative w-full">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="max-h-96 mx-auto rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCoverImage('')
                  }}
                  className="mt-4 text-sm text-gray-600 hover:text-gray-800"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Image className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-400 font-medium">Click to upload cover image</p>
              </div>
            )}
          </div>
          <input
            id="cover-image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                // For now, we'll use a URL input. In production, you'd upload to Cloudinary/Supabase Storage
                const reader = new FileReader()
                reader.onload = (event) => {
                  setCoverImage(event.target?.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Or paste image URL here"
            className="mt-4 w-full max-w-md mx-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 bg-transparent text-gray-900 text-3xl font-bold border-0 focus:outline-none placeholder-gray-400"
          />
        </div>

        {/* Content Editor */}
        <div className="mb-6">
          <MarkdownEditor
            value={content}
            onChange={setContent}
            preview={preview}
          />
        </div>

        {/* Tags Section (Hidden by default, can be toggled) */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Tags (optional)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTag())
              }
              placeholder="Add a tag..."
              className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

