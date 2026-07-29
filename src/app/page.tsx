import styles from "./page.module.css";
import c from "./content.module.css";
import { LINKS, STAGES } from "./site";

const PIPELINE = [
  { name: "Next.js", note: "dashboard :8080 · Socket.IO" },
  { name: "NestJS", note: "core :3000 · scan, crawl, queue, report" },
  { name: "Redis / BullMQ", note: "scan queue" },
  { name: "FastAPI ×3", note: "context :5001 · payload-gen :5002 · fuzzer :5003" },
  { name: "PostgreSQL", note: "scans · vulns · audit log" },
];

const FINDINGS = [
  {
    label: "Core",
    body: "Designed the NestJS orchestration core: scan lifecycle, crawler, BullMQ processor, audit log, JWT-guarded scan and report routes, Socket.IO streaming, and HTML/JSON/PDF report generation over PostgreSQL.",
  },
  {
    label: "Classifier",
    body: "Fine-tuned a DistilBERT multi-task head that labels a reflection's context and severity, replacing signature matching. It sits inside the context module and decides which payload family is worth generating at all.",
  },
  {
    label: "Dataset",
    body: "Curated the payload bank to 59,122 entries from AwesomeXSS, PayloadsAllTheThings, XSSGAI and PortSwigger material, with a reproducible manifest carrying SHA-256 checksums and row counts, plus a twelve-section statistics report.",
  },
  {
    label: "Ranker",
    body: "Co-developed an XGBoost payload ranker over 35 engineered features. It runs only when the ranker artifact is mounted; otherwise the service degrades to heuristic ranking instead of failing the scan.",
  },
];

/** Every figure here is reproducible from `eval/` in the repo. */
const RESULTS = [
  { value: "47", label: "endpoints evaluated" },
  { value: "1.000", label: "F1 · strict counting" },
  { value: "0", label: "false positives" },
  { value: "0", label: "false negatives" },
];

const PROJECTS = [
  {
    title: "genaudi",
    meta: "SaaS · FastAPI, React, Fly.io",
    body: "PDF or EPUB in, audiobook out. Chapters are detected on upload, read in an e-reader view, converted server-side, and played back or downloaded as MP3.",
    href: "https://github.com/seamoonpandey/genaudio_book",
    hrefLabel: "source",
    detail:
      "A React SPA on Cloudflare Pages talks to a FastAPI service on Fly backed by SQLite in WAL mode; a separate TTS worker fleet runs kokoro-onnx. The worker never touches the database — it claims and completes jobs through internal endpoints over Fly's private network, so SQLite keeps exactly one writer. Quota is transactional: the free tier's three lifetime conversions are checked and incremented inside one transaction, and refunded when a job permanently fails. The queue is crash-safe — jobs running past 15 minutes are requeued, three failed attempts mark the job failed with a user-visible reason and a retry. Synthesis sits behind a single synthesize() interface, so a premium voice provider drops in as a higher tier without touching the queue. Magic-link and Google auth, Stripe webhooks for billing.",
  },
  {
    title: "UMIRA",
    meta: "Platform · Fastify, Prisma, Flutter",
    body: "A calm, adaptive workspace for neurodivergent users — built as general wellness and assistive productivity, explicitly not as a diagnostic tool.",
    href: "https://github.com/seamoonpandey/UMIRA",
    hrefLabel: "source",
    detail:
      "Fastify and TypeScript over Prisma, PostgreSQL and Redis, with Zod at every boundary; the client is Flutter with Riverpod, GoRouter and flutter_tts. The AI layer is provider-abstracted across OpenAI and Anthropic and runs a hybrid rules-plus-LLM path with output validators, so a model swap doesn't change behaviour. Five MVP modules: a microtask engine that splits a goal into 3–12 atomic steps, reading support with an original/simplified toggle and line focus, timed focus sessions, an explicitly user-controlled preference profile that never infers a diagnosis, and first-party analytics the user can export and hard-delete. Docker Compose, GitHub Actions, nginx with Let's Encrypt, Prometheus.",
  },
  {
    title: "Wishy",
    meta: "SaaS · Fastify, React Three Fiber",
    body: "Birthday SaaS — a 3D greeting experience on the front end with a typed, validated API behind it.",
    href: "https://github.com/seamoonpandey/wishy-api",
    hrefLabel: "api · web",
    detail:
      "Split across two repos. The web app is React with React Three Fiber and drei for the 3D scene, Zustand for local state, TanStack Query for server state, and Framer Motion for transitions. The API is Fastify with JWT in httpOnly cookies, bcrypt for credentials, Zod schemas on every route, and PostgreSQL over node-postgres.",
  },
  {
    title: "Community Connect",
    meta: "Hackathon · Express, Flutter",
    body: "Event coordination for OSM Hackfest: REST APIs for event tracking with GPS-based attendance validation, and a Flutter client for attendees.",
    href: "https://github.com/seamoonpandey/community_connect-api",
    hrefLabel: "api · app",
    detail:
      "Attendance is validated server-side against the event's coordinates rather than trusted from the device, so a check-in is only accepted inside the event's radius during its window. Express handles the REST surface; the Flutter app covers event discovery, check-in and tracking.",
  },
  {
    title: "Talentio",
    meta: "Web app · Flask, MongoDB",
    body: "CV builder — drag-and-drop editing, multiple templates, live preview, and PDF export.",
    href: "https://github.com/seamoonpandey/quickcv",
    hrefLabel: "source",
    detail:
      "Flask API over MongoDB Atlas with authentication and per-user profiles; the editor renders a live preview as you type and exports through jsPDF client-side, so document generation never blocks a request. Responsive down to phone widths.",
  },
  {
    title: "Markdown → PDF",
    meta: "Tool · React, GitHub Actions",
    body: "Converts Markdown in the browser and exports to PDF, DOC, HTML, MD or plain text. No upload, no server.",
    href: "https://github.com/seamoonpandey/fileconverter",
    hrefLabel: "source",
    detail:
      "Conversion runs entirely client-side, so documents never leave the browser. CI is the interesting half: every push to main runs lint and build, publishes dist to the gh-pages branch only when the build passes, and pull requests run the same checks without deploying.",
  },
];

const EXPERIENCE = [
  {
    role: "Freelance Full-Stack Developer",
    when: "Contract · Remote",
    body: "Delivered production platforms on an Express.js and React stack — authentication, REST APIs, and third-party integrations, taken from spec to live site.",
    links: [
      { label: "jyotisam.com", href: "https://jyotisam.com", note: "astrology consultation and booking" },
      { label: "mahadaan.com", href: "https://mahadaan.com", note: "donation and charity, secure donor data" },
    ],
  },
  {
    role: "Mentor, Call for Enthusiasts (i-CES)",
    when: "Program",
    body: "Coached students on building scalable applications: clean backend architecture, separation of concerns, and the development practices that survive a second contributor.",
    links: [],
  },
  {
    role: "B.E. Computer Engineering",
    when: "Tribhuvan University · 2022–2026",
    body: "Institute of Engineering, Pashchimanchal Campus. Graduated 2026; RedSentinel was the capstone.",
    links: [],
  },
];

const STACK = [
  { group: "Languages", items: "Python · TypeScript · JavaScript · Ruby · C/C++ · Dart" },
  { group: "AI / ML", items: "PyTorch · Transformers · XGBoost · YOLOv8 · ONNX / TorchScript" },
  { group: "Backend", items: "NestJS · FastAPI · Fastify · Express · Flask · Rails · REST · Socket.IO" },
  { group: "Data & infra", items: "PostgreSQL · MongoDB · Redis · BullMQ · Docker Compose · Fly.io · async queues" },
  { group: "Frontend", items: "React · Next.js · Flutter · React Three Fiber" },
  { group: "Security", items: "XSS detection · payload generation · fuzzing · WAF analysis · Playwright" },
  { group: "Practices", items: "system architecture · JWT / API-key auth · unit + e2e testing · GitHub Actions · Linux" },
];

export default function Home() {
  return (
    <>
      <header className={styles.masthead}>
        <span className={styles.wordmark}>Seamoon Pandey</span>
        <span className={styles.role}>AI &amp; Backend Engineer</span>
        <span className={styles.where}>Kathmandu, Nepal</span>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="thesis">
          <h1 id="thesis" className={styles.thesis}>
            <span className={styles.line}>I build the services that</span>{" "}
            <span className={`${styles.line} ${styles.marked}`}>
              take untrusted input
            </span>{" "}
            <span className={styles.line}>
              — and the models that know what it means.
            </span>
          </h1>

          <figure className={styles.specimen}>
            <figcaption className={styles.specimenCap}>
              One scan · six stages
            </figcaption>

            {/* CSS-only stepper: the radios drive the panels through sibling
                selectors, so this costs zero JavaScript and keyboard arrows
                work for free. */}
            <div className={styles.walker}>
              {STAGES.map((s, i) => (
                <input
                  key={s.key}
                  className={styles.radio}
                  type="radio"
                  name="stage"
                  id={`stage-${s.key}`}
                  defaultChecked={i === 0}
                />
              ))}

              <div className={styles.tablist}>
                {STAGES.map((s) => (
                  <label
                    key={s.key}
                    className={styles.tab}
                    htmlFor={`stage-${s.key}`}
                  >
                    {s.name}
                  </label>
                ))}
              </div>

              <div className={styles.panels}>
                {STAGES.map((s) => (
                  <div key={s.key} className={styles.panel}>
                    <pre className={styles.code}>
                      <code>
                        {s.mark ? (
                          <>
                            {s.line.slice(0, s.line.indexOf(s.mark))}
                            <mark className={styles.hit}>{s.mark}</mark>
                            {s.line.slice(
                              s.line.indexOf(s.mark) + s.mark.length,
                            )}
                          </>
                        ) : (
                          s.line
                        )}
                      </code>
                    </pre>
                    <p className={styles.panelBody}>{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className={styles.specimenNote}>
              The real pipeline, as implemented.{" "}
              <a href="/redsentinel">Read the case study →</a>
            </p>
          </figure>

          <p className={styles.lede}>
            B.E. Computer Engineering, Tribhuvan University, 2026. I work across
            Python ML pipelines and TypeScript backends, and I ship both halves
            myself — from the training loop to the queue that serves it.
          </p>

          <nav className={styles.heroLinks} aria-label="Elsewhere">
            <a href={LINKS.github}>GitHub</a>
            <a href={LINKS.linkedin}>LinkedIn</a>
            <a href={LINKS.x}>X</a>
            <a href={LINKS.resume}>Résumé (PDF)</a>
          </nav>
        </section>

        <section className={styles.flagship} aria-labelledby="redsentinel">
          <p className={styles.eyebrow}>Flagship</p>
          <h2 id="redsentinel" className={styles.projectTitle}>
            RedSentinel
          </h2>
          <p className={styles.projectSub}>
            AI-assisted XSS vulnerability scanner. Capstone project, team of
            three. I was lead architect: I owned the NestJS orchestration core
            and the entire ML pipeline; my teammates built the fuzzer and
            obfuscation engines.
          </p>

          <ol className={styles.pipeline} aria-label="Service topology">
            {PIPELINE.map((node) => (
              <li key={node.name} className={styles.node}>
                <span className={styles.nodeName}>{node.name}</span>
                <span className={styles.nodeNote}>{node.note}</span>
              </li>
            ))}
          </ol>

          <div className={styles.findings}>
            {FINDINGS.map((f) => (
              <article key={f.label} className={styles.finding}>
                <h3 className={styles.findingLabel}>{f.label}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>

          <dl className={styles.results} aria-label="Evaluation">
            {RESULTS.map((r) => (
              <div key={r.label} className={styles.result}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.resultsNote}>
            From the 47-endpoint evaluation in <code>eval/</code>, under
            browser-execution strict counting — a finding only counts if the
            payload executes in a headless browser. Cross-tool runs against ZAP,
            XSStrike and Dalfox use reflection-based counting and read
            differently; the classifier&rsquo;s own accuracy is a separate,
            more sobering number.{" "}
            <a href="/redsentinel">All of it, with the caveats →</a>
          </p>

          <nav className={styles.projectLinks} aria-label="RedSentinel">
            <a href="/redsentinel">Case study</a>
            <a href={LINKS.redsentinel}>Source</a>
            <a href={LINKS.redsentinelReport}>Report</a>
            <a href={LINKS.redsentinelDemo}>Demo</a>
          </nav>
        </section>

        <section className={c.section} aria-labelledby="projects">
          <p className={styles.eyebrow}>Also shipped</p>
          <h2 id="projects" className={styles.sectionTitle}>
            Projects
          </h2>
          <div className={c.grid}>
            {PROJECTS.map((p) => (
              <article key={p.title} className={c.card}>
                <h3 className={c.cardTitle}>{p.title}</h3>
                <p className={c.cardMeta}>{p.meta}</p>
                <p>{p.body}</p>
                <details className={c.more}>
                  <summary className={c.moreSummary}>
                    How it&rsquo;s built
                  </summary>
                  <div className={c.moreBody}>
                    <p>{p.detail}</p>
                  </div>
                </details>
                <a className={c.cardLink} href={p.href}>
                  {p.hrefLabel} ↗
                </a>
              </article>
            ))}
          </div>
          <p className={c.gridNote}>
            Around seventy public repositories in total — labs, language
            experiments, and the things that turned into the above.{" "}
            <a href={LINKS.github}>Browse them on GitHub ↗</a>
          </p>
        </section>

        <section className={c.section} aria-labelledby="experience">
          <p className={styles.eyebrow}>Track record</p>
          <h2 id="experience" className={styles.sectionTitle}>
            Experience
          </h2>
          <div className={c.timeline}>
            {EXPERIENCE.map((e) => (
              <article key={e.role} className={c.entry}>
                <div>
                  <h3 className={c.entryRole}>{e.role}</h3>
                  <p className={c.entryWhen}>{e.when}</p>
                </div>
                <div className={c.entryBody}>
                  <p>{e.body}</p>
                  {e.links.length > 0 && (
                    <ul className={c.entryLinks}>
                      {e.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href}>{l.label} ↗</a>
                          <span> — {l.note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={c.section} aria-labelledby="stack">
          <p className={styles.eyebrow}>Day to day</p>
          <h2 id="stack" className={styles.sectionTitle}>
            Stack
          </h2>
          <dl className={c.stack}>
            {STACK.map((s) => (
              <div key={s.group} className={c.stackRow}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className={c.footer} id="contact">
        <p className={styles.eyebrow}>Contact</p>
        <h2 className={styles.sectionTitle}>Open to work.</h2>
        <p className={c.footerLede}>
          Backend, ML engineering, or the seam between them. Mail is the
          fastest way to reach me.
        </p>
        <a className={c.mail} href={LINKS.email}>
          pandeyseamoon05@gmail.com
        </a>
        <nav className={c.footerLinks} aria-label="Elsewhere">
          <a href={LINKS.github}>GitHub</a>
          <a href={LINKS.linkedin}>LinkedIn</a>
          <a href={LINKS.x}>X</a>
          <a href={LINKS.resume}>Résumé (PDF)</a>
        </nav>
      </footer>
    </>
  );
}
