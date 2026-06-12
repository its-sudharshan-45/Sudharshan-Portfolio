import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  theme: "light" | "dark";
}

export default function CustomCursor({ theme }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position coordinates of real cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth lagging spring config
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only mount on devices with a fine pointer (desktop) and touch support check
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = target.closest(
        'a, button, [role="button"], .cursor-pointer, input, textarea, select'
      );
      if (isClickable) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = target.closest(
        'a, button, [role="button"], .cursor-pointer, input, textarea, select'
      );
      if (isClickable) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        x: cursorSpringX,
        y: cursorSpringY,
        translateX: "-55%",
        translateY: "-55%",
        width: isHovered ? 24 : 12,
        height: isHovered ? 24 : 12,
        backgroundColor: theme === "dark" 
          ? "rgba(0, 245, 180, 0.15)" 
          : "rgba(13, 188, 149, 0.15)",
        border: theme === "dark"
          ? "1.5px solid rgba(0, 245, 180, 0.6)"
          : "1.5px solid rgba(13, 188, 149, 0.61)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    />
  );
}

