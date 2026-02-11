import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from '@/i18n/useI18n.js'

export default function Modal({ isOpen, onClose, children }) {
  const { t } = useI18n()

  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-bg-1 border border-bg-3 text-white shadow-[3px_3px_0px_black] p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label={t('common.close')}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-xl leading-none"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
