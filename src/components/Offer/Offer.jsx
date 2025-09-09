import React from "react";
import ZigZag5 from "components/Decor/ZigZag5.jsx";
import { OFFER_ITEMS } from "./index.js";
import Accordion from 'components/Offer/Accordion/Accordion.jsx'
import ScrollCueHide from 'components/Decor/ScrollCueHide.jsx'
import ScrollCueReveal from 'components/Decor/ScrollCueReveal.jsx'

import scrollcue from "assets/scrollcue-img.png";
import scrollreveal from "assets/scrollreveal-img.png";

export default function Offer() {
  return (
    <section id="offer" className="relative bg-bg-2 text-white section-wrapper overflow-hidden">
      <ScrollCueHide
        src={scrollcue}
        attachTo="#offer"
        className="hidden md:block absolute -top-6 left-0 h-[120px] md:h-[160px] lg:h-[260px] w-auto"
        maxTranslateX={60}
        maxTranslateY={0}
        fadeDistance="40vh"
        startOffset={300}
      />
      <ZigZag5 className="hidden md:block absolute left-8 bottom-12" size={16}/>
      <div className="grid md:grid-cols-2 gap-12 section-inner">
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

        <div>
          <h3 className="text-xs tracking-widest text-gray-400 mb-4">WHAT DO WE SPECIALIZE IN?</h3>
          <Accordion items={OFFER_ITEMS} defaultOpenIndex={1} />
        </div>
      </div>
      <ScrollCueReveal
        src={scrollreveal}
        attachTo="#offer"
        className="hidden md:block absolute -bottom-6 right-0 h-[120px] md:h-[160px] lg:h-[260px] w-auto"
        enterFromX={60}
        enterFromY={0}
        fadeDistance="40vh"
        startOffset={300}
      />
    </section>
  );
}
