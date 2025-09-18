import React, { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import FallingPixelsPattern from "@/animations/FallingPixelsPattern/FallingPixelsPattern.jsx";

export default function CardMember({ member, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative group [perspective:1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)} // tap na mobile
      role="button"
      aria-pressed={flipped}
    >
      <div
        className={[
          "relative w-full aspect-[387/464]",
          "transition-transform duration-500 ease-out will-change-transform",
          "[transform-style:preserve-3d]",
          "group-hover:[transform:rotateY(180deg)] focus-within:[transform:rotateY(180deg)]",
          flipped ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        {/* === FRONT === */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative h-full bg-[#1C1C1C] overflow-hidden">
            {/* LinkedIn (front) */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-primary transition z-10"
                aria-label={`Open ${member.firstName} ${member.lastName} on LinkedIn`}
              >
                <FaLinkedinIn size={16} />
              </a>
            )}

            {/* Image */}
            <img
              src={member.img}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-full h-full object-cover grayscale"
            />

            {/* Blue falling pixels */}
            <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
              <FallingPixelsPattern
                coords={member?.pattern?.coords}
                rows={member?.pattern?.rows}
                cols={member?.pattern?.cols}
                cell="clamp(10px, 4vw, 34px)"
                gap="0"
                color="#5271FF"
                duration={2.4}
                staggerFraction={0.7}
                className="opacity-95"
              />
            </div>

            {/* Name */}
            <div className="absolute bottom-4 left-0 right-0 z-10">
              <p className="px-4 text-white text-left leading-[0.9] text-2xl sm:text-3xl md:text-4xl">
                {member.firstName}
                <br />
                {member.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* === BACK === */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="relative h-full bg-[#1C1C1C]">
            {/* Dekor / tło */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent pointer-events-none" />

            {/* LinkedIn (back) */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-primary transition z-10"
                aria-label={`Open ${member.firstName} ${member.lastName} on LinkedIn`}
              >
                <FaLinkedinIn size={16} />
              </a>
            )}

            {/* Treść „back side” */}
            <div className="relative h-full flex flex-col justify-end gap-3 p-4 text-white">
              <h4 className="text-2xl sm:text-3xl md:text-4xl leading-none">
                {member.firstName}
                <br />
                {member.lastName}
              </h4>

              {member.role && (
                <p className="text-primary text-sm font-medium">{member.role}</p>
              )}

              {member.about && (
                <p className="text-gray-300 text-sm">
                  {member.about}
                </p>
              )}

              {Array.isArray(member.tags) && member.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {member.tags.slice(0, 6).map((t) => (
                    <li
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ułatwienie dla klawiatury (focus) */}
      <button
        className="sr-only"
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
