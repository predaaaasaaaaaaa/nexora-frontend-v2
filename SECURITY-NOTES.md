# Security Notes

Internal tracker for security findings that we are aware of but cannot
fix in-repo right now. Each entry should describe **what**, **why we
have not patched**, and **what to watch for** so future you (or a
contributor) doesn't blindly run `npm audit fix --force` and break
production.

---

## Deferred CVEs

### postcss < 8.5.10 — XSS via unescaped `</style>`

- **Advisory:** [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)
- **Severity:** Moderate
- **Source:** Pulled in transitively by `next` (currently 16.2.5) at
  `node_modules/next/node_modules/postcss`. Our own
  `postcss.config.mjs` pipeline does not see this version.
- **Why deferred:** `npm audit fix --force` would downgrade Next to
  9.3.3 — a multi-major regression that breaks the App Router, the
  proxy/middleware shape, the Script/lazyOnload semantics we use for
  Paddle, and effectively the entire app.
- **Why low real-world risk:** PostCSS is a build-time tool. We do not
  run it on user-supplied CSS at runtime. The unescaped `</style>`
  output bug requires an attacker to control CSS that we then serialize
  into an HTML page — not part of any Nexora flow today.
- **What to watch:** The next minor/patch of Next 16 that bumps its
  bundled postcss to >= 8.5.10. After upgrading Next, re-run
  `npm audit` and confirm the warning is gone.
- **Action item:** Re-check on every `next` upgrade. Until then, do
  NOT run `npm audit fix --force`.

---

## Audited & accepted (low priority, no action needed)

(Nothing here yet.)
