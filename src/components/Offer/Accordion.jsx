import React from 'react'

export default function Accordion({ title, content, open }) {
  const [isOpen, setIsOpen] = React.useState(!!open);
  const ref = React.useRef(null);

  return (
    <li className="border-b border-gray-600 pb-2">
      <button
        className="flex items-center justify-between w-full text-left font-medium hover:text-primary transition-colors"
        onClick={() => setIsOpen(v => !v)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-base">{isOpen ? "−" : "+"}</span>
      </button>

      <div
        ref={ref}
        style={{ maxHeight: isOpen ? `${ref.current?.scrollHeight ?? 0}px` : "0px" }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="text-gray-400 text-sm mt-2 mb-4">{content}</p>
      </div>
    </li>
  );
}