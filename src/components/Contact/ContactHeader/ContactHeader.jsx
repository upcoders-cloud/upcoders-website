import React from "react";
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
      <h2 className="w-fit text-4xl md:text-5xl font-semibold leading-tight">
        {t('contact.header.line1')}
        <br /> {t('contact.header.line2')}
      </h2>
      <p className="mt-6 text-gray-300 max-w-md">
        {t('contact.header.descriptionLine1')}
        <br />
        {t('contact.header.descriptionLine2')}
      </p>
    </div>
  );
}
