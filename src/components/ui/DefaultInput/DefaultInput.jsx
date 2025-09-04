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

      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          autocomplete={autocomplete}
          className={`w-full bg-transparent outline-none border-b border-gray-600/80 focus:border-primary/90 py-3 text-sm placeholder:text-gray-400 ${
            hasError ? "border-red-500 focus:border-red-400" : ""
          }`}
          {...registration}
          {...rest}
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
