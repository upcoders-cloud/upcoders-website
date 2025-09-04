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
      className={`px-6 py-2 font-medium bg-primary text-white w-fit transition-all shadow-[3px_3px_0px_black] cursor-pointer
        hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-primary-light
        disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="mr-2 inline-block h-4 w-4 align-[-2px] animate-spin rounded-full border-2 border-white/60 border-t-transparent"
        />
      )}
      {label}
    </button>
  );
}
