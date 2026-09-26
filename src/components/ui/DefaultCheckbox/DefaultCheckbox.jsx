import React from 'react'
const EMPTY_STRING = ''

// `label` may be a React node, e.g. text with a link to the privacy policy.
const DefaultCheckbox = function DefaultCheckbox({
  label,
  required = false,
  className = EMPTY_STRING,
  error,
  registration = {},
}) {
  const id = React.useId()
  const errorId = `${id}-error`
  const hasError = Boolean(error)

  return (
    <div className={className}>
      <div className="flex items-start gap-3 text-sm">
        <span className="relative mt-0.5 inline-block shrink-0">
          <input
            id={id}
            type="checkbox"
            className="peer absolute inset-0 h-5 w-5 cursor-pointer opacity-0"
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={hasError ? errorId : undefined}
            {...registration}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none block w-5 h-5 rounded-md transition-all duration-200 ease-[var(--ease-out-quart)]
              ${hasError ? 'bg-red-400/70' : 'bg-gray-300'}
              peer-checked:bg-primary peer-checked:scale-105
              peer-focus-visible:ring-2 peer-focus-visible:ring-primary-light peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-1`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[7px] top-[2px] w-[6px] h-[12px] border-white border-r-2 border-b-2 rotate-45 opacity-0 scale-50 transition-all duration-200 ease-[var(--ease-spring)] peer-checked:opacity-100 peer-checked:scale-100"
          />
        </span>
        {label && (
          <label htmlFor={id} className="cursor-pointer select-none text-gray-300 leading-snug">
            {label}
            {required && (
              <span aria-hidden="true" className="ml-0.5 text-gray-400">
                *
              </span>
            )}
          </label>
        )}
      </div>

      {hasError && (
        <span id={errorId} className="mt-1 block text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  )
}

export default DefaultCheckbox
