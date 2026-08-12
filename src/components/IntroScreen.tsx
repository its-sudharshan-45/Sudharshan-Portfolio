import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroScreenProps {
  theme: "light" | "dark";
}

export default function IntroScreen({ theme }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);

  // Show for 2.8 s total (text animates in, lingers, then overlay fades out)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);

  /* ── exact tokens from App.tsx ── */
  const bg      = theme === "dark" ? "#060b13"  : "#f8fafc";
  const accent  = theme === "dark" ? "#00f5b4"  : "#0dbc95";
  const primary = theme === "dark" ? "#ffffff"  : "#0f172a";

  /* ── same grid background as App.tsx ── */
  const gridStyle: React.CSSProperties =
    theme === "dark"
      ? {
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.03,
        }
      : {
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 1,
        };

  /* ── cubic-bezier ease ── */
  const snap: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: bg }}
        >
          {/* Grid pattern — pixel-perfect match to portfolio */}
          <div className="absolute inset-0 pointer-events-none" style={gridStyle} />

          {/* Subtle ambient glow matching portfolio's teal glows */}
          <div
            className="absolute pointer-events-none rounded-full blur-[120px]"
            style={{
              width: "min(55vw, 480px)",
              height: "min(55vw, 480px)",
              background: accent,
              opacity: theme === "dark" ? 0.06 : 0.07,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Text block */}
          <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2 select-none">

            {/* Thin top rule — premium detail */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="mb-5 sm:mb-7 origin-center"
              style={{
                width: "clamp(2rem, 6vw, 3.5rem)",
                height: "2px",
                background: accent,
                borderRadius: "9999px",
              }}
            />

            {/* Line 1 — "Explore my" */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: snap, delay: 0.15 }}
                className="block font-sans font-black tracking-tight leading-none"
                style={{
                  fontSize: "clamp(1.9rem, 7vw, 5.0rem)",
                  color: primary,
                  letterSpacing: "-0.03em",
                }}
              >
                Explore my
              </motion.span>
            </div>

            {/* Line 2 — "Digital Presence" */}
            <div className="overflow-hidden pb-2">
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: snap, delay: 0.35 }}
                className="block font-sans font-black tracking-tight leading-none"
                style={{
                  fontSize: "clamp(1.9rem, 7vw, 5.0rem)",
                  color: accent,
                  letterSpacing: "-0.03em",
                }}
              >
                Digital Presence
              </motion.span>
            </div>

            {/* Thin bottom rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="mt-5 sm:mt-7 origin-center"
              style={{
                width: "clamp(2rem, 6vw, 3.5rem)",
                height: "2px",
                background: accent,
                borderRadius: "9999px",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
