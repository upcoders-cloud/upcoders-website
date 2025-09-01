import React from 'react'

export default function Accordion({ title, content, open }) {
  const [isOpen, setIsOpen] = React.useState(!!open)
  const [contentHeight, setContentHeight] = React.useState(0)
  const ref = React.useRef(null)

  // Zmierz wysokość po montażu i przy resize/zmianie treści
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => setContentHeight(el.scrollHeight)
    measure()

    // aktualizacja gdyby treść się zmieniła
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure)
      ro.observe(el)
    }
    window.addEventListener('resize', measure)

    return () => {
      ro?.disconnect?.()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <li className="border-b border-gray-600 pb-2">
      <button
        className="flex items-center justify-between w-full text-left font-medium hover:text-primary transition-colors"
        onClick={() => setIsOpen(v => !v)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-base">{isOpen ? '−' : '+'}</span>
      </button>

      <div
        ref={ref}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="text-gray-400 text-sm mt-2 mb-4">{content}</p>
      </div>
    </li>
  )
}
