import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

export default function HeroHeadline({ line1, line2Prefix, line2PrefixDone, words }) {
  const safeWords = Array.isArray(words) && words.length > 0 ? words : ['FUTURE']

  const [text, { isDone }] = useTypewriter({
    words: safeWords,
    loop: 1,
    cursorColor: '#5271FF',
  })

  const activePrefix = isDone ? line2PrefixDone : line2Prefix

  return (
    <h1 className="text-6xl md:text-8xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight">
      {line1}
      <br />
      {activePrefix}&nbsp;
      <span className="inline-flex items-baseline font-extrabold ">
        <span className={isDone ? 'text-[#C7FF7F]' : ''}>{text}</span>
        <span className="inline-block align-baseline translate-y-[-0.06em]">
          {!isDone && <Cursor cursorColor="#5271FF" />}
        </span>
      </span>
    </h1>
  )
}
