import React from "react";
import { motion } from "motion/react";
import { DrawCircleText } from "components/ui/DrawCircleText/DrawCircleText.jsx";
import { MEMBERS } from "components/Team/index.js";
import CardMember from "components/Team/CardMember/CardMember.jsx";
import { useI18n } from '@/i18n/useI18n.js'

export default function Team() {
  const { t, language } = useI18n()

  const circleSvgClassName = language === 'pl'
    ? 'absolute -left-3 -right-4 -top-8 -bottom-3 translate-y-1'
    : undefined

  return (
    <section id="about" className="bg-bg-2 text-white section-wrapper">
      <div className="text-center section-inner">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl text-gray-400 mb-2"
        >
          <DrawCircleText text={t('team.eyebrow')} svgClassName={circleSvgClassName} />
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-gray-300 mb-12"
        >
          {t('team.description')}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {MEMBERS.map((m, i) => (
            <CardMember key={`${m.firstName}-${m.lastName}-${i}`} member={m} index={i} length={MEMBERS.length}/>
          ))}
        </div>
      </div>
    </section>
  );
}
