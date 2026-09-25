import React from 'react'
import { motion } from 'motion/react'
import { DrawCircleText } from 'components/ui/DrawCircleText/DrawCircleText.jsx'
import { MEMBERS } from 'components/Team/index.js'
import CardMember from 'components/Team/CardMember/CardMember.jsx'
import { useI18n } from '@/i18n/useI18n.js'

const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Team() {
  const { t } = useI18n()

  return (
    <section id="about" aria-labelledby="team-title" className="bg-bg-2 text-white section-wrapper">
      <div className="text-center section-inner">
        <motion.p
          {...fadeUpInView(0)}
          className="text-xs tracking-widest uppercase text-gray-400 mb-3"
        >
          <DrawCircleText text={t('team.eyebrow')} />
        </motion.p>
        <motion.h2
          {...fadeUpInView(0.05)}
          id="team-title"
          className="text-3xl md:text-4xl font-semibold"
        >
          {t('team.title')}
        </motion.h2>
        <motion.p
          {...fadeUpInView(0.1)}
          className="mt-5 max-w-2xl mx-auto text-gray-300 mb-10 md:mb-12"
        >
          {t('team.description')}
        </motion.p>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {MEMBERS.map((member, i) => (
            <CardMember key={member.id} member={member} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
