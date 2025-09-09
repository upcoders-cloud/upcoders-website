import { FaLinkedinIn } from "react-icons/fa";
import { DrawCircleText } from 'components/ui/DrawCircleText/DrawCircleText.jsx'
import { MEMBERS } from 'components/Team/index.js'
import FallingPixelsPattern from '@/animations/FallingPixelsPattern/FallingPixelsPattern.jsx'
import React from 'react'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'

export default function Team() {
  return (
    <section id="about" className="bg-bg-2 text-white section-wrapper">
      <div className="text-center section-inner">
        <h3 className="text-xl text-gray-400 mb-2">
          <DrawCircleText text={"MEET OUR TEAM"}/>
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 mb-12">
          Działamy zwinnie, mówimy ludzkim językiem i wierzymy, że partnerska współpraca przynosi najlepsze efekty.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {MEMBERS.map((m, i) => {
            return (
              <div
                key={`${m.firstName}-${m.lastName}-${i}`}
                className="relative bg-[#1C1C1C] overflow-hidden group"
              >
                {/* LinkedIn icon */}
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-primary transition z-10"
                >
                  <FaLinkedinIn size={16} />
                </a>

                {/* Image */}
                <div className="w-full aspect-[387/464]">
                  <img
                    src={m.img}
                    alt={`${m.firstName} ${m.lastName}`}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                {/* === BLUE FALLING PIXELS OVERLAY === */}
                <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
                  <FallingPixelsPattern
                    coords={m.pattern.coords}
                    rows={m.pattern.rows}
                    cols={m.pattern.cols}
                    // dużo mniejszy rozmiar komórki niż w hero:
                    cell="clamp(10px, 4vw, 34px)"
                    gap="0"
                    color="#5271FF"
                    duration={2.4}
                    staggerFraction={0.7}
                    className="opacity-95"
                    // jeśli kiedyś dodasz rozmiary dla członków, podepnij tu: sizes={m.pattern.sizes}
                  />
                </div>
                {/* Blue shape overlay – imię i nazwisko */}
                <div className="absolute bottom-4 left-0 right-0 z-10">
                  <p className="px-4 text-white text-left leading-[0.9] text-2xl sm:text-3xl md:text-4xl">
                    {m.firstName}<br/>{m.lastName}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
