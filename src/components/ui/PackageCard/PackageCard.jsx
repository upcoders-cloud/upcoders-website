import React from "react";
import DefaultButton from "components/ui/DefaultButton/DefaultButton.jsx";
import { useI18n } from '@/i18n/useI18n.js'

export default function PackageCard({ pkg, onContact }) {
  const { t } = useI18n()

  return (
    <div
      className={`flex flex-col p-5 border ${
        pkg.recommended
          ? "border-primary bg-bg-2"
          : "border-bg-3 bg-bg-1"
      }`}
    >
      {pkg.recommended && (
        <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
          {t('offer.packageCard.recommended')}
        </span>
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
