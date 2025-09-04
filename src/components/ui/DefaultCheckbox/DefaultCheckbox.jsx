import React from "react";
const EMPTY_STRING = "";

const DefaultCheckbox = function DefaultCheckbox(
  {
    label,
    className = EMPTY_STRING,
    error,
    registration = {},
  })
{
  const hasError = Boolean(error);
  const describedBy = hasError ? `${registration?.name}-error` : undefined;

  return (
    <div className={className}>
      <label
        className={`inline-flex items-center gap-3 select-none cursor-pointer text-sm`}
      >
        <span className="relative inline-block">
          <input
            type="checkbox"
            className="peer sr-only"
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            {...registration}
          />
          <span className={`block w-5 h-5 rounded-md transition-colors
              ${hasError ? "bg-red-400/70" : "bg-gray-300"}
              peer-checked:bg-primary`} />
          <span className="pointer-events-none absolute left-[7px] top-[2px] w-[6px] h-[12px] border-white border-r-2 border-b-2 rotate-45 opacity-0 transition-opacity peer-checked:opacity-100" />
        </span>
        {label && <span className="text-gray-300">{label}</span>}
      </label>

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
};

export default DefaultCheckbox;
