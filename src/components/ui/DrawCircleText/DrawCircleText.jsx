import React from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

// Tekst z odręcznym kółkiem dookoła. Kółko zachowuje proporcje rysunku,
// bo rozciągnięte do tekstu wyglądało na przekreślenie.
export const DrawCircleText = ({ text, svgClassName }) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <span className="relative inline-block px-2 py-1">
      {text}
      <svg
        aria-hidden="true"
        viewBox="0 0 286 73"
        fill="none"
        className={svgClassName || 'absolute -left-3 -right-3 -top-1 -bottom-4 overflow-visible'}
      >
        <motion.path
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.25,
            ease: 'easeInOut',
          }}
          d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
          stroke="#5271FF"
          strokeWidth="3"
        />
      </svg>
    </span>
  )
}
