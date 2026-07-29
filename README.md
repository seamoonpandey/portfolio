# seamoonpandey.com.np

Portfolio for Seamoon Pandey — AI & backend engineer. A landing page and a
`/redsentinel` case study, built with Next.js and shipped as a fully static
export to Cloudflare Pages.

The page ships **zero client-side JavaScript**. Everything is a Server
Component, and the interactive parts (the six-stage scan stepper, the "how
it's built" disclosures) are CSS-only.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export → out/
npm run preview  # build, then serve out/ through wrangler
```

There is no `start` script — `next start` does not work with
`output: "export"`. Use `preview`.

## Deploy

CI does this on every push to `main`. To deploy by hand:

```bash
npm run deploy   # build + wrangler pages deploy
```

Target is the Cloudflare Pages project **`seamoonpandey`**
(`seamoonpandey.pages.dev`), configured in `wrangler.toml`.

### CI secrets

`.github/workflows/deploy.yml` needs two repository secrets:

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Create at Cloudflare → My Profile → API Tokens, template **Edit Cloudflare Workers**, or a custom token with `Account → Cloudflare Pages → Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | `369ca544bad26307709f7e23c650c123` |

Pull requests run lint, build, and the export checks, but never deploy.

## Gotchas worth keeping

- **`_headers` sets `Content-Type: image/png` on `/opengraph-image`.** Next
  emits the generated OG card with no file extension, so Pages would serve it
  as `application/octet-stream` and every link preview would break. The CI
  build asserts the file is still a PNG.
- **`export const dynamic = "force-static"`** is required in
  `opengraph-image.tsx`, `sitemap.ts`, and `robots.ts`. Without it the static
  export fails at build time.
- **Claims in the copy are held to the repo's evidence.** The RedSentinel
  numbers come from `eval/` and `docs/ML_GUIDE.md` in
  [seamoonpandey/Xbow](https://github.com/seamoonpandey/Xbow). The classifier's
  99.5% accuracy was retracted after train/test leakage was found; the page
  reports the honest post-fix figures. Do not restore the old numbers.

## Layout

```
src/app/
  site.ts              shared constants + the six scan stages
  layout.tsx           fonts, metadata, JSON-LD Person
  page.tsx             landing page
  page.module.css      masthead, hero, walker, results
  content.module.css   sections, cards, disclosure, footer
  opengraph-image.tsx  1200×630 share card, generated at build
  sitemap.ts robots.ts
  redsentinel/         case study + its stylesheet
public/
  _headers             Cloudflare Pages headers
```
