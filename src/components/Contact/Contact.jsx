import React from "react";
import ArrowRight from 'components/utils/ArrowRight.jsx'
import FieldWrapper from './FieldWrapper.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg-1 text-white section-wrapper">
      <div className="grid md:grid-cols-2 gap-12 items-center section-inner">
        {/* LEFT: copy stylu ze screena */}
        <div className="relative">
          {/* mały niebieski kwadrat u góry */}
          <span className="absolute -top-6 -left-4 w-6 h-6 bg-primary-light rounded-sm" />
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Let’s talk about
            <br /> your project!
          </h2>
          <p className="mt-6 text-gray-300 max-w-md">
            Leave us your e-mail address and phone number.
            <br />We will contact you within 48 hours.
          </p>
        </div>

        {/* RIGHT: karta z “warstwami” + formularz underline */}
        <div className="relative">
          {/* warstwy pod spodem (offset) */}
          <div className="absolute -right-3 -top-3 w-full h-full bg-[#1F1F1F] rounded-lg opacity-70" />
          <div className="absolute -right-6 -top-6 w-full h-full bg-[#171717] rounded-lg opacity-60" />
          {/* główna karta */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative bg-[#2B2B2B] rounded-lg p-6 md:p-7 w-full shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          >
            <FieldWrapper label="Email">
              <input
                type="email"
                placeholder="Placeholder"
                className="w-full bg-transparent outline-none border-b border-gray-600/80 focus:border-primary/90 py-3 text-sm placeholder:text-gray-400"
                required
              />
            </FieldWrapper>

            <FieldWrapper label="Phone number" className="mt-4">
              <input
                type="tel"
                placeholder="Placeholder"
                className="w-full bg-transparent outline-none border-b border-gray-600/80 focus:border-primary/90 py-3 text-sm placeholder:text-gray-400"
              />
            </FieldWrapper>

            <label className="mt-5 flex items-start gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-primary"
                required
              />
              <span className="leading-relaxed">
                Zgoda Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
                lorem ea sem pharetra cursus. Nam vestibulum, arcu non hendrerit fringilla,
                eros mauris semper lorem, ut porta quam magna et erat.
              </span>
            </label>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-light px-5 py-3 text-sm font-medium transition-colors"
              >
                WYŚLIJ WIADOMOŚĆ
                <ArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}