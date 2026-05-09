import React from "react";
import { motion } from "motion/react";
import KeyFramePixel from "@/animations/KeyFramePixel/KeyFramePixel.jsx";
import { useI18n } from '@/i18n/useI18n.js'

export default function ContactHeader() {
  const { t } = useI18n()

  return (
    <div className="relative">
      <KeyFramePixel
        size={30}
        color="#5271FF"
        customStyles={{ position: "absolute", top: -45, left: 0 }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-fit text-4xl md:text-5xl font-semibold leading-tight"
      >
        {t('contact.header.line1')}
        <br /> {t('contact.header.line2')}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-gray-300 max-w-md"
      >
        {t('contact.header.descriptionLine1')}
        <br />
        {t('contact.header.descriptionLine2')}
      </motion.p>
    </div>
  );
}
