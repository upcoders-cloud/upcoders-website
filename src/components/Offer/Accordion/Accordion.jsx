import React from "react";
import AccordionItem from 'components/Offer/AccordionItem/AccordionItem.jsx'

export default function Accordion({ items = [], defaultOpenIndex = null, className = "" }) {
  const [openIndex, setOpenIndex] = React.useState(
    Number.isInteger(defaultOpenIndex) ? defaultOpenIndex : null
  );
  const [autoOpenModalIndex, setAutoOpenModalIndex] = React.useState(null);

  React.useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    const idx = items.findIndex((item) => item.anchor === hash)
    if (idx === -1) return

    setOpenIndex(idx)

    // scroll after accordion opens
    requestAnimationFrame(() => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    // open modal if item has cta
    if (items[idx].cta) {
      setTimeout(() => setAutoOpenModalIndex(idx), 600)
    }
  }, [])

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          anchor={item.anchor}
          title={item.title}
          content={item.content}
          cta={item.cta}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
          autoOpenModal={autoOpenModalIndex === idx}
          onModalAutoOpened={() => {
            setAutoOpenModalIndex(null)
            history.replaceState(null, '', window.location.pathname)
          }}
        />
      ))}
    </ul>
  );
}
