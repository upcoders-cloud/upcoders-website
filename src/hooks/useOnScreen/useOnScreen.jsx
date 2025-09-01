import * as React from 'react';

/**
 * useOnScreen(ref, options)
 * - ref: React.RefObject
 * - options: { root, rootMargin, threshold, once }
 *   - once: gdy true (domyślnie), odpinamy observer po pierwszym wejściu
 */
export function useOnScreen(
  ref,
  { root = null, rootMargin = '0px', threshold = 0.2, once = true } = {}
) {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref?.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { root, rootMargin, threshold });

    io.observe(el);
    return () => io.disconnect();
  }, [ref, root, rootMargin, threshold, once]);

  return inView;
}

/**
 * useOnScreenRef(options)
 * - Zwraca krotkę [ref, inView]
 * - Wygodne, gdy nie masz własnego refa
 */
export function useOnScreenRef(options) {
  const ref = React.useRef(null);
  const inView = useOnScreen(ref, options);
  return [ref, inView];
}
