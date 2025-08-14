import React from 'react'

export default function FieldWrapper({ label, className = "", children }) {
  return (
    <div className={className}>
      <div className="text-xs tracking-widest text-gray-400 mb-1">{label}</div>
      {children}
    </div>
  );
}