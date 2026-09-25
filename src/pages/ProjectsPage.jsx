import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useI18n } from '@/i18n/useI18n.js'
import { ArrowRight, Smartphone } from 'lucide-react'
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import Seo from '@/seo/Seo.jsx'
import { useGoToContact } from '@/hooks/useGoToContact/useGoToContact.js'

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
  const goToContact = useGoToContact()

  return (
    <>
      <Seo route="projects" />
      <section className="bg-bg-1 text-white section-wrapper">
        <div className="section-inner">
          <motion.div {...fadeUp(0)}>
            <p className="text-xs tracking-widest text-gray-400 mb-3 uppercase">
              {t('projects.eyebrow')}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold">{t('projects.title')}</h1>
            <p className="mt-4 max-w-2xl text-gray-400">{t('projects.description')}</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS.map(({ slug, icon: Icon, translationKey }, i) => (
              <motion.div key={slug} {...fadeUp(0.15 + i * 0.1)} className="h-full">
                <Link
                  to={`/${language}/projects/${slug}`}
                  className="group bg-bg-2 border border-bg-3/40 p-6 hover:border-primary/50 transition-all duration-300 flex flex-col gap-4 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary-light" />
                    </div>
                    <span className="text-xs text-gray-400 border border-bg-3/60 px-2 py-0.5">
                      {t(`${translationKey}.category`)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-1">{t(`${translationKey}.title`)}</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t(`${translationKey}.description`)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-primary-light text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    {t('projects.viewProject')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.div {...fadeUp(0.25)} className="h-full">
              <button
                type="button"
                onClick={goToContact}
                className="group w-full h-full min-h-52 bg-bg-2 border border-primary/40 p-6 text-left flex flex-col justify-between gap-6 hover:border-primary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light transition-colors"
              >
                <div>
                  <h2 className="font-semibold text-xl">{t('projects.nextProject.title')}</h2>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {t('projects.nextProject.description')}
                  </p>
                </div>
                <span className="flex items-center gap-2 text-primary-light text-sm font-medium group-hover:gap-3 transition-all duration-200">
                  {t('projects.nextProject.button')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-bg-2 text-white section-wrapper pb-0 md:pb-0 relative overflow-hidden">
        <div className="section-inner relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
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
              <DefaultButton
                label={t('projects.cta.button')}
                onClick={goToContact}
                className="min-h-11"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
