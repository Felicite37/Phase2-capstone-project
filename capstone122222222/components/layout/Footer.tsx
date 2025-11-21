import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-sm text-slate-500 md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()} Publishly. Crafted for storytellers everywhere.
        </p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
          <Link href="/terms" className="hover:text-slate-900">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}

