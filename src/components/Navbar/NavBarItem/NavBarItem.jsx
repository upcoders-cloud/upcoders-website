import React from 'react'

export const NavBarItem = ({item}) => {
  return (
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
  )
}
