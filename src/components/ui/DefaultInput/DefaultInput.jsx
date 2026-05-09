import React from "react";
const EMPTY_STRING = "";

const DefaultInput = React.forwardRef(function DefaultInput(
  {
    label,
    type = "text",
    placeholder = EMPTY_STRING,
    autocomplete = 'off',
    className = EMPTY_STRING,
    error,
    registration = {},
    ...rest
  },
  ref
) {
  const hasError = Boolean(error);
  const describedBy = hasError ? `${registration?.name}-error` : undefined;

  return (
    <div className={className}>
      {label && (
        <div className="text-xs tracking-widest text-white mb-1">{label}</div>
      )}

      <div className="relative group">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          autoComplete={autocomplete}
          className={`peer w-full bg-transparent outline-none border-b py-3 text-sm placeholder:text-gray-500 transition-colors duration-200 ${
            hasError ? "border-red-500" : "border-gray-600/80"
          }`}
          {...registration}
          {...rest}
        />
        {/* Animated underline that scales from center on focus */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 right-0 bottom-0 h-px origin-center scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 ease-[var(--ease-out-quart)] ${
            hasError ? "bg-red-400" : "bg-primary"
          }`}
        />
      </div>

      {hasError && (
        <span
          id={`${registration?.name}-error`}
          className="mt-1 block text-xs text-red-400"
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default DefaultInput;
