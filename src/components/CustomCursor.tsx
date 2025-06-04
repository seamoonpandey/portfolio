"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Cancel previous animation frame to prevent queuing
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Use requestAnimationFrame for smoother updates
      rafId.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [data-cursor="pointer"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Use passive event listener for better performance
    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 50,
          mixBlendMode: "difference",
          willChange: "transform", // Optimize for animations
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800, // Increased for faster response
          damping: 25, // Reduced for quicker settling
          mass: 0.2, // Reduced for lighter feel
          restDelta: 0.01, // Smaller rest threshold for immediate response
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 49,
          willChange: "transform", // Optimize for animations
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150, // Increased for better following
          damping: 15, // Reduced for smoother trail
          mass: 0.8, // Slightly reduced
          restDelta: 0.01, // Smaller rest threshold
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "2px solid #a855f7",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        />
      </motion.div>
    </>
  );
}
