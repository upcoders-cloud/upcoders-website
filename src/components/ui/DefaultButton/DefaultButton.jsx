// components/ui/DefaultButton/DefaultButton.jsx
import React from "react";

export default function DefaultButton({
                                        label,
                                        type = "button",
                                        disabled = false,
                                        loading = false,
                                        onClick,
                                        className = "",
                                      }) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={`group relative px-6 py-2 font-medium bg-primary text-white w-fit cursor-pointer
        shadow-[3px_3px_0px_black]
        transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-out-quart)]
        hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-primary-light
        active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
        focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_black] ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-4 w-4 align-[-2px] animate-spin rounded-full border-2 border-white/60 border-t-transparent"
        />
      )}
      <span className="relative inline-block transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
        {label}
      </span>
    </button>
  );
}
