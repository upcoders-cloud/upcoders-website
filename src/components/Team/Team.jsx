import React from "react";
import { DrawCircleText } from "components/ui/DrawCircleText/DrawCircleText.jsx";
import { MEMBERS } from "components/Team/index.js";
import CardMember from "components/Team/CardMember/CardMember.jsx";
import { useI18n } from '@/i18n/useI18n.js'

export default function Team() {
  const { t } = useI18n()

  return (
    <section id="about" className="bg-bg-2 text-white section-wrapper">
      <div className="text-center section-inner">
        <h3 className="text-xl text-gray-400 mb-2">
          <DrawCircleText text={t('team.eyebrow')} />
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 mb-12">
          {t('team.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {MEMBERS.map((m, i) => (
            <CardMember key={`${m.firstName}-${m.lastName}-${i}`} member={m} index={i} length={MEMBERS.length}/>
          ))}
        </div>
      </div>
    </section>
  );
}
