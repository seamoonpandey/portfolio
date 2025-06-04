"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsLoading(false);
    setFormData({ name: "", email: "", message: "" });

    // Reset submission state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: "📧",
      label: "Email",
      value: "hackedasocial@gmail.com",
      href: "mailto:hackedasocial@gmail.com",
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+977 9866142928",
      href: "tel:+9779866142928",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Pokhara, Nepal",
      href: "#",
    },
  ];

  return (
    <section ref={containerRef} id="contact" style={{ padding: "6rem 2rem" }}>
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
            Get In <span style={{ color: "var(--accent-blue)" }}>Touch</span>
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Have a project in mind or just want to say hello? I&apos;d love to
            hear from you!
          </p>
        </motion.div>

        {/* CV Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            padding: "2rem",
            background:
              "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-emerald) 100%)",
            borderRadius: "1.5rem",
            color: "#0a0a0a",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "#0a0a0a",
            }}
          >
            Download My Resume
          </h3>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "2rem",
              color: "#1a1a1a",
              opacity: 0.8,
            }}
          >
            Get a detailed overview of my skills, experience, and projects.
          </p>
          <motion.a
            href="/assets/resume.pdf"
            download="Seamoon_Pandey_Resume.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#0a0a0a",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "3rem",
              textDecoration: "none",
              fontWeight: "700",
              fontSize: "1rem",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.3)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16L7 11L8.4 9.6L11 12.2V4H13V12.2L15.6 9.6L17 11L12 16Z"
                fill="currentColor"
              />
              <path d="M5 20V18H19V20H5Z" fill="currentColor" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
              }}
            >
              Let&apos;s start a conversation
            </h3>

            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: "1.7",
              }}
            >
              I&apos;m always interested in hearing about new opportunities,
              interesting projects, or just having a chat about technology and
              design.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "0.75rem",
                    textDecoration: "none",
                    border: "1px solid var(--border-light)",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "var(--accent-blue)",
                    color: "#0a0a0a", // Dark text for better contrast on hover
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{info.icon}</span>
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ marginTop: "2rem" }}
            >
              <h4
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Follow me
              </h4>
              <div style={{ display: "flex", gap: "1rem" }}>
                {[
                  {
                    name: "GitHub",
                    icon: "🐙",
                    href: "https://github.com/seamoonpandey",
                  },
                  {
                    name: "LinkedIn",
                    icon: "💼",
                    href: "https://www.linkedin.com/in/seamoon-pandey-1981a6365/",
                  },
                  {
                    name: "Twitter",
                    icon: "🐦",
                    href: "https://x.com/seamoonpandey",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                      backgroundColor: "var(--bg-secondary)",
                      borderRadius: "50%",
                      textDecoration: "none",
                      fontSize: "1.25rem",
                      border: "1px solid var(--border-light)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "var(--accent-blue)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="card"
            style={{ padding: "2rem" }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "2rem" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Thank you for reaching out. I&apos;ll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    marginBottom: "1.5rem",
                  }}
                >
                  Send me a message
                </h3>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "var(--text-primary)",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      resize: "vertical",
                      minHeight: "120px",
                      transition: "border-color 0.3s ease",
                    }}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    color: "#0a0a0a", // Override for better contrast
                    fontWeight: "700",
                    textShadow: "0 1px 2px rgba(255, 255, 255, 0.3)",
                  }}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
