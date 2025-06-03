"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  scrollProgress: any;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(250, 250, 249, 0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 2rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "var(--accent-blue)",
            }}
          >
            Seamoon
          </motion.div>

          {/* Desktop Navigation */}
          <div
            style={{ display: "none", gap: "2rem", alignItems: "center" }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "none",
                  border: "none",
                  color:
                    activeSection === item.href.slice(1)
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  fontWeight:
                    activeSection === item.href.slice(1) ? "600" : "400",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: "block",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
            }}
            className="mobile-menu-btn"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "var(--text-primary)",
                  transition: "all 0.3s ease",
                }}
              />
              <motion.div
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "var(--text-primary)",
                  transition: "all 0.3s ease",
                }}
              />
              <motion.div
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0,
                }}
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "var(--text-primary)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingTop: "1rem",
            }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: "0.5rem 0",
                  color:
                    activeSection === item.href.slice(1)
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  fontWeight:
                    activeSection === item.href.slice(1) ? "600" : "400",
                  cursor: "pointer",
                }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "var(--accent-blue)",
          transformOrigin: "0%",
          scaleX: scrollProgress,
        }}
      />
    </motion.nav>
  );
}
