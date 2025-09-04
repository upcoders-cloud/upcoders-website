import React from "react";
import Logo from 'assets/uc-logo.png'
import { NAV_ELEMENT as NavElement } from 'components/Navbar/index.js'
import { NavBarItem } from 'components/Navbar/NavBarItem/NavBarItem.jsx'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-bg-1">
      <h1 className="text-2xl font-bold tracking-wide text-white">
        <img src={/** @type {string} */ (Logo)} alt="Upcoders logo" className="h-8 w-auto" />
      </h1>
      <nav className="hidden md:flex space-x-6 text-gray-300">
        {NavElement.map((item) => (
          <NavBarItem key={item.id} item={item}/>
        ))}
      </nav>
    </header>
  );
}
