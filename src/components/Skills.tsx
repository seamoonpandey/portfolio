"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const getSkillIcon = (skillName: string) => {
  const iconName = getSkillIconName(skillName);
  const iconUrl = `https://skillicons.dev/icons?i=${iconName}`;
  return (
    <Image
      src={iconUrl}
      alt={skillName}
      width={28}
      height={28}
      style={{ borderRadius: "4px" }}
      unoptimized
    />
  );
};

const getSkillIconName = (skillName: string): string => {
  const iconMap: Record<string, string> = {
    AWS: "aws",
    Android: "androidstudio",
    Bash: "bash",
    Linux: "linux",
    Git: "git",
    GitHub: "github",
    C: "c",
    "C++": "cpp",
    Ruby: "ruby",
    Python: "py",
    JavaScript: "js",
    TypeScript: "ts",
    "Express.js": "express",
    "Next.js": "nextjs",
    React: "react",
    "HTML/CSS": "html",
    Dart: "dart",
    Docker: "docker",
    Flutter: "flutter",
    "Node.js": "nodejs",
    Grafana: "grafana",
    Heroku: "heroku",
    MongoDB: "mongodb",
    PostgreSQL: "postgres",
    Neovim: "neovim",
    Postman: "postman",
    PyTorch: "pytorch",
    TensorFlow: "tensorflow",
    Rails: "rails",
    Redis: "redis",
    Vim: "vim",
    Jira: "jira",
    Atlassian: "atlassian",
    Homebrew: "homebrew",
    Loki: "grafana",
    "Ant Design": "antd",
    Redux: "redux",
    Jest: "jest",
    "Tailwind CSS": "tailwind",
    Firebase: "firebase",
    Vercel: "vercel",
  };

  return iconMap[skillName] || "react";
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
    { name: "React", level: 95, category: "Frontend" },
    { name: "Next.js", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Language" },
    { name: "JavaScript", level: 95, category: "Language" },
    { name: "HTML/CSS", level: 98, category: "Frontend" },
    { name: "Python", level: 92, category: "Language" },
    { name: "C", level: 80, category: "Language" },
    { name: "C++", level: 78, category: "Language" },
    { name: "Ruby", level: 75, category: "Language" },
    { name: "Dart", level: 70, category: "Language" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Express.js", level: 80, category: "Backend" },
    { name: "Rails", level: 78, category: "Backend" },
    { name: "PostgreSQL", level: 78, category: "Database" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "Redis", level: 75, category: "Database" },
    { name: "AWS", level: 75, category: "Cloud" },
    { name: "Docker", level: 85, category: "DevOps" },
    { name: "Git", level: 90, category: "Tools" },
    { name: "GitHub", level: 88, category: "Tools" },
    { name: "Linux", level: 82, category: "OS" },
    { name: "Bash", level: 80, category: "Tools" },
    { name: "Vim", level: 75, category: "Tools" },
    { name: "Neovim", level: 78, category: "Tools" },
    { name: "PyTorch", level: 80, category: "ML" },
    { name: "TensorFlow", level: 75, category: "ML" },
    { name: "Flutter", level: 65, category: "Mobile" },
    { name: "Android", level: 60, category: "Mobile" },
    { name: "Postman", level: 85, category: "Tools" },
    { name: "Grafana", level: 70, category: "Monitoring" },
    { name: "Heroku", level: 75, category: "Cloud" },
  ];

  const skillNames = skills.map((s) => s.name);

  // Three rows
  const numRows = 3;
  const iconsPerRow = Math.ceil(skillNames.length / numRows);
  const rows = Array.from({ length: numRows }, (_, i) =>
    skillNames.slice(i * iconsPerRow, (i + 1) * iconsPerRow)
  );

  // Dynamic color mapping based on actual brand colors
  const skillColors: Record<string, string> = {
    React: "rgba(97, 218, 251, 0.25)",
    "Next.js": "rgba(255, 255, 255, 0.15)",
    TypeScript: "rgba(49, 120, 198, 0.25)",
    JavaScript: "rgba(247, 223, 30, 0.25)",
    "HTML/CSS": "rgba(227, 79, 38, 0.25)",
    Python: "rgba(55, 118, 171, 0.25)",
    C: "rgba(0, 89, 156, 0.25)",
    "C++": "rgba(0, 89, 156, 0.25)",
    Ruby: "rgba(204, 52, 45, 0.25)",
    Dart: "rgba(0, 180, 216, 0.25)",
    "Node.js": "rgba(104, 160, 99, 0.25)",
    "Express.js": "rgba(68, 68, 68, 0.2)",
    Rails: "rgba(204, 0, 0, 0.25)",
    PostgreSQL: "rgba(51, 103, 145, 0.25)",
    MongoDB: "rgba(71, 162, 72, 0.25)",
    Redis: "rgba(220, 54, 47, 0.25)",
    AWS: "rgba(255, 153, 0, 0.25)",
    Docker: "rgba(33, 150, 243, 0.25)",
    Git: "rgba(240, 80, 50, 0.25)",
    GitHub: "rgba(36, 41, 46, 0.25)",
    Linux: "rgba(255, 204, 0, 0.25)",
    Bash: "rgba(76, 175, 80, 0.25)",
    Vim: "rgba(25, 150, 25, 0.25)",
    Neovim: "rgba(87, 199, 181, 0.25)",
    PyTorch: "rgba(238, 76, 44, 0.25)",
    TensorFlow: "rgba(255, 109, 1, 0.25)",
    Flutter: "rgba(2, 136, 209, 0.25)",
    Android: "rgba(61, 220, 132, 0.25)",
    Postman: "rgba(255, 109, 54, 0.25)",
    Grafana: "rgba(242, 73, 92, 0.25)",
    Heroku: "rgba(121, 75, 196, 0.25)",
  };

  const getSkillColor = (skillName: string) => {
    return skillColors[skillName] || "rgba(100, 116, 139, 0.2)";
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
              "Jira",
              "Atlassian",
              "Homebrew",
              "Loki",
              "Ant Design",
              "Redux",
              "Jest",
              "Tailwind CSS",
              "Firebase",
              "Vercel",
            ].map((tech, index) => (
              <motion.div
                key={tech}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--bg-tertiary)",
                  borderRadius: "1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-light)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}
                whileHover={{
                  scale: 1.05,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
              >
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {getSkillIcon(tech)}
                </motion.div>
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
