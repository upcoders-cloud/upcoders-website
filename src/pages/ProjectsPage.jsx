import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useI18n } from '@/i18n/useI18n.js'
import { ArrowRight, Smartphone, Clock } from 'lucide-react'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import ZigZag5 from 'components/Decor/ZigZag5.jsx'
import Seo from '@/seo/Seo.jsx'

const PROJECTS = [
  {
    slug: 'kaizen',
    icon: Smartphone,
    translationKey: 'projects.items.kaizen',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: 'easeOut' },
})

export default function ProjectsPage() {
  const { t, language } = useI18n()
  const navigate = useNavigate()

  const handleContact = () => {
    navigate(`/${language}#contact`)
  }

  return (
    <>
      <Seo route="projects" />
      <section className="bg-bg-1 text-white section-wrapper">
        <div className="section-inner">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs tracking-widest text-gray-500 mb-3 uppercase">
              {t('projects.eyebrow')}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold">{t('projects.title')}</h1>
            <p className="mt-4 max-w-2xl text-gray-400">{t('projects.description')}</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(({ slug, icon: Icon, translationKey }, i) => (
              <motion.div key={slug} {...fadeUp(0.15 + i * 0.1)} className="h-full">
                <Link
                  to={`/${language}/projects/${slug}`}
                  className="group bg-bg-2 border border-bg-3/40 p-6 hover:border-primary/50 transition-all duration-300 flex flex-col gap-4 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-gray-500 border border-bg-3/60 px-2 py-0.5">
                      {t(`${translationKey}.category`)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t(`${translationKey}.title`)}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t(`${translationKey}.description`)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    {t('projects.viewProject')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}

            {[0, 1].map((i) => (
              <motion.div
                key={`soon-${i}`}
                {...fadeUp(0.25 + i * 0.1)}
                className="bg-bg-2/40 border border-bg-3/20 p-6 flex flex-col gap-5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 bg-bg-3/10 border border-bg-3/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600 border border-bg-3/25 px-2 py-0.5">
                    {t('projects.comingSoon')}
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  <div className="h-3.5 bg-bg-3/20 rounded-sm w-2/5" />
                  <div className="h-2.5 bg-bg-3/15 rounded-sm w-full" />
                  <div className="h-2.5 bg-bg-3/15 rounded-sm w-4/5" />
                  <div className="h-2.5 bg-bg-3/10 rounded-sm w-3/5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-bg-2 text-white section-wrapper relative overflow-hidden">
        <div className="section-inner relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">
                {t('projects.cta.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-lg">
                {t('projects.cta.headline')}
              </h2>
              <p className="mt-4 text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
                {t('projects.cta.sub')}
              </p>
            </div>
            <div className="shrink-0">
              <DefaultButton label={t('projects.cta.button')} onClick={handleContact} />
            </div>
          </motion.div>

          <motion.hr
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: 'easeInOut' }}
            style={{ originX: 0 }}
            className="mt-20 border-white/10"
          />
        </div>
      </section>
    </>
  )
}
