import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { FaLinkedinIn } from 'react-icons/fa'
import FallingPixelsPattern from '@/animations/FallingPixelsPattern/FallingPixelsPattern.jsx'
import { useI18n } from '@/i18n/useI18n.js'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

// Subtle floating idle motion (replaces the harsh shake)
const idleAnimation = {
  y: [0, -4, 0, 2, 0],
  rotate: [0, -0.4, 0.4, -0.2, 0],
}

export default function CardMember({ member, index }) {
  const { t } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [flipped, setFlipped] = useState(false)
  // true, gdy kartę obrócił kursor myszy; wtedy klik myszą nie cofa obrotu.
  const flippedByHover = useRef(false)
  const fullName = `${member.firstName} ${member.lastName}`

  // Obrót po najechaniu tylko na urządzeniach, które mają prawdziwy hover.
  // Dotyk i klawiatura obracają kartę przyciskiem.
  const handlePointerEnter = (event) => {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover)').matches) return
    flippedByHover.current = true
    setFlipped(true)
  }

  const handlePointerLeave = () => {
    if (!flippedByHover.current) return
    flippedByHover.current = false
    setFlipped(false)
  }

  const handleToggle = (event) => {
    // detail === 0 oznacza aktywację z klawiatury (Enter/Spacja).
    if (flippedByHover.current && event.detail > 0) return
    setFlipped((value) => !value)
  }

  const role = member.roleKey ? t(member.roleKey) : member.role
  const about = member.aboutKey ? t(member.aboutKey) : member.about

  return (
    <motion.li
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="relative [perspective:1000px] [-webkit-perspective:1000px]"
        animate={prefersReducedMotion ? undefined : idleAnimation}
        transition={{
          duration: 6,
          delay: index * 0.6,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <div
          className={[
            'relative w-full aspect-[387/464]',
            'transition-transform duration-700 ease-[var(--ease-out-expo)] will-change-transform motion-reduce:transition-none',
            '[transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]',
            flipped ? '[transform:rotateY(180deg)]' : '',
          ].join(' ')}
        >
          {/* FRONT */}
          <div
            aria-hidden={flipped}
            inert={flipped}
            className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)]"
          >
            {/* Rozmiar piksela zależy od szerokości karty (cqw), a imię skaluje się
                razem z nim, więc napis mieści się w niebieskim bloku przy każdej szerokości. */}
            <div className="@container [--pixel-cell:10.5cqw] relative h-full bg-[#1C1C1C] overflow-hidden ring-1 ring-white/5 transition-shadow duration-300 group-hover:ring-primary/30">
              <img
                src={member.img}
                alt=""
                width={680}
                height={680}
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
                  className="opacity-95"
                />
              </div>

              {/* Name */}
              <div className="absolute bottom-[calc(var(--pixel-cell)*0.55)] left-0 right-0 z-10">
                <h3 className="px-[calc(var(--pixel-cell)*0.55)] font-normal text-white text-left leading-[0.9] text-[length:calc(var(--pixel-cell)*1.05)]">
                  {member.firstName}
                  <br />
                  {member.lastName}
                </h3>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            aria-hidden={!flipped}
            inert={!flipped}
            className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
          >
            <div className="relative h-full bg-[#1C1C1C] ring-1 ring-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-white/5 to-transparent pointer-events-none" />

              <div className="relative h-full flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 text-white">
                <h3 className="font-normal text-lg sm:text-3xl md:text-lg lg:text-2xl xl:text-3xl leading-[0.95]">
                  {member.firstName}
                  <br />
                  {member.lastName}
                </h3>

                {role && (
                  <p className="text-primary-light text-xs sm:text-sm md:text-xs lg:text-sm font-medium">
                    {role}
                  </p>
                )}

                {about && (
                  <p className="text-white text-xs sm:text-sm md:text-xs lg:text-sm leading-relaxed">
                    {about}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Przycisk obrotu leży nad obiema stronami karty, więc fokus nie ginie,
            gdy odwrócona strona staje się nieaktywna. */}
        <button
          type="button"
          aria-pressed={flipped}
          aria-label={t('team.flipLabel').replace('{name}', fullName)}
          onClick={handleToggle}
          className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light"
        />

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1 right-1 z-30 flex w-11 h-11 items-center justify-center rounded-full text-white hover:bg-primary active:scale-95 transition-colors duration-200 ease-[var(--ease-out-quart)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            aria-label={t('team.linkedinLabel').replace('{name}', fullName)}
          >
            <FaLinkedinIn aria-hidden="true" size={16} />
          </a>
        )}
      </motion.div>
    </motion.li>
  )
}
