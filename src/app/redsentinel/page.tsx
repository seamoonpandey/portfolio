import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";
import c from "../content.module.css";
import s from "./case.module.css";
import { LINKS, STAGES } from "../site";

export const metadata: Metadata = {
  title: "RedSentinel",
  description:
    "Case study: an AI-assisted XSS scanner — NestJS core, three FastAPI services, a DistilBERT context classifier, and what happened when the evaluation turned out to be measuring memorisation.",
  alternates: { canonical: "/redsentinel" },
};

const SERVICES = [
  { name: "Core API", tech: "NestJS", port: "3000", note: "scan, crawler, queue, report, health, auth, scanner-log" },
  { name: "Dashboard", tech: "Next.js", port: "8080", note: "REST + Socket.IO, live scan progress" },
  { name: "Context", tech: "FastAPI", port: "5001", note: "POST /analyze — reflection context, allowed characters" },
  { name: "Payload-gen", tech: "FastAPI", port: "5002", note: "POST /generate, GET /ranker/info" },
  { name: "Fuzzer", tech: "FastAPI", port: "5003", note: "POST /fuzz — reflection and execution checks" },
  { name: "Queue", tech: "Redis / BullMQ", port: "6379", note: "background scan jobs" },
  { name: "Store", tech: "PostgreSQL", port: "5432", note: "scans, vulnerabilities, audit entries" },
];

const FALLBACKS = [
  {
    when: "Ranker artifact not mounted",
    then: "Payload-gen falls back to heuristic ranking. The scan still completes; it just orders payloads less well.",
  },
  {
    when: "Payload bank empty",
    then: "POST /generate returns 503 rather than reporting a clean scan that never actually tested anything.",
  },
  {
    when: "Classifier model missing",
    then: "The context module's health endpoint reports the model as not loaded, so the failure is visible before a scan is trusted.",
  },
];

export default function RedSentinel() {
  return (
    <>
      <header className={styles.masthead}>
        <Link href="/" className={styles.wordmark}>
          ← Seamoon Pandey
        </Link>
        <span className={styles.role}>Case study</span>
        <span className={styles.where}>2026 · Capstone</span>
      </header>

      <main>
        <section className={s.top} aria-labelledby="title">
          <p className={styles.eyebrow}>AI-assisted XSS scanner</p>
          <h1 id="title" className={s.title}>
            RedSentinel
          </h1>
          <p className={s.standfirst}>
            A scanner that decides <em>where</em> a payload would land before it
            decides <em>which</em> payload to fire — then refuses to report
            anything it could not execute in a real browser.
          </p>
          <dl className={s.meta}>
            <div>
              <dt>My role</dt>
              <dd>
                Lead architect. I owned the NestJS orchestration core and the ML
                pipeline end to end. Two teammates built the fuzzer and
                obfuscation engines.
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                TypeScript / NestJS · Python / FastAPI · PyTorch · XGBoost ·
                Redis / BullMQ · PostgreSQL · Next.js · Docker Compose
              </dd>
            </div>
          </dl>
          <nav className={styles.projectLinks} aria-label="RedSentinel links">
            <a href={LINKS.redsentinel}>Source</a>
            <a href={LINKS.redsentinelReport}>Written report</a>
            <a href={LINKS.redsentinelDemo}>Demo video</a>
          </nav>
        </section>

        <section className={c.section} aria-labelledby="problem">
          <p className={styles.eyebrow}>The problem</p>
          <h2 id="problem" className={styles.sectionTitle}>
            Signature matching guesses. Context tells you.
          </h2>
          <div className={s.prose}>
            <p>
              A reflected XSS scanner spends nearly all of its budget firing
              payloads that were never going to work. A payload that breaks out
              of an attribute value is inert inside a script string; one that
              works in HTML text does nothing in an <code>href</code>. Classical
              scanners handle this with signature lists and pattern matching,
              which means they either fire everything — slow, noisy, and loud
              enough to trip a WAF — or they fire a narrow list and miss.
            </p>
            <p>
              RedSentinel puts a classification step in front of generation. The
              context module probes each reflection point and reports the
              context it landed in and which characters survived the round trip.
              Only then does payload generation run, against a bank filtered to
              that context and ordered by a ranker. The expensive stage operates
              on a shortlist instead of a catalogue.
            </p>
          </div>
        </section>

        <section className={c.section} aria-labelledby="architecture">
          <p className={styles.eyebrow}>Architecture</p>
          <h2 id="architecture" className={styles.sectionTitle}>
            One core, three analysis services
          </h2>
          <div className={s.prose}>
            <p>
              The NestJS core is the only service that writes scan state.
              Everything expensive happens off a Redis-backed BullMQ queue, so a
              slow or hostile target never blocks the request that started the
              scan. The three Python services are stateless over HTTP and can be
              restarted independently of an in-flight scan.
            </p>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Runtime</th>
                  <th>Port</th>
                  <th>Responsibility</th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((svc) => (
                  <tr key={svc.name}>
                    <td className={s.strong}>{svc.name}</td>
                    <td>{svc.tech}</td>
                    <td className={s.num}>{svc.port}</td>
                    <td className={s.muted}>{svc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={c.section} aria-labelledby="pipeline">
          <p className={styles.eyebrow}>Scan pipeline</p>
          <h2 id="pipeline" className={styles.sectionTitle}>
            Six stages, in order
          </h2>
          <div className={s.prose}>
            <p>
              The numbering here is real: each stage consumes what the previous
              one produced, and a scan cannot skip forward.
            </p>
          </div>
          <ol className={s.stages}>
            {STAGES.map((stage, i) => (
              <li key={stage.key} className={s.stage}>
                <div className={s.stageHead}>
                  <span className={s.stageNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={s.stageName}>{stage.name}</h3>
                </div>
                <div className={s.stageBody}>
                  <pre className={s.stageLine}>
                    <code>{stage.line}</code>
                  </pre>
                  <p>{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={c.section} aria-labelledby="results">
          <p className={styles.eyebrow}>Results</p>
          <h2 id="results" className={styles.sectionTitle}>
            What the evaluation actually measured
          </h2>
          <div className={s.prose}>
            <p>
              On the 47-endpoint evaluation the scanner records{" "}
              <strong>TP 44, FN 0, FP 0, TN 3 — F1 1.000</strong>. That number
              is only meaningful with its counting rule attached: a finding is
              counted only if the payload <em>executes</em> in a headless
              browser. Endpoints that reflect input but never execute it produce
              zero findings, which is where the zero false positives come from.
            </p>
            <p>
              Cross-tool comparisons against ZAP, XSStrike and Dalfox use
              reflection-based counting instead, because that is how those tools
              decide. Under that rule the numbers move, and tools without
              browser verification pick up false positives. Both rules are in
              the repo, along with the scripts that reproduce them — the point
              of publishing both is that a single headline F1 with no
              methodology attached is not evidence of anything.
            </p>
          </div>
          <div className={s.callout}>
            <p>
              <span className={s.calloutLabel}>Reproduce it</span>
              <code>python3 eval/run.py --output fresh-full-eval</code>, then{" "}
              <code>python3 eval/analysis/metrics.py fresh-full-eval</code>.
              Archived runs live in <code>eval/archive/</code>.
            </p>
          </div>
        </section>

        <section className={c.section} aria-labelledby="leakage">
          <p className={styles.eyebrow}>The part I got wrong</p>
          <h2 id="leakage" className={styles.sectionTitle}>
            My classifier was scoring 99.5%. It was cheating.
          </h2>
          <div className={s.prose}>
            <p>
              For most of the project the context classifier reported{" "}
              <strong>99.53% context accuracy and 99.56% severity accuracy</strong>{" "}
              on a 3,632-sample test set. Those numbers went into the report.
              They were wrong, and the way they were wrong is the most useful
              thing I learned building this.
            </p>
            <p>
              Validation accuracy had been sitting around 75% the whole time. A
              twenty-four-point gap between validation and test is not a good
              sign — a test set is supposed to be <em>harder</em> than
              validation, never easier. So I went looking for the leak instead
              of enjoying the number.
            </p>
            <p>
              The splits overlapped badly.{" "}
              <strong>
                161 of 206 unique test payloads — 78% — also appeared in
                training.
              </strong>{" "}
              Exact duplicate payloads ran at 78.2% between train and test, and
              even the test payloads with novel normalised forms averaged ~0.91
              string similarity to their nearest training example. The model was
              not inferring context from payload syntax. It was recalling the
              label it had most often seen attached to that exact string.
            </p>
            <p>
              I regenerated the splits with zero payload overlap and re-ran the
              evaluation. The honest numbers are{" "}
              <strong>78.4% context accuracy and 38.2% severity accuracy</strong>{" "}
              on 306 clean test samples — consistent with the ~75.1% / ~35.4%
              validation figures, which is exactly what you want to see once the
              leak is closed.
            </p>
            <p>
              Severity is the weak head, and it is weak for a defensible reason:
              severity is not a property of the payload string. It depends on
              where the reflection sits, what the surrounding application does
              with it, and whether it executes — runtime evidence the classifier
              never sees at training time. That is why runtime severity in the
              shipped scanner is rule-based and the classifier only advises.
              Fixing the head means fixing the labels, not the architecture.
            </p>
          </div>
          <div className={s.ledger}>
            <div className={s.ledgerRow}>
              <span className={s.ledgerKey}>Context accuracy</span>
              <span className={s.ledgerWas}>99.53%</span>
              <span className={s.ledgerNow}>78.4%</span>
            </div>
            <div className={s.ledgerRow}>
              <span className={s.ledgerKey}>Severity accuracy</span>
              <span className={s.ledgerWas}>99.56%</span>
              <span className={s.ledgerNow}>38.2%</span>
            </div>
            <div className={s.ledgerRow}>
              <span className={s.ledgerKey}>Test samples</span>
              <span className={s.ledgerWas}>3,632</span>
              <span className={s.ledgerNow}>306</span>
            </div>
            <p className={s.ledgerNote}>
              Struck values were inflated by train/test overlap. Current values
              come from clean splits and are what the repo reports today.
            </p>
          </div>
        </section>

        <section className={c.section} aria-labelledby="degrade">
          <p className={styles.eyebrow}>Failure behaviour</p>
          <h2 id="degrade" className={styles.sectionTitle}>
            What happens when a piece is missing
          </h2>
          <div className={s.prose}>
            <p>
              A security tool that silently reports a clean scan when its own
              components are broken is worse than no tool. Each degradation path
              is explicit.
            </p>
          </div>
          <dl className={s.fallbacks}>
            {FALLBACKS.map((f) => (
              <div key={f.when} className={s.fallback}>
                <dt>{f.when}</dt>
                <dd>{f.then}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={c.section} aria-labelledby="limits">
          <p className={styles.eyebrow}>Limitations</p>
          <h2 id="limits" className={styles.sectionTitle}>
            Where it still falls over
          </h2>
          <div className={s.prose}>
            <p>
              Run against real applications — Juice Shop, WebGoat, the OWASP
              Benchmark — the scanner hits architectural limits rather than
              detection bugs: single-page apps that exchange JSON instead of
              form posts, multi-step authentication flows, and injection through
              POST bodies or the <code>Referer</code> header. These are crawler
              and transport gaps, not classifier gaps, and they are the honest
              next piece of work.
            </p>
            <p>
              The severity head needs relabelling before it earns any weight in
              a report. And the dataset, at 59,122 curated entries drawn from
              AwesomeXSS, PayloadsAllTheThings, XSSGAI and PortSwigger material,
              is broad but skewed toward payloads people publish — which is not
              the same distribution as payloads that work.
            </p>
          </div>
        </section>
      </main>

      <footer className={c.footer}>
        <p className={styles.eyebrow}>Contact</p>
        <h2 className={styles.sectionTitle}>Want the long version?</h2>
        <p className={c.footerLede}>
          The written report goes further than this page does. Happy to walk
          through any of it.
        </p>
        <a className={c.mail} href={LINKS.email}>
          pandeyseamoon05@gmail.com
        </a>
        <nav className={c.footerLinks} aria-label="Elsewhere">
          <Link href="/">← Back to portfolio</Link>
          <a href={LINKS.redsentinel}>Source</a>
          <a href={LINKS.github}>GitHub</a>
          <a href={LINKS.resume}>Résumé (PDF)</a>
        </nav>
      </footer>
    </>
  );
}
