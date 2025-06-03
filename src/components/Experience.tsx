"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const experiences: Experience[] = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description: [
        "Led development of 5+ high-traffic web applications using React and Node.js",
        "Improved application performance by 40% through code optimization and caching strategies",
        "Mentored junior developers and established coding standards for the team",
        "Collaborated with design team to implement pixel-perfect, responsive interfaces",
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Inc",
      period: "2021 - 2022",
      description: [
        "Developed responsive websites for 20+ clients using modern JavaScript frameworks",
        "Integrated RESTful APIs and GraphQL endpoints for dynamic content management",
        "Optimized website loading speeds, achieving 95+ Lighthouse performance scores",
        "Implemented accessibility standards ensuring WCAG 2.1 AA compliance",
      ],
      technologies: ["React", "Next.js", "GraphQL", "Tailwind CSS", "Figma"],
    },
    {
      title: "Junior Web Developer",
      company: "StartupXYZ",
      period: "2020 - 2021",
      description: [
        "Built and maintained company website using HTML, CSS, and JavaScript",
        "Assisted in developing internal tools that improved team productivity by 25%",
        "Participated in code reviews and agile development processes",
        "Created documentation for development workflows and best practices",
      ],
      technologies: ["JavaScript", "HTML/CSS", "PHP", "MySQL", "Git"],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="experience"
      style={{ padding: "6rem 2rem" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
            Work <span style={{ color: "var(--accent-blue)" }}>Experience</span>
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            My professional journey and the impact I&apos;ve made along the way
          </p>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <motion.div
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "var(--border-light)",
            }}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "3rem" }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                style={{ position: "relative", paddingLeft: "4rem" }}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "1rem",
                    width: "18px",
                    height: "18px",
                    backgroundColor: "var(--accent-blue)",
                    borderRadius: "50%",
                    border: "4px solid var(--bg-primary)",
                    zIndex: 10,
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                />

                <motion.div
                  className="card"
                  style={{ padding: "2rem" }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent-blue)",
                          fontWeight: "500",
                          fontSize: "1.125rem",
                        }}
                      >
                        {exp.company}
                      </span>
                      <span
                        style={{
                          color: "var(--text-tertiary)",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      marginBottom: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        style={{
                          color: "var(--text-secondary)",
                          lineHeight: "1.6",
                          paddingLeft: "1rem",
                          position: "relative",
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.2 + i * 0.1 + 0.5,
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0.5rem",
                            width: "4px",
                            height: "4px",
                            backgroundColor: "var(--accent-blue)",
                            borderRadius: "50%",
                          }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        style={{
                          padding: "0.25rem 0.75rem",
                          backgroundColor: "var(--bg-secondary)",
                          borderRadius: "1rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border-light)",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + i * 0.05 + 0.8,
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "var(--accent-blue)",
                          color: "white",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
