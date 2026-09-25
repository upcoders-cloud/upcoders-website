import React from 'react'
import AccordionItem from 'components/Offer/AccordionItem/AccordionItem.jsx'

export default function Accordion({ items = [], defaultOpenIndex = null, className = '' }) {
  const [openIndex, setOpenIndex] = React.useState(
    Number.isInteger(defaultOpenIndex) ? defaultOpenIndex : null
  )

  // The hash is only matched on mount, against the items of the first render.
  const initialItems = React.useRef(items)

  React.useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    const idx = initialItems.current.findIndex((item) => item.anchor === hash)
    if (idx === -1) return

    setOpenIndex(idx)

    // scroll after accordion opens
    requestAnimationFrame(() => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }, [])

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          anchor={item.anchor}
          title={item.title}
          content={item.content}
          link={item.link}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </ul>
  )
}
