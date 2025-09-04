import React from "react";
import KeyFramePixel from "@/animations/KeyFramePixel/KeyFramePixel.jsx";

export default function ContactHeader() {
  return (
    <div className="relative">
      <KeyFramePixel
        size={30}
        color="#5271FF"
        customStyles={{ position: "absolute", top: -45, left: 0 }}
      />
      <h2 className="w-fit text-4xl md:text-5xl font-semibold leading-tight">
        Let’s talk about
        <br /> your project!
      </h2>
      <p className="mt-6 text-gray-300 max-w-md">
        Leave us your e-mail address and phone number.
        <br />
        We will contact you within 48 hours.
      </p>
    </div>
  );
}
