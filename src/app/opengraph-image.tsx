import { ImageResponse } from "next/og";
import { SITE } from "./site";

// Required by `output: "export"` — the PNG is rendered once at build time.
export const dynamic = "force-static";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#e8e9e3";
const INK = "#16191a";
const INK_2 = "#56605d";
const SIGNAL = "#b81a2b";
const MARKER = "#f2e14c";
const WIRE = "#c3c6bc";

// Satori supports flexbox only — no grid, no CSS variables.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: INK_2,
          }}
        >
          <span style={{ color: INK, fontWeight: 600 }}>{SITE.name}</span>
          <span style={{ color: SIGNAL }}>{SITE.role}</span>
        </div>

        {/* Satori stretches flex children by default, so every line is its own
            row and the marker span is sized to its own text. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>I build the services that</div>
          <div
            style={{
              display: "flex",
              background: MARKER,
              padding: "2px 10px",
            }}
          >
            take untrusted input
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: -1,
              color: INK_2,
              marginTop: 10,
            }}
          >
            — and the models that know what it means.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `2px solid ${WIRE}`,
            paddingTop: 26,
            fontSize: 22,
            color: INK_2,
            letterSpacing: 1,
          }}
        >
          <span>RedSentinel · 47 endpoints · F1 1.000 · 0 false positives</span>
          <span>{SITE.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
