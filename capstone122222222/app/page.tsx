 'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type FeedKey = 'recommended' | 'following' | 'trending'

const categories = [
  'Technology',
  'Writing',
  'Design',
  'Productivity',
  'Health',
  'AI',
  'Business',
  'Science',
  'Culture',
  'Travel',
]

const feedData: Record<
  FeedKey,
  Array<{
    title: string
    excerpt: string
    author: string
    authorAvatar: string
    image: string
    readingTime: string
  }>
> = {
  recommended: [
    {
      title: 'Mastering the Art of Slow Creativity',
      excerpt:
        'How embracing patience, whitespace, and deep work unlocks your most original ideas.',
      author: 'Sarah Johnson',
      authorAvatar: '🧢',
      image:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      readingTime: '8 min read',
    },
    {
      title: 'Designing Calm Interfaces for Busy Minds',
      excerpt:
        'Tactics for creating UI that reduces anxiety and keeps readers focused on what matters.',
      author: 'Michael Chen',
      authorAvatar: '🧑🏻‍💻',
      image:
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',
      readingTime: '6 min read',
    },
  ],
  following: [
    {
      title: 'Why Every Founder Should Write in Public',
      excerpt:
        'Building trust, clarifying thinking, and attracting the right collaborators by publishing openly.',
      author: 'Lena Walker',
      authorAvatar: '🧕',
      image:
        'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
      readingTime: '7 min read',
    },
    {
      title: 'From Journals to Journeys: Writing While Traveling',
      excerpt:
        'How to capture vivid details and turn them into immersive travel essays.',
      author: 'Marco Rivera',
      authorAvatar: '🧔🏽',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      readingTime: '5 min read',
    },
  ],
  trending: [
    {
      title: 'AI Co-writers: The Future of Collaborative Storytelling',
      excerpt:
        'Writers share how they pair their voice with generative tools without losing authenticity.',
      author: 'Priya Das',
      authorAvatar: '💡',
      image:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
      readingTime: '9 min read',
    },
    {
      title: 'Building Rituals That Protect Your Best Ideas',
      excerpt:
        'Tiny daily habits to keep your creative pipeline full even when life gets loud.',
      author: 'Noah Jacobs',
      authorAvatar: '🎧',
      image:
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
      readingTime: '10 min read',
    },
  ],
}

const stats = [
  { label: 'Active writers', value: '10K+' },
  { label: 'Stories shared', value: '50K+' },
  { label: 'Monthly readers', value: '1M+' },
]

function FeedCard({
  title,
  excerpt,
  author,
  authorAvatar,
  image,
  readingTime,
}: (typeof feedData)[FeedKey][number]) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid gap-0 md:grid-cols-[1.4fr,1fr]">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-emerald-600">
            <span>{authorAvatar}</span>
            <span className="font-semibold text-slate-900">{author}</span>
            <span className="text-slate-400">•</span>
            <span>{readingTime}</span>
          </div>
          <h3 className="mb-3 text-2xl font-serif text-slate-900">{title}</h3>
          <p className="text-slate-600">{excerpt}</p>
        </div>
        <div className="relative h-56 md:h-full">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>
    </article>
  )
}

export default function HomePage() {
  const [activeFeed, setActiveFeed] = useState<FeedKey>('recommended')

  return (
    <div className="min-h-screen relative pb-20">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-white/30"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Where great stories find their audience.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Share your ideas, connect with readers, and discover compelling stories from writers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/auth?mode=signup&redirect=/write">
                <button className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-600 transition-colors text-lg">
                  Start Writing <span>→</span>
                </button>
              </Link>
              <Link href="/posts">
                <button className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors text-lg">
                  Explore Stories
                </button>
              </Link>
            </div>
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2">
                  10K+
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2">
                  50K+
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2">
                  1M+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Feed Section */}
      <section className="relative z-10 bg-white mt-20">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-4 mb-6">
            {(['recommended', 'following', 'trending'] as FeedKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFeed(tab)}
                className={`text-sm font-semibold capitalize ${
                  activeFeed === tab
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {feedData[activeFeed].map((post) => (
              <FeedCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

