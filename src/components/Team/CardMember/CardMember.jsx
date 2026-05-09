import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FaLinkedinIn } from 'react-icons/fa'
import FallingPixelsPattern from '@/animations/FallingPixelsPattern/FallingPixelsPattern.jsx'
import { isMobile } from 'react-device-detect'
import { useI18n } from '@/i18n/useI18n.js'

export default function CardMember({ member, index, length }) {
  const { t } = useI18n()
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

  // Subtle floating idle motion (replaces the harsh shake)
  const idle = {
    animate: {
      y: [0, -4, 0, 2, 0],
      rotate: [0, -0.4, 0.4, -0.2, 0],
    },
    transition: {
      duration: 6,
      delay: index * 0.6,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative group [perspective:1000px] [-webkit-perspective:1000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div {...idle}>
        <div
          className={[
            'relative w-full aspect-[387/464]',
            'transition-transform duration-700 ease-[var(--ease-out-expo)] will-change-transform',
            '[transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]',
            // desktop → flip via hover
            !isMobile ? 'group-hover:[transform:rotateY(180deg)]' : '',
            // mobile → flip via click
            isMobile && flipped ? '[transform:rotateY(180deg)]' : '',
          ].join(' ')}
        >
          {/* FRONT */}
          <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)]">
            <div className="relative h-full bg-[#1C1C1C] overflow-hidden ring-1 ring-white/5 transition-shadow duration-300 group-hover:ring-primary/30">
              {/* LinkedIn (front) */}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-200 ease-[var(--ease-out-quart)] z-10"
                  aria-label={`Open ${member.firstName} ${member.lastName} on LinkedIn`}
                >
                  <FaLinkedinIn size={16} />
                </a>
              )}

              {/* Image */}
              <img
                src={member.img}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />

              {/* Subtle bottom gradient for legibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-[5]" />

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
            <div className="relative h-full bg-[#1C1C1C] ring-1 ring-primary/30">
              {/* Dekor / tło */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-white/5 to-transparent pointer-events-none" />

              {/* LinkedIn (back) */}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full text-white hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-200 ease-[var(--ease-out-quart)] z-10"
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

                {(member.roleKey || member.role) && (
                  <p className="text-primary sm:text-sm md:text-[11px] lg:text-sm font-medium">
                    {member.roleKey ? t(member.roleKey) : member.role}
                  </p>
                )}

                {(member.aboutKey || member.about) && (
                  <p className="text-white sm:text-sm md:text-[11px] lg:text-sm leading-relaxed">
                    {member.aboutKey ? t(member.aboutKey) : member.about}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
