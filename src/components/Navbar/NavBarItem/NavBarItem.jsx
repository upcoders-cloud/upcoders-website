import React from "react";

export const NavBarItem = ({
                             item,
                             href,
                             label,
                             children,
                             className = "",
                             onClick,
                           }) => {
  const linkHref = href ?? item?.href ?? "#";
  const linkLabel = label ?? children ?? item?.label ?? "";

  const handleClick = (e) => {
    if (onClick) onClick(e);

    if (linkHref.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(linkHref);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a href={linkHref} onClick={handleClick} className={className}>
      {linkLabel}
    </a>
  );
};
