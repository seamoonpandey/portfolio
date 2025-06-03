"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
}

function TypewriterText({ texts }: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));

          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-accent">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const mouseX = useTransform(() =>
    isClient && typeof window !== "undefined"
      ? (mousePosition.x - window.innerWidth / 2) * 0.01
      : 0
  );
  const mouseY = useTransform(() =>
    isClient && typeof window !== "undefined"
      ? (mousePosition.y - window.innerHeight / 2) * 0.01
      : 0
  );

  const codeSnippets = [
    "const developer = 'Seamoon';",
    "function createMagic() {",
    "  return innovation;",
    "}",
    "// Building dreams",
    "React.render(<Future />)",
  ];

  // Fixed positions to avoid hydration issues
  const snippetPositions = [
    { left: 15, top: 20 },
    { left: 85, top: 15 },
    { left: 10, top: 70 },
    { left: 80, top: 75 },
    { left: 20, top: 85 },
    { left: 90, top: 60 },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      <motion.div
        style={{
          y,
          opacity,
          scale,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "800px", padding: "0 2rem" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              lineHeight: "1.1",
            }}
          >
            Hi, I&apos;m{" "}
            <span style={{ color: "var(--accent-blue)" }}>Seamoon</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "1.5rem", marginBottom: "2rem" }}
          >
            <TypewriterText
              texts={[
                "Full Stack Developer",
                "UI/UX Designer",
                "Problem Solver",
              ]}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              marginBottom: "3rem",
              maxWidth: "600px",
              margin: "0 auto 3rem",
            }}
          >
            I craft beautiful, functional web experiences with modern
            technologies. Passionate about clean code, elegant design, and
            innovative solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating code snippets */}
      {isClient && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {codeSnippets.map((snippet, index) => (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                left: `${snippetPositions[index].left}%`,
                top: `${snippetPositions[index].top}%`,
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.875rem",
                color: "var(--text-tertiary)",
                opacity: 0.3,
                pointerEvents: "none",
                x: mouseX,
                rotateY: mouseY,
              }}
              animate={{
                y: [-20, 20],
              }}
              transition={{
                y: {
                  duration: 3 + index,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              {snippet}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
