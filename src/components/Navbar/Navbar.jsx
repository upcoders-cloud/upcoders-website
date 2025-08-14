import React from "react";
import Logo from "../../assets/uc-logo.png";

const NavElement = [
  { href: "#offer", label: "Offer" },
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-bg-1">
      <h1 className="text-2xl font-bold tracking-wide text-white">
        <img src={Logo} alt="Upcoders logo" className="h-8 w-auto" />
      </h1>
      <nav className="hidden md:flex space-x-6 text-gray-300">
        {NavElement.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(item.href).scrollIntoView({ behavior: "smooth" });
            }}
            className="px-3 py-1 border border-transparent rounded transition-all duration-300 hover:border-primary hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
