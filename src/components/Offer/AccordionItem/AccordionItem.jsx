import React from "react";
import { motion } from "motion/react";
import DefaultButton from "components/ui/DefaultButton/DefaultButton.jsx";
import Modal from "components/ui/Modal/Modal.jsx";
import PackageCard from "components/ui/PackageCard/PackageCard.jsx";

export default function AccordionItem({ title, content, cta, isOpen, onToggle, anchor, autoOpenModal, onModalAutoOpened }) {
  const [contentHeight, setContentHeight] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
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

  React.useEffect(() => {
    if (autoOpenModal && cta) {
      setModalOpen(true)
      onModalAutoOpened?.()
    }
  }, [autoOpenModal])

  const handleContact = () => {
    setModalOpen(false);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

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
              isOpen ? "w-6 opacity-100" : "w-0 opacity-0"
            }`}
          />
          <span>{title}</span>
        </span>
        <span
          aria-hidden="true"
          className={`relative w-4 h-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-quart)] ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
          <span
            className={`absolute top-0 bottom-0 left-1/2 w-px bg-current -translate-x-1/2 transition-transform duration-300 ease-[var(--ease-out-quart)] ${
              isOpen ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        ref={ref}
        role="region"
        aria-labelledby={buttonId}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px" }}
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

        {cta && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <DefaultButton
              label={cta.label}
              onClick={() => setModalOpen(true)}
              className="text-sm"
            />
          </motion.div>
        )}
      </div>

      {cta && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-6">{cta.modalTitle}</h2>
          {cta.packages ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cta.packages.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} onContact={handleContact} />
              ))}
            </div>
          ) : cta.ModalContent ? (
            <cta.ModalContent onContact={handleContact} />
          ) : null}
        </Modal>
      )}
    </li>
  );
}
