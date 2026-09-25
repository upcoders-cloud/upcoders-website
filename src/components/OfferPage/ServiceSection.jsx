import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import PackageCard from 'components/ui/PackageCard/PackageCard.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { fadeUpInView } from './index.js'

export default function ServiceSection({ service, index, onContact }) {
  const { t, language } = useI18n()
  const { anchor, key, tags, exampleProject, tiers } = service
  const base = `offerPage.services.${key}`
  const deliverables = t(`${base}.deliverables`) || []
  const isEven = index % 2 === 0

  return (
    <section
      id={anchor}
      aria-labelledby={`${anchor}-title`}
      className={`${isEven ? 'bg-bg-2' : 'bg-bg-1'} text-white section-wrapper`}
    >
      <div className="section-inner">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <motion.span
                {...fadeUpInView(0)}
                aria-hidden="true"
                className="block text-6xl md:text-7xl font-bold leading-none tabular-nums text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)]"
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
              <motion.h2
                {...fadeUpInView(0.06)}
                id={`${anchor}-title`}
                className="mt-6 text-3xl md:text-4xl font-semibold leading-tight"
              >
                {t(`${base}.title`)}
              </motion.h2>
              <motion.p
                {...fadeUpInView(0.12)}
                className="mt-5 text-lg text-gray-300 leading-relaxed"
              >
                {t(`${base}.lead`)}
              </motion.p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <motion.p {...fadeUpInView(0)} className="text-gray-400 leading-relaxed">
              {t(`${base}.body`)}
            </motion.p>

            <motion.div {...fadeUpInView(0.06)}>
              <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-4">
                {t('offerPage.labels.deliverables')}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 border border-bg-3/60 p-4 text-sm text-gray-200 leading-relaxed ${
                      isEven ? 'bg-bg-1/60' : 'bg-bg-2/60'
                    }`}
                  >
                    <span aria-hidden="true" className="mt-1.5 w-2 h-2 shrink-0 bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUpInView(0.1)} className="border-l-2 border-primary pl-5 py-1">
              <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-2">
                {t('offerPage.labels.forWhom')}
              </h3>
              <p className="text-gray-300 leading-relaxed">{t(`${base}.forWhom`)}</p>
            </motion.div>

            {tags && (
              <motion.div {...fadeUpInView(0.12)}>
                <h3 className="text-xs tracking-widest text-gray-500 uppercase mb-3">
                  {t('offerPage.labels.tech')}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="px-2.5 py-1 text-xs border border-bg-3 text-gray-300">
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {exampleProject && (
              <motion.div {...fadeUpInView(0.14)}>
                <Link
                  to={`/${language}/projects/${exampleProject}`}
                  className="group flex items-center justify-between gap-4 border border-bg-3/60 hover:border-primary/60 p-5 transition-colors duration-300"
                >
                  <span>
                    <span className="block text-xs tracking-widest text-gray-500 uppercase mb-1">
                      {t('offerPage.labels.example')}
                    </span>
                    <span className="font-medium">{t(`${base}.example`)}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-5 h-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {tiers && (
          <motion.div {...fadeUpInView(0)} className="mt-16 md:mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
              <h3 className="text-2xl font-semibold">{t(`${base}.tiers.title`)}</h3>
              <p className="text-sm text-gray-400 max-w-md">{t(`${base}.tiers.note`)}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tiers.map((tier) => (
                <PackageCard
                  key={tier.key}
                  pkg={{
                    name: t(`${base}.tiers.items.${tier.key}.name`),
                    summary: t(`${base}.tiers.items.${tier.key}.summary`),
                    features: t(`${base}.tiers.items.${tier.key}.features`) || [],
                    recommended: tier.recommended,
                  }}
                  recommendedLabel={t(`${base}.tiers.recommended`)}
                  ctaLabel={t(`${base}.tiers.cta`)}
                  onContact={onContact}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
