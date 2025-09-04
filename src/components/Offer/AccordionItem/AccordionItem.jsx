import React from "react";

export default function AccordionItem({ title, content, isOpen, onToggle }) {
  const [contentHeight, setContentHeight] = React.useState(0);
  const ref = React.useRef(null);
  const panelId = React.useId();
  const buttonId = React.useId();

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setContentHeight(el.scrollHeight);
    measure();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect?.();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <li className="border-b border-gray-600 pb-2">
      <button
        id={buttonId}
        className="flex items-center justify-between w-full text-left font-medium hover:text-primary transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        type="button"
      >
        <span>{title}</span>
        <span className="text-base">{isOpen ? "−" : "+"}</span>
      </button>

      <div
        id={panelId}
        ref={ref}
        role="region"
        aria-labelledby={buttonId}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <p className="text-gray-400 text-sm mt-2 mb-4">{content}</p>
      </div>
    </li>
  );
}
