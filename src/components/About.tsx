"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Stat {
  number: string;
  label: string;
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
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      style={{
        padding: "6rem 2rem",
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
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
              }}
            >
              About <span style={{ color: "var(--accent-blue)" }}>Me</span>
            </h2>

            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
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
                fontSize: "1.125rem",
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
            >
              Let&apos;s Work Together
            </motion.a>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "var(--bg-tertiary)",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Placeholder for image */}
              <div
                style={{
                  width: "80%",
                  height: "80%",
                  backgroundColor: "var(--accent-blue)",
                  borderRadius: "0.5rem",
                  opacity: 0.1,
                }}
              />

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: "20%",
                  right: "20%",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "var(--accent-emerald)",
                  borderRadius: "50%",
                  opacity: 0.8,
                }}
              />

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                style={{
                  position: "absolute",
                  bottom: "25%",
                  left: "15%",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "var(--accent-amber)",
                  borderRadius: "0.5rem",
                  opacity: 0.7,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginTop: "4rem",
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card"
              style={{ textAlign: "center", padding: "2rem" }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "var(--accent-blue)",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontWeight: "500" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
