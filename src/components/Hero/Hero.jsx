import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import {
  UPCODERS_SHAPE_COORDS,
  UPCODERS_SHAPE_ROWS,
  UPCODERS_SHAPE_COLS,
  UPCODERS_SIZES_MAP
} from "patterns/upcodersShape.js";
import FallingPixelsPattern from '@/animations/FallingPixelsPattern/FallingPixelsPattern.jsx'

const TYPEWRITER_WORLDS = ["FUTURE", "CODE", "INNOVATION", "IDEAS", "FUTURE"];

export default function Hero() {
  const [text, { isDone }] = useTypewriter({
    words: TYPEWRITER_WORLDS,
    loop: 1,
    cursorColor: "#5271FF"
  })

  return (
    <>
      <section className="relative overflow-hidden bg-bg-1 text-white section-wrapper">
        <div className="section-inner">
          <h1 className="text-6xl md:text-8xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
            BRIGHT<br />THE&nbsp;
            <span className="inline-flex items-baseline font-extrabold ">
              <span className={isDone ? "text-primary-light" : ""}>{text}</span>
              <span className="inline-block align-baseline translate-y-[-0.06em]">
                {!isDone && (
                  <Cursor
                    cursorColor="#5271FF"
                  />
                )}
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-gray-300 text-base md:text-xl">
            We design and develop modern applications tailored to the processes of
            industrial and technical companies.
          </p>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm md:text-base font-medium hover:bg-primary-light transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
            }}
          >
            UMÓW KONSULTACJĘ →
          </a>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end max-lg:w-[55%] max-md:hidden">
            <FallingPixelsPattern
              coords={UPCODERS_SHAPE_COORDS}
              rows={UPCODERS_SHAPE_ROWS}
              cols={UPCODERS_SHAPE_COLS}
              cell="clamp(32px, 5vw, 50px)"
              gap="0"
              color="#5271FF"
              duration={2.8}
              staggerFraction={0.75}
              className="opacity-95"
              sizes={UPCODERS_SIZES_MAP}
            />
          </div>
        </div>
      </section>
    </>
  );
}
