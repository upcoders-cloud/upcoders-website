import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion/usePrefersReducedMotion.js'

export default function HeroHeadline({ line1, line2Prefix, line2PrefixDone, words }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const safeWords = Array.isArray(words) && words.length > 0 ? words : ['FUTURE']
  const finalWord = safeWords[safeWords.length - 1]

  const [typedText, { isDone: isTypingDone }] = useTypewriter({
    words: safeWords,
    loop: 1,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 1200,
  })

  // Przy ograniczonym ruchu od razu pokazujemy końcowy stan nagłówka.
  const isDone = prefersReducedMotion || isTypingDone
  const text = prefersReducedMotion ? finalWord : typedText
  const activePrefix = isDone ? line2PrefixDone : line2Prefix

  return (
    // Każda linia to osobny blok bez zawijania, a font rośnie tylko do rozmiaru,
    // przy którym najdłuższe słowo mieści się w kolumnie. Dzięki temu wysokość
    // H1 nie zmienia się podczas pisania i nic pod nim nie skacze.
    <h1 className="text-[clamp(2.5rem,12.5vw,6rem)] lg:text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
      {/*
        Dopóki trwa animacja, pełna treść nagłówka jest w DOM w wersji dla
        czytników. Bez tego robot indeksujący potrafi utrwalić H1 w połowie
        animacji, np. jako "TWORZYMY LEPSZE PRODUK". Po jej zakończeniu kopia
        znika, żeby fraza nie występowała w H1 dwa razy.
      */}
      {!isDone && <span className="sr-only">{`${line1} ${line2PrefixDone} ${finalWord}`}</span>}

      {/* Po zakończeniu animacji widoczny tekst jest jedyną treścią H1, więc nie może być ukryty. */}
      <span aria-hidden={isDone ? undefined : true}>
        <span className="block whitespace-nowrap">{line1}</span>{' '}
        <span className="block whitespace-nowrap">{activePrefix}</span>{' '}
        <span className="flex min-h-[0.95em] items-baseline whitespace-nowrap">
          <span className={isDone ? 'text-[#C7FF7F]' : ''}>{text}</span>
          {!isDone && (
            <span className="inline-block translate-y-[-0.06em]">
              <Cursor cursorColor="#5271FF" />
            </span>
          )}
        </span>
      </span>
    </h1>
  )
}
