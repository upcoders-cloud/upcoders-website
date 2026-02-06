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
            We design and build digital products tailored to real business needs, everyday
            workflows, and long-term growth.
          </h2>

          <p className="text-gray-400 text-sm md:text-base">
            We are a modern startup-driven team focused on creating high-quality
            web and mobile applications for companies that want to move faster, work smarter, and
            build better digital experiences.
          </p>

          <p className="text-gray-400 text-sm md:text-base mt-4">
            We also explore emerging technologies - including artificial intelligence and automation
            - to help our clients unlock new opportunities, optimize processes, and stay ahead in a
            rapidly changing world.
          </p>

          {!isMobile && <ZigZag5 size={16} className="opacity-90 mt-16" />}
        </div>

        <div>
          <h3 className="text-xs tracking-widest text-gray-400 mb-4">WHAT DO WE SPECIALIZE IN?</h3>
          <Accordion items={OFFER_ITEMS} defaultOpenIndex={0} />
          {isMobile && <ZigZag5 size={14} className="opacity-90 mt-10 mx-auto" />}
        </div>
      </div>
    </section>
  )
}
