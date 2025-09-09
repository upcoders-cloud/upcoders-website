import React from "react";

export default function ScrollCueReveal({
                                          src,
                                          alt = "",
                                          attachTo = "#offer",
                                          enterFromX = 120,     // start: +X (prawo)
                                          enterFromY = 80,      // start: +Y (dół)
                                          fadeDistance = "vh",  // np. "50vh" albo px
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
      const t = Math.max(0, Math.min(1, p)); // 0→1
      // przy p=0: poza ekranem + opacity 0, przy p=1: na miejscu + opacity 1
      el.style.setProperty("--sc-op", String(t));
      el.style.setProperty("--sc-tx", `${(1 - t) * enterFromX}px`);
      el.style.setProperty("--sc-ty", `${(1 - t) * enterFromY}px`);
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

    // start od „ukrytego” stanu
    setP(0);
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
  }, [attachTo, fadeDistance, enterFromX, enterFromY, startOffset]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      aria-hidden={alt === "" ? "true" : undefined}
      className={`pointer-events-none select-none will-change-transform ${className}`}
      style={{
        opacity: "var(--sc-op, 0)",
        transform: "translate(var(--sc-tx,0px), var(--sc-ty,0px))",
        transition: "opacity 120ms linear",
      }}
    />
  );
}
