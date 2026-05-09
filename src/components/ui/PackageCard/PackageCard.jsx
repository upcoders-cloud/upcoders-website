import React from "react";
import DefaultButton from "components/ui/DefaultButton/DefaultButton.jsx";
import { useI18n } from '@/i18n/useI18n.js'

export default function PackageCard({ pkg, onContact }) {
  const { t } = useI18n()

  return (
    <div
      className={`relative flex flex-col p-5 border overflow-hidden transition-all duration-300 ease-[var(--ease-out-quart)] hover:-translate-y-1 ${
        pkg.recommended
          ? "border-primary bg-bg-2 shadow-[0_8px_30px_rgba(82,113,255,0.15)] hover:shadow-[0_14px_40px_rgba(82,113,255,0.25)]"
          : "border-bg-3 bg-bg-1 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      }`}
    >
      {pkg.recommended && (
        <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none">
          <div
            className="absolute top-[24px] right-[-54px] w-[180px] rotate-45 bg-primary py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-md"
          >
            <span className="relative z-10">{t('offer.packageCard.recommended')}</span>
            <span
              className="absolute inset-0 animate-shimmer"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        </div>
      )}
      <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
      <p className="text-primary text-xl font-semibold mt-1 mb-4">{pkg.price}</p>
      <ul className="flex-1 space-y-2 mb-5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="text-primary mt-0.5">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <DefaultButton
        label={t('offer.packageCard.contactButton')}
        onClick={onContact}
        className="w-full text-center text-sm"
      />
    </div>
  );
}
