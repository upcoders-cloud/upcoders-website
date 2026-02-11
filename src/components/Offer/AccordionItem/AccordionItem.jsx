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
    <li id={anchor} className="border-b border-gray-600 pb-2">
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

        {cta && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cta.packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} onContact={handleContact} />
            ))}
          </div>
        </Modal>
      )}
    </li>
  );
}
