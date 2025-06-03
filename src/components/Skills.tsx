"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { BsAmazon } from "react-icons/bs";

const getSkillIcon = (skillName: string) => {
  const iconProps = { size: 28 };

  switch (skillName) {
    case "React":
      return <SiReact {...iconProps} />;
    case "Next.js":
      return <SiNextdotjs {...iconProps} />;
    case "TypeScript":
      return <SiTypescript {...iconProps} />;
    case "JavaScript":
      return <SiJavascript {...iconProps} />;
    case "HTML/CSS":
      return <SiHtml5 {...iconProps} />;
    case "Node.js":
      return <SiNodedotjs {...iconProps} />;
    case "Express":
      return <SiExpress {...iconProps} />;
    case "Python":
      return <SiPython {...iconProps} />;
    case "PostgreSQL":
      return <SiPostgresql {...iconProps} />;
    case "MongoDB":
      return <SiMongodb {...iconProps} />;
    case "Git":
      return <SiGit {...iconProps} />;
    case "Docker":
      return <SiDocker {...iconProps} />;
    case "AWS":
      return <BsAmazon {...iconProps} />;
    case "Figma":
      return <SiFigma {...iconProps} />;
    default:
      return <SiReact {...iconProps} />;
  }
};

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

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

  const skillNames = skills.map((s) => s.name);

  // Three rows
  const numRows = 3;
  const iconsPerRow = Math.ceil(skillNames.length / numRows);
  const rows = Array.from({ length: numRows }, (_, i) =>
    skillNames.slice(i * iconsPerRow, (i + 1) * iconsPerRow)
  );

  // Individual color mapping for each skill
  const skillColors: Record<string, string> = {
    React: "rgba(97, 218, 251, 0.25)", // React blue - brighter
    "Next.js": "rgba(255, 255, 255, 0.2)", // White/gray - brighter
    TypeScript: "rgba(49, 120, 198, 0.25)", // TypeScript blue - brighter
    JavaScript: "rgba(247, 223, 30, 0.25)", // JavaScript yellow - brighter
    "HTML/CSS": "rgba(227, 79, 38, 0.25)", // HTML orange - brighter
    "Node.js": "rgba(104, 160, 99, 0.25)", // Node green - brighter
    Express: "rgba(68, 68, 68, 0.25)", // Express gray - brighter
    Python: "rgba(55, 118, 171, 0.25)", // Python blue - brighter
    PostgreSQL: "rgba(51, 103, 145, 0.25)", // PostgreSQL blue - brighter
    MongoDB: "rgba(71, 162, 72, 0.25)", // MongoDB green - brighter
    Git: "rgba(240, 80, 50, 0.25)", // Git orange - brighter
    Docker: "rgba(33, 150, 243, 0.25)", // Docker blue - brighter
    AWS: "rgba(255, 153, 0, 0.25)", // AWS orange - brighter
    Figma: "rgba(162, 89, 255, 0.25)", // Figma purple - brighter
  };

  const getSkillColor = (skillName: string) => {
    return skillColors[skillName] || "rgba(100, 100, 100, 0.15)";
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

        {/* Multi-line marquee, 3 rows, alternating directions */}
        <div
          style={{
            width: "100%",
            margin: "0 auto 3rem",
            minHeight: 240,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {rows.map((row, rowIdx) => {
            const isReverse = rowIdx % 2 === 1;
            return (
              <Marquee
                key={rowIdx}
                direction={isReverse ? "right" : "left"}
                speed={30}
                pauseOnHover={true}
                gradient={true}
                gradientColor="var(--bg-secondary)"
                gradientWidth={60}
                style={{
                  ...(rowIdx === 1 ? { marginLeft: 40 } : {}),
                  minHeight: 70,
                }}
              >
                {/* Duplicate the row multiple times for seamless infinite scroll */}
                {[...row, ...row, ...row].map((name, i) => (
                  <div
                    key={name + i + rowIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: getSkillColor(name),
                      borderRadius: "1rem",
                      padding: "0.75rem 2.2rem 0.75rem 1.2rem",
                      minWidth: 110,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: 17,
                      gap: 12,
                      marginRight: 16,
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      style={{
                        marginRight: 12,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {getSkillIcon(name)}
                    </div>
                    {name}
                  </div>
                ))}
              </Marquee>
            );
          })}
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
