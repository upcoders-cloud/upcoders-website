import React from 'react'
import ZigZag5 from 'components/Decor/ZigZag5.jsx'
import DiagonalPair from 'components/Decor/DiagonalPair.jsx'

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-bg-1 text-white section-wrapper">
        {/* Dekoracje */}
        {/*<DiagonalPair className="absolute left-6 md:left-10 top-10 opacity-90" />*/}
        {/*<DiagonalPair className="absolute right-6 md:right-10 top-8 opacity-90" />*/}
        {/*<DiagonalPair className="absolute right-24 md:right-40 top-32 opacity-60 rotate-180" />*/}
        {/* niebieski „blok” w prawym-dolnym rogu hero */}
        {/*<div className="hidden md:block absolute -right-10 bottom-0 w-[340px] h-[140px] bg-primary/90 rounded-tl-xl" />*/}

        <div className="section-inner">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
            BRIGHT<br />THE FUTURE
          </h1>
          <p className="mt-6 max-w-2xl text-gray-300 text-base md:text-lg">
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
        </div>
      </section>
    </>
  );
}
