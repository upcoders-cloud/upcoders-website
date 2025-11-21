import React from "react";
import ZigZag5 from "components/Decor/ZigZag5.jsx";
import { OFFER_ITEMS } from "./index.js";
import Accordion from 'components/Offer/Accordion/Accordion.jsx'
import { isMobile } from 'react-device-detect'

export default function Offer() {
  return (
    <section id="offer" className="relative bg-bg-2 text-white section-wrapper overflow-hidden">
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
          {!isMobile && (
            <ZigZag5 size={16} className="opacity-90 mt-16" />
          )}
        </div>

        <div>
          <h3 className="text-xs tracking-widest text-gray-400 mb-4">WHAT DO WE SPECIALIZE IN?</h3>
          <Accordion items={OFFER_ITEMS} defaultOpenIndex={0} />
          {isMobile && (
              <ZigZag5 size={14} className="opacity-90 mt-10 mx-auto" />
          )}
        </div>
      </div>
    </section>
  );
}
