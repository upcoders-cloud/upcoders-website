// Kolejność i kotwice sekcji strony /offer. Kotwice są też używane przez
// akordeon na stronie głównej (components/Offer/index.js), więc ich zmiana
// wymaga aktualizacji obu miejsc.
export const OFFER_SERVICES = [
  {
    anchor: 'custom-software',
    key: 'customSoftware',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'React', 'REST API'],
  },
  {
    anchor: 'web-mobile',
    key: 'webMobile',
    tags: [
      'React',
      'Next.js',
      'React Native',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'WordPress',
      'Webflow',
    ],
    exampleProject: 'kaizen',
  },
  {
    anchor: 'design',
    key: 'design',
  },
  {
    anchor: 'ai-automation',
    key: 'aiAutomation',
  },
  {
    anchor: 'hosting',
    key: 'hosting',
    tiers: [{ key: 'basic' }, { key: 'pro', recommended: true }, { key: 'enterprise' }],
  },
]

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: 'easeOut' },
})

export const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { delay, duration: 0.45, ease: 'easeOut' },
})
