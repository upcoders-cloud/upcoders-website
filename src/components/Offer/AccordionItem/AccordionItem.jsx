import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function AccordionItem({ title, content, link, isOpen, onToggle, anchor }) {
  const [contentHeight, setContentHeight] = React.useState(0)
  const ref = React.useRef(null)
  const panelId = React.useId()
  const buttonId = React.useId()

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => setContentHeight(el.scrollHeight)
    measure()

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
    <li id={anchor} className="border-b border-gray-600/70 pb-2 group/item">
      <button
        id={buttonId}
        className="flex items-center justify-between w-full text-left font-medium py-1 transition-colors duration-200 hover:text-primary group-hover/item:text-primary/90 focus-visible:text-primary"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        type="button"
      >
        <span className="inline-flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`inline-block h-px bg-primary transition-all duration-300 ease-[var(--ease-out-quart)] ${
              isOpen ? 'w-6 opacity-100' : 'w-0 opacity-0'
            }`}
          />
          <span>{title}</span>
        </span>
        <span
          aria-hidden="true"
          className={`relative w-4 h-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-quart)] ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
          <span
            className={`absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2 transition-transform duration-300 ease-[var(--ease-out-quart)] ${
              isOpen ? 'scale-y-0' : 'scale-y-100'
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        ref={ref}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
        className="overflow-hidden transition-[max-height] duration-400 ease-[var(--ease-out-quart)]"
      >
        <motion.p
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -4 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-400 text-sm mt-2 mb-4"
        >
          {content}
        </motion.p>

        {link && (
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -4 }}
            transition={{ delay: isOpen ? 0.1 : 0, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <Link
              to={link.href}
              tabIndex={isOpen ? undefined : -1}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-[gap,color] duration-200 hover:gap-2.5 hover:text-primary-light"
            >
              {link.label}
              <span className="sr-only">: {title}</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </li>
  )
}
