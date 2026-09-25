import React from 'react'
const EMPTY_STRING = ''

const DefaultInput = React.forwardRef(function DefaultInput(
  {
    label,
    type = 'text',
    multiline = false,
    rows = 4,
    placeholder = EMPTY_STRING,
    autoComplete = 'off',
    required = false,
    className = EMPTY_STRING,
    error,
    registration = {},
    ...rest
  },
  ref
) {
  const id = React.useId()
  const errorId = `${id}-error`
  const hasError = Boolean(error)
  const Field = multiline ? 'textarea' : 'input'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-xs tracking-widest text-white mb-1">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-gray-400">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative group">
        <Field
          ref={ref}
          id={id}
          type={multiline ? undefined : type}
          rows={multiline ? rows : undefined}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          aria-describedby={hasError ? errorId : undefined}
          autoComplete={autoComplete}
          className={`peer block w-full bg-transparent outline-none border-b py-3 text-sm placeholder:text-gray-400 transition-colors duration-200 ${
            multiline ? 'resize-y min-h-24' : EMPTY_STRING
          } ${hasError ? 'border-red-500' : 'border-gray-600/80'}`}
          {...registration}
          {...rest}
        />
        {/* Animated underline that scales from center on focus */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 right-0 bottom-0 h-px origin-center scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 ease-[var(--ease-out-quart)] ${
            hasError ? 'bg-red-400' : 'bg-primary'
          }`}
        />
      </div>

      {hasError && (
        <span id={errorId} className="mt-1 block text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  )
})

export default DefaultInput
