import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

// The fill is darker than the global `primary` token (#5271FF, 4.07:1 with white) so that
// white label text passes WCAG AA: #3F5EF0 is 5.16:1, the hover fill #4868F8 is 4.55:1.
export default function DefaultButton({
  label,
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  children,
  ...rest
}) {
  const isDisabled = disabled || loading
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={twMerge(
        clsx(
          'group relative px-6 py-2 font-medium bg-[#3F5EF0] text-white w-fit cursor-pointer',
          'shadow-[3px_3px_0px_black]',
          'transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-out-quart)]',
          'hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#4868F8]',
          'active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light',
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_black] disabled:hover:bg-[#3F5EF0]',
          className
        )
      )}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-4 w-4 align-[-2px] animate-spin rounded-full border-2 border-white/60 border-t-transparent"
        />
      )}
      <span className="relative inline-block transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
        {label ?? children}
      </span>
    </button>
  )
}
