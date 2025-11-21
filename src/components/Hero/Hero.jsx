import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import {
  UPCODERS_SHAPE_COORDS,
  UPCODERS_SHAPE_ROWS,
  UPCODERS_SHAPE_COLS,
  UPCODERS_SIZES_MAP
} from "patterns/upcodersShape.js";
import DefaultButton from 'components/ui/DefaultButton/DefaultButton.jsx'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'
import FallingPixelsCanvas from '@/animations/FallingPixelsCanvas/FallingPixelsCanvas.jsx'

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
        <div className="section-inner relative z-10">
          <DiagonalPair className="relative -left-4 -top-6" gap={0} />
          <h1 className="text-6xl md:text-8xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
            BRIGHT<br />THE&nbsp;
            <span className="inline-flex items-baseline font-extrabold ">
              <span className={isDone ? "text-[#C7FF7F]" : ""}>{text}</span>
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

          <DefaultButton
            label="ASK ABOUT YOUR PROJECT"
            className="mt-10 inline-flex items-center px-6 py-3 text-sm md:text-base"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>

        {/* PIXELS BEHIND EVERYTHING */}
        <div className="pointer-events-none z-0 hidden lg:flex w-full absolute inset-y-0 right-0 items-center justify-end">
          <FallingPixelsCanvas
            coords={UPCODERS_SHAPE_COORDS}
            rows={UPCODERS_SHAPE_ROWS}
            cols={UPCODERS_SHAPE_COLS}
            cell={48}
            color="#5271FF"
            sizes={UPCODERS_SIZES_MAP}
            className=" right-0 top-0 pointer-events-none"
          />
        </div>
      </section>
    </>
  );
}
