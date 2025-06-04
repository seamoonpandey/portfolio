"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Stat {
  number: string;
  label: string;
}

function SnakeGameBox() {
  // Config
  const boxSize = 320;
  const gridSize = 16;
  const cellSize = boxSize / gridSize;
  const initialSnake = [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ];
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState<{ x: number; y: number }>({
    x: 1,
    y: 0,
  });
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 12, y: 8 });

  // Move snake automatically
  useEffect(() => {
    let frame: number;
    let lastMove = Date.now();
    function move() {
      const now = Date.now();
      if (now - lastMove > 120) {
        setSnake((prev) => {
          const head = { ...prev[0] };
          let newDir = { ...direction };
          // Simple AI: turn toward food if not aligned
          if (true) {
            if (head.x < food.x) newDir = { x: 1, y: 0 };
            else if (head.x > food.x) newDir = { x: -1, y: 0 };
            else if (head.y < food.y) newDir = { x: 0, y: 1 };
            else if (head.y > food.y) newDir = { x: 0, y: -1 };
          }
          setDirection(newDir);
          const next = { x: head.x + newDir.x, y: head.y + newDir.y };
          // Wrap around
          next.x = (next.x + gridSize) % gridSize;
          next.y = (next.y + gridSize) % gridSize;
          const newSnake = [next, ...prev];
          // Eat food
          if (next.x === food.x && next.y === food.y) {
            setFood({
              x: Math.floor(Math.random() * gridSize),
              y: Math.floor(Math.random() * gridSize),
            });
          } else {
            newSnake.pop();
          }
          return newSnake;
        });
        lastMove = now;
      }
      frame = requestAnimationFrame(move);
    }
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [direction, food]);

  return (
    <div
      style={{
        width: boxSize,
        height: boxSize,
        background: "rgba(20,20,20,0.08)",
        borderRadius: "1.5rem",
        border: "1.5px solid #43e97b2e",
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
        boxShadow: "0 8px 32px #14e0c71a, 0 1.5px 16px #43e97b1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Food */}
      <div
        style={{
          position: "absolute",
          left: food.x * cellSize,
          top: food.y * cellSize,
          width: cellSize,
          height: cellSize,
          background: "var(--accent-amber)",
          borderRadius: "0.4rem",
          boxShadow: "0 0 8px #fbbf24aa",
        }}
      />
      {/* Snake */}
      {snake.map((seg, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: seg.x * cellSize,
            top: seg.y * cellSize,
            width: cellSize,
            height: cellSize,
            background:
              i === 0 ? "var(--accent-blue)" : "var(--accent-emerald)",
            borderRadius: i === 0 ? "0.5rem" : "0.3rem",
            boxShadow: i === 0 ? "0 0 12px #38f9d7aa" : undefined,
            transition: "left 0.1s linear, top 0.1s linear",
            zIndex: 2,
          }}
        />
      ))}
      {/* Grid overlay (optional) */}
      <svg
        width={boxSize}
        height={boxSize}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {[...Array(gridSize + 1)].map((_, i) => (
          <line
            key={"v" + i}
            x1={i * cellSize}
            y1={0}
            x2={i * cellSize}
            y2={boxSize}
            stroke="#43e97b22"
            strokeWidth={1}
          />
        ))}
        {[...Array(gridSize + 1)].map((_, i) => (
          <line
            key={"h" + i}
            x1={0}
            y1={i * cellSize}
            x2={boxSize}
            y2={i * cellSize}
            stroke="#43e97b22"
            strokeWidth={1}
          />
        ))}
      </svg>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats: Stat[] = [
    { number: "10+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      style={{
        padding: "clamp(3rem, 8vw, 6rem) 1rem",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          y,
          opacity,
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr", // Mobile: single column
            gap: "3rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              order: 2, // Mobile: text comes second
            }}
            className="about-text"
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 2.5rem)",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                lineHeight: "1.2",
              }}
            >
              About <span style={{ color: "var(--accent-blue)" }}>Me</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
                lineHeight: "1.7",
              }}
            >
              I&apos;m a passionate full-stack developer with a keen eye for
              design and a love for creating seamless digital experiences. With
              over 3 years of experience in web development, I specialize in
              modern JavaScript frameworks and responsive design.
            </p>

            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: "1.7",
              }}
            >
              When I&apos;m not coding, you can find me exploring new
              technologies, contributing to open-source projects, or enjoying a
              good cup of coffee while sketching out my next big idea.
            </p>

            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                padding:
                  "clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 4vw, 1.5rem)",
              }}
            >
              Let&apos;s Work Together
            </motion.a>
          </motion.div>

          {/* Snake Game Visual Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              order: 1, // Mobile: snake game comes first
            }}
            className="about-visual"
          >
            <SnakeGameBox />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1.5rem",
            marginTop: "clamp(3rem, 6vw, 4rem)",
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card"
              style={{
                textAlign: "center",
                padding: "clamp(1.25rem, 3vw, 2rem)",
                background:
                  "linear-gradient(120deg, #14e0c71a 0%, #ffffff26 100%)",
                border: "1.5px solid #43e97b2e",
                borderRadius: "1.5rem",
                boxShadow: "0 4px 24px #14e0c71a",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px #14e0c71a" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <h3
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: "bold",
                  color: "var(--accent-blue)",
                  marginBottom: "0.5rem",
                  textShadow: "0 2px 8px #14e0c733",
                }}
              >
                {stat.number}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                }}
              >
                {stat.label}
              </p>
              {/* Decorative floating dot */}
              <motion.span
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "10%",
                  width: "18px",
                  height: "18px",
                  background: "var(--accent-blue)",
                  borderRadius: "50%",
                  opacity: 0.15,
                  filter: "blur(2px)",
                }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 400px !important;
          }
          .about-text {
            order: 1 !important;
          }
          .about-visual {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
