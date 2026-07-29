export const SITE = {
  url: "https://seamoonpandey.com.np",
  name: "Seamoon Pandey",
  role: "AI & Backend Engineer",
  where: "Kathmandu, Nepal",
  description:
    "AI & backend engineer. I build the services that take untrusted input and the models that classify it — NestJS, FastAPI, PyTorch, Redis/BullMQ.",
};

export const LINKS = {
  github: "https://github.com/seamoonpandey",
  linkedin: "https://www.linkedin.com/in/seamoonpandey/",
  x: "https://x.com/seamoonpandey",
  email: "mailto:pandeyseamoon05@gmail.com",
  resume: "/seamoon-pandey-resume.pdf",
  redsentinel: "https://github.com/seamoonpandey/Xbow",
  redsentinelReport: "https://github.com/seamoonpandey/Xbow-report",
  redsentinelDemo:
    "https://drive.google.com/file/d/1HZmdURP3l8JNoTyL40me_O1-8kat4Q9d/view?usp=sharing",
};

/**
 * The six scan stages, taken from the RedSentinel README's own pipeline
 * description — not a marketing paraphrase of it.
 */
export const STAGES = [
  {
    key: "auth",
    name: "Auth",
    line: 'options.auth → POST /login (target site)',
    body: "Optional login to the target application so protected pages can be scanned. Deliberately separate from the credentials used to call RedSentinel's own API — scanning a logged-in surface must never widen access to the scanner.",
  },
  {
    key: "crawl",
    name: "Crawl",
    line: "discover: urls · query params · forms · DOM sinks · WAF",
    body: "The core walks the target and records every place user input can land, including DOM sinks the server never sees. WAF fingerprinting happens here, because knowing what filters the traffic changes which payloads are worth generating at all.",
  },
  {
    key: "context",
    name: "Context",
    line: "POST :5001/analyze → reflection context + allowed chars",
    body: "The context module probes each reflection location and reports the context it landed in and which characters survived the round trip. This is where the DistilBERT classifier runs. A reflection inside an attribute value and one inside a script string need entirely different payloads — getting this wrong wastes the whole budget downstream.",
    mark: "allowed chars",
  },
  {
    key: "payload-gen",
    name: "Payload-gen",
    line: "POST :5002/generate → select · mutate · obfuscate · rank",
    body: "Payloads are selected against the reported context, mutated and obfuscated, then ranked. XGBoost ranking runs only when the ranker artifact is actually mounted; without it the service falls back to heuristic ranking rather than failing the scan. The payload bank comes from the curated dataset split — an empty bank returns 503 instead of silently scanning with nothing.",
  },
  {
    key: "fuzz",
    name: "Fuzz",
    line: "POST :5003/fuzz → reflect? → execute in headless browser?",
    body: "Each ranked payload is fired, checked for reflection, and — when verification is on — actually executed in a headless browser before it counts. That last step is why the strict evaluation reports zero false positives: a page that reflects input but never executes it produces no finding.",
    mark: "execute in headless browser?",
  },
  {
    key: "report",
    name: "Report",
    line: "score → persist → dedupe → html | json | pdf",
    body: "Findings are scored with a rule-based severity model, persisted to PostgreSQL, deduplicated, and rendered. The dashboard follows all of this live over Socket.IO instead of polling, and every state change lands in a per-scan audit log.",
  },
];
