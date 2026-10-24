# Security Notes

Internal tracker for security findings that we are aware of but cannot
fix in-repo right now. Each entry should describe **what**, **why we
have not patched**, and **what to watch for** so future you (or a
contributor) doesn't blindly run `npm audit fix --force` and break
production. The **Fixed** log at the end records every security fix:
the advisory, what changed, the commit and the proof.

---

## Deferred CVEs

### postcss-selector-parser < 7.1.6 (via tailwindcss 3) — CPU exhaustion

- **Advisory:** [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)
  (quadratic complexity in flat selector parsing)
- **Severity:** Moderate. `npm audit` counts it three times
  (postcss-selector-parser, postcss-nested, tailwindcss).
- **Source:** `tailwindcss` 3.4.18 → `postcss-nested` 6.2.0 →
  `postcss-selector-parser` 6.1.5, all dev, in our own CSS build.
- **Why deferred:** the only fix npm offers is `npm audit fix --force`,
  which jumps to tailwindcss 4.3.3: a major rewrite of the styling
  pipeline (configuration, plugins, `tailwindcss-animate`) for a
  build-time parser.
- **Why low real-world risk:** the parser runs at build time on our own
  CSS only. No user-supplied CSS is ever parsed, so there is no input an
  attacker controls.
- **What to watch:** a tailwindcss 3.x release that moves to
  postcss-selector-parser >= 7.1.6, or the move to tailwindcss 4.
- **Action item:** re-check with `npm audit` on every dependency change.
  Do NOT run `npm audit fix --force`.

---

## Audited & accepted (low priority, no action needed)

(Nothing here yet.)

---

## Fixed

Newest first.

### 2026-10-24 — zod < 4.6.6: memory exhaustion (high)

- **Advisory:** [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)
  (CVSS 7.5): validating oversized constrained collections can exhaust
  memory.
- **Where:** lint tooling only (`eslint-config-next` →
  `eslint-plugin-react-hooks` and `zod-validation-error` → zod 4.1.12,
  dev). The app never imports zod.
- **Fix:** zod 4.6.7, inside the plugins' range (`^3.25.0 || ^4.0.0`);
  only `package-lock.json` changed. Commit `0615d47`.
- **Proof:** `npm audit` 1 high + 3 moderate → 3 moderate (the deferral
  above). On Node 24.22.1: lint identical before and after (134 files,
  0 fatal), `next build` 113/113 pages, `next start` serves `/`,
  `/blog`, a post, `/pricing`, `/login`, `/dashboard` (200) and 404 for
  an unknown path.

### 2026-10-24 — Next.js security update of 2026-10-14 (2 critical, 1 high)

- **Advisories:**
  [GHSA-673q-mjm6-r5xr](https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr)
  (remote code execution in `use cache` functions),
  [CVE-2026-96889 / GHSA-2464-fhr4-w9xw](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw)
  (remote code execution in the Image Optimization API with SVG),
  [GHSA-p3m5-59mp-jv5r](https://github.com/vercel/next.js/security/advisories/GHSA-p3m5-59mp-jv5r)
  (denial of service through Server Actions); fixed in 16.4.1.
- **Status:** already patched: next 16.4.3 with sharp 0.35.5 since
  `fb94777` (entry below). The live bundle reads `version:"16.4.3"`.
- **Exposure before that:** none of the three conditions held. No Cache
  Components and no `use cache`, no Server Actions (`use server`), no
  `next/image`, no image settings and no SVG in `public/`.
- **Fix:** none needed.

### 2026-10-23 — Node.js security release of 2026-10-21, and the npm audit

- **Advisories:** [Node.js October 21, 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases):
  10 CVEs, the worst CVE-2026-111497 (Brotli decoder out-of-bounds
  write, remote code execution); fixed in 22.23.4, 24.22.1 and 26.12.1,
  none for 20.x.
- **Fix:** `engines.node` set to `24.x`, so the Vercel functions run a
  patched line whatever the project setting says, and `npm audit fix`
  within the existing ranges: next 16.2.5 → 16.4.3, postcss 8.5.23,
  sharp 0.35.5, ws 8.22.0 (13 advisories, 1 critical → 3 moderate).
  Commit `fb94777`, deployed by Vercel the same day.
- **Proof:** on Node 24.22.1 before the push, `next build` 113/113 pages
  and `next start` serving the main pages; after the deploy, the live
  pages answer 200.
- **Backend, same day:** `nexora-backend-v2` commit `ac90bd1`:
  `engines.node` 24.x and the in-range audit fixes, express 4.22.3 among
  them (12 advisories, 1 critical → 0). A Brotli-encoded request body is
  refused (415) before any decoding.

### 2026-10-23 — postcss < 8.5.10: XSS via unescaped `</style>` (moderate, was deferred)

- **Advisory:** [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
- **Fix:** with next 16.4.3 (`fb94777`) the nested
  `node_modules/next/node_modules/postcss` (8.4.31) is gone and the
  top-level postcss is 8.5.23; `npm audit` no longer reports it. The
  deferral's "re-check on every `next` upgrade" was done at that
  upgrade.
