"use client";

import { useState, useEffect, useRef } from "react";
import { motion, MotionValue } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  scrollProgress: MotionValue<number>;
}

export default function Navbar({ scrollProgress }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

    const sections = [
      "home",
      "about",
      "skills",
      "experience",
      "projects",
      "contact",
    ];
    sections.forEach((sectionId) => {
      const element = document.querySelector(`#${sectionId}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        background:
          "linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(25, 25, 25, 0.85) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(80, 80, 80, 0.2)",
        border: "none",
        minHeight: "64px",
        display: "flex",
        alignItems: "center",
      }}
      data-theme-aware
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          minHeight: "64px",
          padding: 0,
        }}
      >
        {/* Responsive container for logo, nav, and hamburger */}
        <div
          className="mobile-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontWeight: "800",
              fontSize: "1.5rem",
              background:
                "linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              cursor: "pointer",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              height: "40px",
            }}
            onClick={() => handleNavClick("#home")}
          >
            Seamoon
          </motion.div>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              background: "none",
              borderRadius: 0,
              padding: 0,
              border: "none",
              boxShadow: "none",
              height: "40px",
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background:
                    activeSection === item.href.slice(1)
                      ? "linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)"
                      : "transparent",
                  border: "none",
                  borderRadius: "1rem",
                  padding: "0.5rem 1rem",
                  color:
                    activeSection === item.href.slice(1)
                      ? "#ffffff"
                      : "#e5e5e5",
                  fontWeight:
                    activeSection === item.href.slice(1) ? "600" : "500",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  minWidth: "fit-content",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "none",
              background: "rgba(30, 30, 30, 0.6)",
              border: "1px solid rgba(60, 60, 60, 0.3)",
              borderRadius: "1rem",
              cursor: "pointer",
              padding: "0.75rem",
            }}
            className="mobile-menu-btn"
            aria-label="Open navigation menu"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              <motion.div
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 6 : 0,
                  backgroundColor: isMenuOpen ? "#00d4ff" : "#e5e5e5",
                }}
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "1px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <motion.div
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  backgroundColor: isMenuOpen ? "#00d4ff" : "#e5e5e5",
                }}
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "1px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <motion.div
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0,
                  backgroundColor: isMenuOpen ? "#00d4ff" : "#e5e5e5",
                }}
                style={{
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "1px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="mobile-menu"
          ref={mobileMenuRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ overflow: "hidden", marginTop: "1rem" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              background: "rgba(30, 30, 30, 0.8)",
              borderRadius: "1.5rem",
              padding: "1rem",
              border: "1px solid rgba(60, 60, 60, 0.3)",
            }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{
                  duration: 0.3,
                  delay: isMenuOpen ? index * 0.05 : 0,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background:
                    activeSection === item.href.slice(1)
                      ? "linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)"
                      : "transparent",
                  border: "none",
                  borderRadius: "1rem",
                  textAlign: "left",
                  padding: "1rem 1.25rem",
                  color:
                    activeSection === item.href.slice(1)
                      ? "#ffffff"
                      : "#e5e5e5",
                  fontWeight:
                    activeSection === item.href.slice(1) ? "600" : "500",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Progress Bar */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, #00d4ff 0%, #a855f7 50%, #f59e0b 100%)",
            borderRadius: "0 0 2rem 2rem",
            transformOrigin: "0%",
            scaleX: scrollProgress,
          }}
        />
      </div>
    </motion.nav>
  );
}
