import React from "react";
import InteractiveDots from "@/animations/InteractiveDots/InteractiveDots.jsx";
import ContactHeader from 'components/Contact/ContactHeader/ContactHeader.jsx'
import ContactForm from 'components/Contact/ContactForm/ContactForm.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative text-white section-wrapper">
      <InteractiveDots className="pointer-events-none absolute inset-0" />
      <div className="grid md:grid-cols-2 gap-12 items-center section-inner">
        <ContactHeader />
        <ContactForm />
      </div>
    </section>
  );
}
