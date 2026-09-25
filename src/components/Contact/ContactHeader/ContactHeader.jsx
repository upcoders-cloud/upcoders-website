import React from 'react'
import { motion } from 'motion/react'
import KeyFramePixel from '@/animations/KeyFramePixel/KeyFramePixel.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

const EASE_OUT = [0.16, 1, 0.3, 1]

export default function ContactHeader() {
  const { t } = useI18n()
  const reduceMotion = usePrefersReducedMotion()
  const reveal = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  })

  return (
    <div className="relative">
      <KeyFramePixel
        size={30}
        color="#5271FF"
        customStyles={{ position: 'absolute', top: -45, left: 0 }}
      />
      <motion.h2 {...reveal(0)} className="w-fit text-4xl md:text-5xl font-semibold leading-tight">
        {t('contact.header.line1')}
        <br /> {t('contact.header.line2')}
      </motion.h2>
      <motion.p {...reveal(0.1)} className="mt-6 text-gray-300 max-w-md leading-relaxed">
        {t('contact.header.description')}
      </motion.p>
    </div>
  )
}
