---
projects:
  - title: vibe.me
    description: Offline-first Android music player. Jetpack Compose, Media3, no accounts, nothing leaves the device.
    tech: ["Kotlin", "Jetpack Compose", "Media3", "Android"]
    github: "https://github.com/seamoonpandey/vibe.me"
  - title: RedSentinel
    description: AI-assisted XSS vulnerability scanner. Capstone project. NestJS orchestration core and DistilBERT multi-task head for payload selection.
    tech: ["NestJS", "FastAPI", "DistilBERT", "XGBoost", "PostgreSQL", "BullMQ"]
    github: "https://github.com/seamoonpandey/Xbow"
    live: "https://drive.google.com/file/d/1HZmdURP3l8JNoTyL40me_O1-8kat4Q9d/view?usp=sharing"
    detail: |
      **AI-assisted XSS vulnerability scanner.** Capstone project, team of three. I was lead architect: I owned the NestJS orchestration core and the entire ML pipeline; my teammates built the fuzzer and obfuscation engines.

      **Pipeline:**
      - **Next.js**: dashboard :8080 · Socket.IO
      - **NestJS**: core :3000 · scan, crawl, queue, report
      - **Redis / BullMQ**: scan queue
      - **FastAPI ×3**: context :5001 · payload-gen :5002 · fuzzer :5003
      - **PostgreSQL**: scans · vulns · audit log

      **Findings:**
      - **Core**: Designed the NestJS orchestration core: scan lifecycle, crawler, BullMQ processor, audit log, JWT-guarded scan and report routes, Socket.IO streaming, and HTML/JSON/PDF report generation over PostgreSQL.
      - **Classifier**: Fine-tuned a DistilBERT multi-task head that labels a reflection's context and severity, replacing signature matching. It sits inside the context module and decides which payload family is worth generating at all.
      - **Dataset**: Curated the payload bank to 59,122 entries from AwesomeXSS, PayloadsAllTheThings, XSSGAI and PortSwigger material, with a reproducible manifest carrying SHA-256 checksums and row counts, plus a twelve-section statistics report.
      - **Ranker**: Co-developed an XGBoost payload ranker over 35 engineered features. It runs only when the ranker artifact is mounted; otherwise the service degrades to heuristic ranking instead of failing the scan.

      **Results:**
      47 endpoints evaluated. 1.000 F1 (strict counting). 0 false positives. 0 false negatives.
  - title: genaudi
    description: PDF or EPUB in, audiobook out. FastAPI service on Fly backed by SQLite in WAL mode with TTS worker fleet running kokoro-onnx.
    tech: ["FastAPI", "React", "Fly.io", "SQLite"]
    github: "https://github.com/seamoonpandey/genaudio_book"
    detail: |
      A React SPA on Cloudflare Pages talks to a FastAPI service on Fly backed by SQLite in WAL mode; a separate TTS worker fleet runs kokoro-onnx. The worker never touches the database — it claims and completes jobs through internal endpoints over Fly's private network, so SQLite keeps exactly one writer. Quota is transactional: the free tier's three lifetime conversions are checked and incremented inside one transaction, and refunded when a job permanently fails. The queue is crash-safe — jobs running past 15 minutes are requeued, three failed attempts mark the job failed with a user-visible reason and a retry. Synthesis sits behind a single synthesize() interface, so a premium voice provider drops in as a higher tier without touching the queue. Magic-link and Google auth, Stripe webhooks for billing.
  - title: UMIRA
    description: A calm, adaptive workspace for neurodivergent users. Fastify and TypeScript over Prisma, PostgreSQL and Redis.
    tech: ["Fastify", "Prisma", "Flutter", "PostgreSQL", "Redis"]
    github: "https://github.com/seamoonpandey/UMIRA"
    detail: |
      A calm, adaptive workspace for neurodivergent users — built as general wellness and assistive productivity, explicitly not as a diagnostic tool.
  - title: Wishy
    description: Birthday SaaS — a 3D greeting experience on the front end (React Three Fiber) with a typed, validated Fastify API behind it.
    tech: ["Fastify", "React Three Fiber", "PostgreSQL"]
    github: "https://github.com/seamoonpandey/wishy-api"
  - title: Community Connect
    description: Event coordination for OSM Hackfest. REST APIs for event tracking with GPS-based attendance validation, and a Flutter client.
    tech: ["Express", "Flutter", "REST"]
    github: "https://github.com/seamoonpandey/community_connect-api"
  - title: Talentio
    description: CV builder — drag-and-drop editing, multiple templates, live preview, and PDF export. Flask API over MongoDB Atlas.
    tech: ["Flask", "MongoDB", "jsPDF"]
    github: "https://github.com/seamoonpandey/quickcv"
  - title: Markdown → PDF
    description: Converts Markdown in the browser and exports to PDF, DOC, HTML. Runs entirely client-side.
    tech: ["React", "GitHub Actions"]
    github: "https://github.com/seamoonpandey/fileconverter"
---

# Projects

Use `ls` to see individual projects or `cat` to see the full list.
