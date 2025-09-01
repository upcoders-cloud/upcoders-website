import React from "react";
import ZigZag5 from "components/Decor/ZigZag5.jsx";
import Accordion from './Accordion.jsx'

export default function Offer() {
  return (
    <section id="offer" className="relative bg-bg-2 text-white section-wrapper">
      {/* Dekor w lewym dolnym rogu sekcji */}
      <ZigZag5 className="hidden md:block absolute left-8 bottom-8 opacity-90" size={12} />

      <div className="grid md:grid-cols-2 gap-12 section-inner">
        {/* LEFT */}
        <div>
          <h3 className="text-xs tracking-widest text-gray-400 mb-2">OFFER</h3>
          <h2 className="text-2xl md:text-[28px] font-semibold mb-4">
            We design and create applications tailored to the real processes of
            industrial, technical and manufacturing companies.
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            No ready-made solutions, no unnecessary features – only what really
            works and brings value.
          </p>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-xs tracking-widest text-gray-400 mb-4">WHAT DO WE SPECIALIZE IN?</h3>
          <ul className="space-y-4">
            <Accordion
              title="Tailored Software Solutions"
              content="We create software fully customized to your business processes."
            />
            <Accordion
              title="Agile Development"
              content="Our agile teams deliver value fast. We iterate quickly, adapt to change, and keep you in the loop at every step."
              open
            />
            <Accordion
              title="User-Centered Design"
              content="We craft intuitive, accessible, and engaging user experiences."
            />
            <Accordion
              title="Cloud & DevOps"
              content="Scalable infrastructure and modern CI/CD practices for reliability and speed."
            />
            <Accordion
              title="Cross-Platform Development"
              content="Apps that run smoothly on web, mobile, and desktop."
            />
            <Accordion
              title="Long-Term Tech Partnership"
              content="We partner for the long run, staying close to your evolving needs."
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
