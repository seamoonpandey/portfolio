export default function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Section */}
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>Hello World</h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Welcome to your beautiful portfolio with an elegant{" "}
          <span className="text-accent">dark and light theme</span> system.
        </p>
      </header>

      {/* Cards Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Beautiful Design</h3>
          <p>
            Crafted with a sophisticated color palette using creamy whites and
            rich blacks for optimal visual comfort.
          </p>
          <a href="#" className="text-success">
            Learn more →
          </a>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Dark & Light Themes</h3>
          <p>
            Automatically adapts to your system preference with smooth
            transitions and eye-friendly colors.
          </p>
          <a href="#" className="text-accent">
            Explore features →
          </a>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Minimal Accents</h3>
          <p>
            Strategic use of <span className="text-warning">color accents</span>{" "}
            for highlights and interactive elements.
          </p>
          <a href="#" className="text-success">
            View examples →
          </a>
        </div>
      </section>

      {/* Buttons Section */}
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>Interactive Elements</h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-accent">Accent Button</button>
        </div>
      </section>

      {/* Typography Section */}
      <section className="card" style={{ marginBottom: "3rem" }}>
        <h2>Typography Showcase</h2>
        <h3>This is a heading 3</h3>
        <h4>This is a heading 4</h4>
        <p>
          This is regular paragraph text with proper spacing and readability in
          mind. The color contrast is optimized for both light and dark themes.
        </p>
        <p className="text-tertiary">
          This is tertiary text for less important information.
        </p>
      </section>

      {/* Form Section */}
      <section className="card">
        <h2 style={{ marginBottom: "1.5rem" }}>Form Elements</h2>
        <div style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}>
          <input type="text" placeholder="Enter your name" />
          <input type="email" placeholder="Enter your email" />
          <textarea placeholder="Your message" rows={4}></textarea>
          <button className="btn btn-accent">Send Message</button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <p className="text-tertiary">
          Built with Next.js and beautiful theming system
        </p>
      </footer>
    </div>
  );
}
