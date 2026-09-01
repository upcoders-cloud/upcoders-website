import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

export default function HeroHeadline({ line1, line2Prefix, line2PrefixDone, words }) {
  const safeWords = Array.isArray(words) && words.length > 0 ? words : ['FUTURE']
  const finalWord = safeWords[safeWords.length - 1]

  const [text, { isDone }] = useTypewriter({
    words: safeWords,
    loop: 1,
    cursorColor: '#5271FF',
  })

  const activePrefix = isDone ? line2PrefixDone : line2Prefix

  return (
    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
      {/*
        Dopóki trwa animacja, pełna treść nagłówka jest w DOM w wersji dla
        czytników. Bez tego robot indeksujący potrafi utrwalić H1 w połowie
        animacji, np. jako "TWORZYMY LEPSZE PRODUK". Po jej zakończeniu kopia
        znika, żeby fraza nie występowała w H1 dwa razy.
      */}
      {!isDone && (
        <span className="sr-only">{`${line1} ${line2PrefixDone} ${finalWord}`}</span>
      )}

      <span aria-hidden="true">
        {line1}
        <br />
        {activePrefix}&nbsp;
        <span className="inline-flex items-baseline font-extrabold ">
          <span className={isDone ? 'text-[#C7FF7F]' : ''}>{text}</span>
          <span className="inline-block align-baseline translate-y-[-0.06em]">
            {!isDone && <Cursor cursorColor="#5271FF" />}
          </span>
        </span>
      </span>
    </h1>
  )
}
