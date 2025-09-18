import React from "react";
import { DrawCircleText } from "components/ui/DrawCircleText/DrawCircleText.jsx";
import { MEMBERS } from "components/Team/index.js";
import CardMember from "components/Team/CardMember/CardMember.jsx";

export default function Team() {
  return (
    <section id="about" className="bg-bg-2 text-white section-wrapper">
      <div className="text-center section-inner">
        <h3 className="text-xl text-gray-400 mb-2">
          <DrawCircleText text="MEET OUR TEAM" />
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 mb-12">
          We’re more than a tech company — we’re a team united by curiosity,
          creativity, and a drive to make an impact. Together, we turn challenges
          into opportunities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {MEMBERS.map((m, i) => (
            <CardMember key={`${m.firstName}-${m.lastName}-${i}`} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}