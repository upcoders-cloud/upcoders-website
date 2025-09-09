import React from "react";

export default function ScrollCueHide({
                                        src,
                                        alt = "",
                                        attachTo = "#offer",
                                        maxTranslateX = 80,   // px w lewo przy p=1
                                        maxTranslateY = 40,   // px w górę przy p=1
                                        fadeDistance = "vh",  // może być np. "50vh" albo liczba px
                                        startOffset = 0,
                                        className = "",
                                      }) {
  const ref = React.useRef(null);
  const raf = React.useRef(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.querySelector(attachTo) || el.parentElement;

    const setP = (p) => {
      const t = Math.max(0, Math.min(1, p));
      el.style.setProperty("--sc-op", String(1 - t));
      el.style.setProperty("--sc-tx", `${-t * maxTranslateX}px`);
      el.style.setProperty("--sc-ty", `${-t * maxTranslateY}px`);
    };

    const compute = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const distance = (() => {
        if (fadeDistance === "vh") return vh;
        if (typeof fadeDistance === "number") return fadeDistance;
        if (typeof fadeDistance === "string") {
          const m = fadeDistance.trim().toLowerCase().match(/^([\d.]+)vh$/);
          if (m) return (parseFloat(m[1]) / 100) * vh;
        }
        return vh;
      })();
      const startTrigger = vh - startOffset;
      const p = (startTrigger - rect.top) / distance;
      setP(p);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf.current = requestAnimationFrame(() => { compute(); ticking = false; });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(root);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, [attachTo, fadeDistance, maxTranslateX, maxTranslateY, startOffset]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      aria-hidden={alt === "" ? "true" : undefined}
      className={`pointer-events-none select-none will-change-transform ${className}`}
      style={{
        opacity: "var(--sc-op, 1)",
        transform: "translate(var(--sc-tx,0px), var(--sc-ty,0px))",
        transition: "opacity 120ms linear",
      }}
    />
  );
}
