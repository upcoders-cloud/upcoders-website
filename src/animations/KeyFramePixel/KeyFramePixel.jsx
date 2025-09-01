import * as motion from "motion/react-client";

/**
 * KeyFramePixel – animowany „piksel”
 * Props:
 * - size: number (px)
 * - color: string (CSS color)
 * - customStyles: React.CSSProperties (nadpisuje domyślne style)
 * - className: string (Tailwind/klasy CSS)
 * - ...rest: dowolne propsy motion dla motion.div (np. initial, whileInView, onHoverStart)
 */
export default function KeyFramePixel({
                                        size = 100,
                                        color = "#f5f5f5",
                                        customStyles = {},
                                        className = "",
                                        ...rest
                                      }) {
  const baseStyles = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: 5,
  };

  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{ ...baseStyles, ...customStyles }}
      className={className}
      {...rest}
    />
  );
}
