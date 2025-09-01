import React from 'react'
import { useOnScreen } from 'hooks/useOnScreen/useOnScreen.jsx';
import styles from 'components/Footer/Partners.module.css'

export default function Partners({ logos = [], stagger = 120 }) {
  const ref = React.useRef(null)
  const inView = useOnScreen(ref)

  return (
    <div ref={ref}>
      <div className="text-xs tracking-widest text-gray-500 mb-4">Partners</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
        {logos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Partner logo"
            // bez Tailwind `opacity-30` — animacja startuje z 0
            className={`h-6 w-auto grayscale ${styles.partner} ${inView ? styles.visible : ''}`}
            style={inView ? { animationDelay: `${i * stagger}ms` } : undefined}
          />
        ))}
      </div>
    </div>
  )
}