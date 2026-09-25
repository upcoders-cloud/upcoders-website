import Seo from '@/seo/Seo.jsx'
import { useI18n } from '@/i18n/useI18n.js'

export default function PrivacyPage() {
  const { t } = useI18n()
  const sections = t('privacy.sections')

  return (
    <div className="bg-bg-1 px-6 py-16 text-white md:px-10 md:py-24">
      <Seo route="privacy" />
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-12 text-4xl font-semibold md:text-5xl">{t('privacy.title')}</h1>
        <div className="space-y-12">
          {sections.map(({ title, paragraphs }) => (
            <section key={title}>
              <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
              <div className="space-y-4 text-base leading-7 text-gray-300">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
