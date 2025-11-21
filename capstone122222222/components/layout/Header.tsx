'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, PenSquare } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export default function Header() {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Explore' },
    { href: '/search', label: 'Search' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  const writeHref = user ? '/write' : '/auth?mode=signin&redirect=/write'

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-4 py-4">
        <Link href="/" className="text-2xl font-serif font-semibold text-emerald-700">
          Publishly
        </Link>

        <nav className="hidden flex-1 items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link
            href="/"
            className={`transition-colors ${
              isActive('/')
                ? 'text-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            Home
          </Link>
          <Link
            href="/posts"
            className={`transition-colors ${
              isActive('/posts')
                ? 'text-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            Explore
          </Link>
        </nav>

        <div className="hidden flex-1 max-w-sm md:block">
          <label className="flex items-center gap-2 rounded-full border border-transparent bg-slate-100 px-4 py-2 text-sm text-slate-500 focus-within:border-emerald-500 focus-within:bg-white">
            <Search className="h-4 w-4" />
            <input
              type="search"
              placeholder="Search stories..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href={writeHref}>
            <Button variant="ghost" size="sm" className="hidden items-center gap-2 md:inline-flex">
              <PenSquare className="h-4 w-4" />
              Write
            </Button>
          </Link>

          {user ? (
            <>
              <Link href={`/profile/${user.id}`} className="hidden sm:block">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </Link>
              <Button onClick={signOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth?mode=signin">
                <Button variant="ghost" size="sm" className="bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

