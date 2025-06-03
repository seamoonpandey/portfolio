"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    // Frontend
    { name: "React", level: 95, category: "Frontend" },
    { name: "Next.js", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "HTML/CSS", level: 98, category: "Frontend" },

    // Backend
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Express", level: 80, category: "Backend" },
    { name: "Python", level: 75, category: "Backend" },
    { name: "PostgreSQL", level: 78, category: "Backend" },
    { name: "MongoDB", level: 82, category: "Backend" },

    // Tools
    { name: "Git", level: 90, category: "Tools" },
    { name: "Docker", level: 70, category: "Tools" },
    { name: "AWS", level: 65, category: "Tools" },
    { name: "Figma", level: 85, category: "Tools" },
  ];

  const categories = ["Frontend", "Backend", "Tools"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "var(--accent-blue)"; // Now turquoise/teal/mint
      case "Backend":
        return "var(--accent-emerald)";
      case "Tools":
        return "var(--accent-amber)";
      default:
        return "var(--text-secondary)";
    }
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      style={{ padding: "6rem 2rem", backgroundColor: "var(--bg-secondary)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            My <span style={{ color: "var(--accent-blue)" }}>Skills</span>
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Here are the technologies and tools I work with to bring ideas to
            life
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
          }}
        >
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              className="card"
              style={{ padding: "2rem" }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                  color: getCategoryColor(category),
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: categoryIndex * 0.2 + index * 0.1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span style={{ fontWeight: "500" }}>{skill.name}</span>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--text-tertiary)",
                            fontWeight: "500",
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          height: "8px",
                          backgroundColor: "var(--bg-tertiary)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          style={{
                            height: "100%",
                            backgroundColor: getCategoryColor(category),
                            borderRadius: "4px",
                          }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.2 + index * 0.1 + 0.5,
                            ease: "easeOut",
                          }}
                          whileHover={{
                            opacity: hoveredSkill === skill.name ? 0.8 : 1,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ marginTop: "4rem", textAlign: "center" }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "2rem",
            }}
          >
            Also familiar with
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {[
              "Redux",
              "GraphQL",
              "Jest",
              "Cypress",
              "Webpack",
              "Vite",
              "Tailwind CSS",
              "Material-UI",
              "Firebase",
              "Supabase",
              "Vercel",
              "Netlify",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--bg-tertiary)",
                  borderRadius: "1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-light)",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "var(--accent-blue)",
                  color: "white",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
