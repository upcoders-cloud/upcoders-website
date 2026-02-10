import React from "react";
import AccordionItem from 'components/Offer/AccordionItem/AccordionItem.jsx'

/**
 * Accordion kontrolowany z góry — otwarty może być tylko jeden element naraz.
 * Props:
 * - items: Array<{ id?: string, title: string, content: string }>
 * - defaultOpenIndex: number|null — który element startowo otworzyć (np. 1), domyślnie brak
 * - className: opcjonalne klasy kontenera <ul>
 */
export default function Accordion({ items = [], defaultOpenIndex = null, className = "" }) {
  const [openIndex, setOpenIndex] = React.useState(
    Number.isInteger(defaultOpenIndex) ? defaultOpenIndex : null
  );

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          title={item.title}
          content={item.content}
          cta={item.cta}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </ul>
  );
}
