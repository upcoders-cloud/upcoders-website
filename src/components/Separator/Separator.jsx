import React from 'react'
import styles from './Separator.module.css'
import { useI18n } from '@/i18n/useI18n.js'

export default function Separator() {
  const { t } = useI18n()
  const translatedItems = t('separator.items')
  const items = Array.isArray(translatedItems) && translatedItems.length > 0
    ? translatedItems
    : ['Inspiration', 'Technology', 'Innovation', 'Design', 'Solution']

  return (
    <div className="bg-bg-1 overflow-hidden py-4">
      <div className={styles.marquee}>
        {Array(4).fill(items).flat().map((text, idx) => (
          <div key={idx} className="flex items-center mr-8">
            <span className="text-gray-300 text-3xl font-medium">{text}</span>
            <span className="w-2 h-2 bg-primary inline-block ml-8"></span>
          </div>
        ))}
      </div>
    </div>
  )
}
