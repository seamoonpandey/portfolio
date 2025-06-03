"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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

  const projects: Project[] = [
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
  ];

  const categories = ["All", "Full Stack", "Frontend", "Data Visualization"];

  return (
    <section
      ref={containerRef}
      id="projects"
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
            My <span style={{ color: "var(--accent-blue)" }}>Projects</span>
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Here are some of the projects I&apos;ve worked on that showcase my
            skills and passion for development
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "transparent",
                border: "2px solid var(--border-light)",
                borderRadius: "2rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              whileHover={{
                borderColor: "var(--accent-blue)",
                backgroundColor: "var(--accent-blue)",
                color: "white",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card"
              style={{ overflow: "hidden", padding: 0 }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onMouseEnter={() => setActiveProject(index)}
            >
              {/* Project Image Placeholder */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "var(--bg-tertiary)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "var(--accent-blue)",
                    opacity: 0.1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  whileHover={{ opacity: 0.2 }}
                >
                  <span style={{ fontSize: "3rem", opacity: 0.5 }}>🖼️</span>
                </motion.div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginBottom: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
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
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "1rem" }}>
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Project Detail */}
        <motion.div
          className="card"
          style={{ padding: "2rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Featured: {projects[activeProject].title}
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              marginBottom: "1.5rem",
            }}
          >
            {projects[activeProject].longDescription}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {projects[activeProject].technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: "1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-light)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
