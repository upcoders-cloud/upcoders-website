import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedinIn } from 'react-icons/fa'
import FallingPixelsPattern from '@/animations/FallingPixelsPattern/FallingPixelsPattern.jsx'
import { isMobile } from 'react-device-detect'

export default function CardMember({ member, index, length }) {
  const [flipped, setFlipped] = useState(false)

  const handleMouseEnter = () => {
    if (!isMobile) setFlipped(true)
  }

  const handleMouseLeave = () => {
    if (!isMobile) setFlipped(false)
  }

  const handleClick = () => {
    if (isMobile) setFlipped(f => !f)
  }

  const shake = {
    animate: {
      x: [0, -3, 3, -2, 2, 0],
      rotate: [0, -1, 1, -0.5, 0.5, 0],
    },
    transition: {
      duration: 1,           // 1 sekunda drgania
      delay: index * 2,      // 0s, 2s, 4s, 6s
      repeat: Infinity,
      repeatDelay: (length - 1) * 2, // (4 - 1) * 2 = 6s
      ease: 'easeInOut',
    },
  }
  return (
    <motion.div
      {...shake}
      className="relative group [perspective:1000px] [-webkit-perspective:1000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={[
          'relative w-full aspect-[387/464]',
          'transition-transform duration-500 ease-out will-change-transform',
          '[transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]',

          // desktop → flip via hover
          !isMobile ? 'group-hover:[transform:rotateY(180deg)]' : '',

          // mobile → flip via click
          isMobile && flipped ? '[transform:rotateY(180deg)]' : '',
        ].join(' ')}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)]">
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
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Blue falling pixels */}
            <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
              <FallingPixelsPattern
                coords={member?.pattern?.coords}
                rows={member?.pattern?.rows}
                cols={member?.pattern?.cols}
                cell="var(--pixel-cell)"
                gap="0"
                color="#5271FF"
                duration={2.4}
                staggerFraction={0.7}
                className="opacity-95 [--pixel-cell:clamp(20px,6vw,40px)] sm:[--pixel-cell:clamp(10px,5vw,30px)] md:[--pixel-cell:clamp(8px,3.2vw,24px)] lg:[--pixel-cell:clamp(12px,3.2vw,28px)]"
              />
            </div>

            {/* Name */}
            <div className="absolute bottom-4 left-0 right-0 z-10">
              <p className="px-4 text-white text-left leading-[0.9] text-2xl sm:text-3xl md:text-2xl lg:text-3xl">
                {member.firstName}
                <br />
                {member.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* === BACK === */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <div className="relative h-full bg-[#1C1C1C]">
            {/* Dekor / tło */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A0CFFF]/40 via-[#FFFFFF]/5 to-transparent pointer-events-none" />

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
            <div className="relative h-full flex flex-col items-center justify-center gap-3 p-4 text-white">
              <h4 className="text-3xl sm:text-2xl md:text-lg lg:text-3xl leading-[0.95]">
                {member.firstName}
                <br />
                {member.lastName}
              </h4>

              {member.role && (
                <p className="text-primary sm:text-sm md:text-[11px] lg:text-sm font-medium">
                  {member.role}
                </p>
              )}

              {member.about && (
                <p className="text-white sm:text-sm md:text-[11px] lg:text-sm leading-relaxed">
                  {member.about}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
