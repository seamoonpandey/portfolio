import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { LINKS, SITE } from "./site";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const { url, description } = SITE;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Seamoon Pandey — AI & Backend Engineer",
    template: "%s — Seamoon Pandey",
  },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Seamoon Pandey", url }],
  keywords: [
    "Seamoon Pandey",
    "AI engineer",
    "backend engineer",
    "NestJS",
    "FastAPI",
    "PyTorch",
    "DistilBERT",
    "XSS",
    "Kathmandu",
    "Nepal",
  ],
  openGraph: {
    type: "profile",
    url,
    title: "Seamoon Pandey — AI & Backend Engineer",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@seamoonpandey",
    title: "Seamoon Pandey — AI & Backend Engineer",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  description: SITE.description,
  email: "pandeyseamoon05@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institute of Engineering, Tribhuvan University",
  },
  knowsAbout: [
    "Backend engineering",
    "Machine learning engineering",
    "NestJS",
    "FastAPI",
    "PyTorch",
    "Application security",
  ],
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.x],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
