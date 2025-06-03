"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  category: string;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeProject, setActiveProject] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution with modern UI and secure payments",
        longDescription:
          "Built a comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and integrated payment processing using Stripe. The application includes an admin dashboard for inventory management and order tracking.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux"],
        image: "/api/placeholder/600/400",
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/example/ecommerce",
        category: "Full Stack",
      },
      {
        id: 2,
        title: "Task Management App",
        description:
          "Collaborative task management with real-time updates and team features",
        longDescription:
          "Developed a real-time collaborative task management application with drag-and-drop functionality, team workspaces, deadline tracking, and notification system. Features include role-based permissions and detailed analytics dashboard.",
        technologies: [
          "Next.js",
          "TypeScript",
          "Socket.io",
          "MongoDB",
          "Tailwind",
        ],
        image: "/api/placeholder/600/400",
        demoUrl: "https://tasks.example.com",
        githubUrl: "https://github.com/example/taskmanager",
        category: "Frontend",
      },
      {
        id: 3,
        title: "Weather Analytics Dashboard",
        description:
          "Data visualization dashboard for weather patterns and forecasting",
        longDescription:
          "Created an interactive weather analytics dashboard that aggregates data from multiple APIs to provide comprehensive weather insights, historical data analysis, and predictive forecasting with beautiful data visualizations.",
        technologies: ["React", "D3.js", "Express", "Weather API", "Chart.js"],
        image: "/api/placeholder/600/400",
        demoUrl: "https://weather.example.com",
        githubUrl: "https://github.com/example/weather",
        category: "Data Visualization",
      },
      {
        id: 4,
        title: "Social Media Dashboard",
        description:
          "Analytics dashboard for social media management and insights",
        longDescription:
          "Built a comprehensive social media management platform that allows users to schedule posts, analyze engagement metrics, track follower growth, and generate detailed reports across multiple social media platforms.",
        technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
        image: "/api/placeholder/600/400",
        demoUrl: "https://social.example.com",
        githubUrl: "https://github.com/example/social",
        category: "Full Stack",
      },
    ],
    []
  );

  const categories = ["All", "Full Stack", "Frontend", "Data Visualization"];

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory, projects]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

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
                fontSize: "3.5rem",
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
              Featured{" "}
              <span style={{ color: "var(--accent-blue)" }}>Projects</span>
            </motion.h2>
            <motion.p
              style={{
                fontSize: "1.25rem",
                color: "var(--text-secondary)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover my latest work that showcases innovation, creativity, and
              technical excellence
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
                padding: "1rem 2rem",
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
                borderRadius: "2rem",
                fontWeight: "600",
                fontSize: "0.95rem",
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
                    opacity: 0.9,
                  }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    style={{
                      fontSize: "2.5rem",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🚀
                  </motion.span>
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

                {/* Enhanced Technologies */}
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

                {/* Enhanced Action Buttons */}
                <motion.div
                  style={{ display: "flex", gap: "0.75rem" }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                >
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      textDecoration: "none",
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
                    🚀 Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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

        {/* Enhanced Featured Project Detail */}
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
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              background:
                "linear-gradient(135deg, var(--text-primary), var(--accent-blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ✨ Featured: {filteredProjects[activeProject]?.title}
          </motion.h3>

          <motion.p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
              marginBottom: "2rem",
              fontSize: "1.1rem",
            }}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {filteredProjects[activeProject]?.longDescription}
          </motion.p>

          <motion.div
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {filteredProjects[activeProject]?.technologies.map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  style={{
                    padding: "0.75rem 1.25rem",
                    background:
                      "linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))",
                    borderRadius: "2rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)",
                    boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: "0 5px 15px rgba(20, 224, 199, 0.2)",
                  }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
