import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'golden'
    | 'outline-golden'
    | 'ghost-dark'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    default:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    outline:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-emerald-500',
    ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-emerald-500',
    golden:
      'bg-[#f6773c] text-white hover:bg-[#f78d50] focus:ring-[#f6773c] font-semibold shadow-lg shadow-[#f6773c]/30',
    'outline-golden':
      'border-2 border-[#f6773c] bg-transparent text-[#f6773c] hover:bg-[#f6773c]/10 focus:ring-[#f6773c]',
    'ghost-dark':
      'text-slate-900 hover:bg-slate-100 focus:ring-slate-400 bg-transparent',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-8 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

