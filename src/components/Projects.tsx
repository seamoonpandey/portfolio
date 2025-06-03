"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  projects,
  categories,
  getCategoryEmoji,
  type Project,
} from "@/data/projects";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeProject, setActiveProject] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveProject(0);
  };

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProjectDetail();
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section
      ref={containerRef}
      id="projects"
      style={{
        padding: "8rem 2rem",
        backgroundColor: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Parallax Background Elements */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          y: backgroundY,
          opacity: 0.05,
          background:
            "radial-gradient(circle at 20% 80%, var(--accent-blue) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--accent-emerald) 0%, transparent 50%)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <motion.h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: "800",
                marginBottom: "1.5rem",
                background:
                  "linear-gradient(135deg, var(--text-primary) 0%, var(--accent-blue) 50%, var(--accent-emerald) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My <span style={{ color: "var(--accent-blue)" }}>Projects</span>
            </motion.h2>
            <motion.p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "var(--text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A collection of projects that showcase my journey in software
              development, from academic learning to production-ready
              applications
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "4rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: "0.8rem 1.5rem",
                backgroundColor:
                  activeCategory === category
                    ? "var(--accent-blue)"
                    : "var(--bg-tertiary)",
                color:
                  activeCategory === category ? "white" : "var(--text-primary)",
                border:
                  activeCategory === category
                    ? "2px solid var(--accent-blue)"
                    : "2px solid var(--border-medium)",
                borderRadius: "1.5rem",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow:
                  activeCategory === category
                    ? "0 8px 25px rgba(20, 224, 199, 0.25)"
                    : "var(--shadow-sm)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor:
                  activeCategory === category
                    ? "var(--accent-emerald)"
                    : "var(--accent-blue)",
                color: "white",
                boxShadow: "0 12px 35px rgba(20, 224, 199, 0.35)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          style={{
            y: cardsY,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => openProjectDetail(project)}
              style={{
                position: "relative",
                background:
                  "linear-gradient(145deg, var(--bg-primary), var(--bg-secondary))",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-lg)",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              initial={{ opacity: 0, y: 80, rotateX: 45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.02,
                rotateY: 2,
                rotateX: 2,
                z: 30,
                boxShadow:
                  "0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(20, 224, 199, 0.1)",
                transition: { duration: 0.3 },
              }}
              onMouseEnter={() => setActiveProject(index)}
            >
              {/* Project Image with Overlay */}
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, var(--accent-blue), var(--accent-emerald))",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(20, 224, 199, 0.8), rgba(67, 233, 123, 0.8))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    opacity: 0.9,
                  }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    style={{
                      fontSize: "2.5rem",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                      marginBottom: "0.5rem",
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {getCategoryEmoji(project.category)}
                  </motion.span>
                  <span
                    style={{
                      color: "white",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      background: "rgba(0,0,0,0.3)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {project.status}
                  </span>
                </motion.div>
              </div>

              <div style={{ padding: "1.25rem" }}>
                <motion.h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                    color: "var(--text-primary)",
                    lineHeight: "1.3",
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                    lineHeight: "1.6",
                    fontSize: "0.85rem",
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {project.description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      style={{
                        padding: "0.35rem 0.75rem",
                        background:
                          "linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))",
                        borderRadius: "1rem",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-medium)",
                        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.6 + techIndex * 0.1,
                      }}
                      whileHover={{ scale: 1.05, y: -1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--accent-blue)",
                        fontWeight: "600",
                        alignSelf: "center",
                      }}
                    >
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  style={{ display: "flex", gap: "0.75rem" }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectDetail(project);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.6rem 1rem",
                      background:
                        "linear-gradient(135deg, var(--accent-blue), var(--accent-emerald))",
                      color: "white",
                      textAlign: "center",
                      borderRadius: "0.5rem",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(20, 224, 199, 0.3)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 6px 20px rgba(20, 224, 199, 0.4)",
                      y: -1,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    📖 Details
                  </motion.button>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flex: 1,
                      padding: "0.6rem 1rem",
                      background: "var(--bg-tertiary)",
                      color: "var(--text-primary)",
                      textAlign: "center",
                      borderRadius: "0.5rem",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      textDecoration: "none",
                      border: "2px solid var(--border-medium)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "var(--text-primary)",
                      color: "var(--bg-primary)",
                      borderColor: "var(--text-primary)",
                      y: -1,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    📁 GitHub
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Project Detail */}
        <motion.div
          style={{
            background:
              "linear-gradient(145deg, var(--bg-primary), var(--bg-secondary))",
            borderRadius: "1.5rem",
            padding: "2rem",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 1,
            delay: 0.8,
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle, var(--accent-blue), transparent 70%)",
              opacity: 0.05,
              borderRadius: "50%",
            }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <motion.h3
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "1rem",
              background:
                "linear-gradient(135deg, var(--text-primary), var(--accent-blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🌟 GitHub: @seamoonpandey
          </motion.h3>
          <motion.p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              fontSize: "1rem",
            }}
          >
            Visit my GitHub profile to explore all projects, contributions, and
            see the complete codebase. Each project represents a different
            aspect of my learning journey and technical growth.
          </motion.p>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "1rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetail}
          >
            <motion.div
              style={{
                background: "var(--bg-primary)",
                borderRadius: "1.5rem",
                padding: "2rem",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-xl)",
              }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                      fontWeight: "700",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {selectedProject.title}
                  </h2>
                  <span
                    style={{
                      background: "var(--accent-blue)",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    {selectedProject.status}
                  </span>
                </div>
                <button
                  onClick={closeProjectDetail}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "2rem",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                    padding: "0.5rem",
                  }}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    background:
                      "linear-gradient(135deg, var(--accent-blue), var(--accent-emerald))",
                    borderRadius: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "4rem",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                    }}
                  >
                    {getCategoryEmoji(selectedProject.category)}
                  </span>
                </div>
              </div>

              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  marginBottom: "2rem",
                  fontSize: "1.1rem",
                }}
              >
                {selectedProject.longDescription}
              </p>

              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Key Features
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.5rem",
                  }}
                >
                  {selectedProject.features.map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        background: "var(--bg-secondary)",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        ✓ {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Technologies Used
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
                >
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "0.5rem 1rem",
                        background:
                          "linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))",
                        borderRadius: "1.5rem",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    padding: "1rem 2rem",
                    background:
                      "linear-gradient(135deg, var(--accent-blue), var(--accent-emerald))",
                    color: "white",
                    textAlign: "center",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    boxShadow: "0 4px 15px rgba(20, 224, 199, 0.3)",
                  }}
                >
                  🔗 View on GitHub
                </a>
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      minWidth: "200px",
                      padding: "1rem 2rem",
                      background: "var(--bg-tertiary)",
                      color: "var(--text-primary)",
                      textAlign: "center",
                      borderRadius: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      textDecoration: "none",
                      border: "2px solid var(--border-medium)",
                    }}
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
