'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') || 'signin'
  const [mode, setMode] = useState<'signin' | 'signup'>(
    initialMode === 'signup' ? 'signup' : 'signin'
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const redirectTo = searchParams.get('redirect') || '/write'
  const supabase = createSupabaseClient()

  // Sync mode with URL changes
  useEffect(() => {
    const urlMode = searchParams.get('mode')
    if (urlMode === 'signup') setMode('signup')
    else if (urlMode === 'signin') setMode('signin')
  }, [searchParams])

  // Email validator
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const cleanEmail = email.trim()

    // Skip email validation to allow fake emails

    try {
      if (mode === 'signup') {
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: cleanEmail,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth?mode=signin`,
            },
          }
        )

        if (authError && !authError.message.includes('already registered')) throw authError

        if (authData.user) {
          router.push(
            `/auth?mode=signin&redirect=${encodeURIComponent(redirectTo)}`
          )
        }
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        })

        if (error) throw error

        router.push(redirectTo)
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 font-sans">
              Sign in to continue to Publishly
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="johndoe"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)} // FIXED HERE
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 font-sans">
                  Password
                </label>

                {mode === 'signin' && (
                  <Link href="#" className="text-sm text-green-600">
                    Forgot password?
                  </Link>
                )}
              </div>

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="........"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg"
              disabled={loading}
            >
              {loading
                ? mode === 'signup'
                  ? 'Creating account…'
                  : 'Signing in…'
                : mode === 'signup'
                  ? 'Sign Up'
                  : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 font-sans">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signin')
                    setError(null)
                  }}
                  className="text-green-600 font-medium"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup')
                    setError(null)
                  }}
                  className="text-green-600 font-medium"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
