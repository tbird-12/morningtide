# Copilot CLI Instructions for Morningtide

This document provides standing instructions for all GitHub Copilot CLI agents working on the Morningtide repository. **Read this before starting any task.**

---

## ⚠️ Critical Constants — Never Get These Wrong

| Item | Correct Value | Wrong Value (never use) |
|------|--------------|------------------------|
| Primary email | `info@morningtidecc.com` | ~~`info@morningtideconsulting.com`~~ |
| Canonical domain | `morningtidecc.com` | ~~`morningtideconsulting.com`~~ |
| SEO fallback in `SEO.astro` | `'https://morningtidecc.com'` | ~~`'https://morningtideconsulting.com'`~~ |
| Sitemap URL | `https://morningtidecc.com/sitemap-index.xml` | ~~wrong domain~~ |

Whenever you write or change a URL, email, or domain, grep the result and confirm no `morningtideconsulting` remains.

---

## 🔴 Non-Negotiable Rules (from past audit findings)

### Security

1. **Always HTML-escape user input before email templates.**  
   The `contact.ts` API sends user-supplied fields inside an HTML email. Inject only through the `escapeHtml()` helper already defined in that file. Never interpolate raw strings.

   ```ts
   // ✅ correct
   const safeName = escapeHtml(name);
   html = `...<td>${safeName}</td>...`;

   // ❌ wrong — HTML injection vector
   html = `...<td>${name}</td>...`;
   ```

2. **Security headers live in `src/middleware.ts` only.**  
   Do not add per-page response headers. The middleware already sets CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. If you add a new external script/font/image CDN, update the `Content-Security-Policy` in middleware first.

3. **No new external CDN domains without updating CSP.**  
   Adding a `<script src="...">` or `<link href="...">` from a domain not in the CSP will silently break in production. Update the relevant `script-src`/`style-src`/`font-src` directive in `src/middleware.ts` at the same time.

### Performance

4. **No `@import url(...)` for Google Fonts inside any CSS file.**  
   All font loading is handled non-blocking via `<link rel="preload">` + `<link media="print" onload>` in `Layout.astro`. A CSS `@import` is render-blocking. Never add one.

5. **Font `<link rel="preload" as="style">` requires `crossorigin`.**  
   Without it the browser fetches twice (preload + stylesheet). Current `Layout.astro` already has this; preserve it on any edits.

6. **Never reference a public asset that does not physically exist.**  
   The SEO component previously fell back to `/og-default.png` which didn't exist — every page generated a broken `og:image` tag. Before referencing any path under `public/`, confirm the file is there with `Get-ChildItem public -Recurse`.

### SEO

7. **OG image tags are conditional — never hard-code a missing file.**  
   `og:image`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:image`, and `twitter:image:alt` are only rendered when an image URL resolves. The `twitter:card` must be `summary` (not `summary_large_image`) when no image is present.

8. **When adding og:image, also add width/height/alt.**  
   A lone `og:image` tag without dimensions and alt text is incomplete. The SEO component now outputs all four companion tags together; keep them together.

### Content & UX

9. **All CTA buttons must include full interaction classes.**  
   Every `<a>` or `<button>` that acts as a call-to-action must include:
   ```
   min-h-11 items-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color]
   ```
   Bare buttons (`inline-flex rounded-full bg-accent px-5 py-3`) with no hover/focus states are inaccessible and visually inconsistent.

10. **SVG icon paths must be manually verified.**  
    The Twitter/X icon in `Footer.astro` previously had four malformed path segments that rendered nothing recognizable. When adding or editing SVG icons, view the shape in a browser or SVG preview before committing.

---

## 🎯 Project Standards

### Documentation Organization
- **Only `README.md` in repository root**
- All other documentation lives in `docs/` or `.github/` folders
- Session artifacts (ephemeral notes, checklists) go in `.copilot/session-state/*/files/` (not committed)

### Code Cleanup
- Remove all dead code immediately after refactoring
- No commented-out code left behind
- Delete unused imports and variables
- If a file becomes empty after cleanup, delete the file

### Project Organization
- **For this repo (Astro + React):** All source code in `src/`
- No configuration or source files in project root (except essential: `package.json`, `tsconfig.json`, `.env.example`, etc.)

---

## 📋 Audit Framework (4 Pillars)

Use this framework for **all code reviews and audits** on this project:

### Pillar 1: Security & Data Privacy
- ✅ Zero PHI (Protected Health Information) hardcoded
- ✅ No unvetted third-party tracking scripts
- ✅ Analytics opt-in via environment variables only
- ✅ All external links use HTTPS
- ✅ No API keys, credentials, or secrets in source
- ✅ All user input HTML-escaped before use in email templates
- ✅ Security headers present (`src/middleware.ts`)
- ✅ CSP updated when any new CDN domain is added

**Quick Scan:**
```bash
rg "API_KEY|SECRET|PASSWORD|token" src/
rg "localStorage|sessionStorage" src/
rg 'href="http://' src/
# Check email HTML escaping:
rg 'escapeHtml' src/pages/api/contact.ts
# Check middleware is active:
Get-Content src/middleware.ts
```

### Pillar 2: Modern UX & Performance
- ✅ Skip-to-main-content link present + `<main id="main-content">`
- ✅ Images have explicit `width`/`height` (prevents CLS)
- ✅ Below-fold images use `loading="lazy"`
- ✅ Font loading: HTML `<link>` with `media="print" onload` only — never CSS `@import`
- ✅ Font preload has `crossorigin` attribute
- ✅ No references to non-existent files in `public/`
- ✅ Above-fold React islands use `client:load`; below-fold use `client:visible`

**Quick Scan:**
```bash
rg '@import url' src/styles/   # Should return zero matches
rg '<img' src/ | grep -v 'width='
rg 'client:load' src/ | head -20
Get-ChildItem public -Recurse   # Verify referenced assets exist
```

### Pillar 3: Accessibility (WCAG 2.2 AA)
- ✅ Semantic HTML: `<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`
- ✅ Heading hierarchy: h1 → h2 → h3 (no skips, no duplicates)
- ✅ All interactive elements keyboard-accessible
- ✅ Visible focus indicators (`:focus-visible`)
- ✅ ARIA used correctly: `aria-expanded`, `aria-controls`, `aria-label`, `role`
- ✅ Focus management: modals trap Tab; focus returns on close
- ✅ Link text descriptive (avoid "click here", "read more" without context)
- ✅ Alt text on every image (never empty unless `alt=""` for decorative)
- ✅ Status messages use `role="alert"` or `aria-live="assertive"`
- ✅ Forms have `aria-label` on the `<form>` element

**Quick Scan:**
```bash
rg '<main' src/ | grep -v 'id='
rg '<button' src/ | grep -v 'aria-'
rg '<a[^>]*>click here|<a[^>]*>read more' src/
rg '<img' src/ | grep -v 'alt='
```

### Pillar 4: SEO & Structural Integrity
- ✅ Meta description per page (150–160 chars)
- ✅ OG tags: og:type, og:title, og:description, og:image (+ width/height/alt), og:url
- ✅ Twitter Card: conditional `summary` vs `summary_large_image` based on image presence
- ✅ JSON-LD schema (Organization or ProfessionalService for healthcare)
- ✅ Canonical links present
- ✅ All internal links valid and routable
- ✅ External links are HTTPS, active, have `rel="noopener noreferrer"`
- ✅ Sitemap auto-generated or manually maintained
- ✅ Domain consistency: all URLs use `morningtidecc.com`

**Quick Scan:**
```bash
rg 'og:title|og:description' src/
rg 'twitter:card' src/
rg 'application/ld+json' src/
rg 'canonical' src/
rg 'morningtideconsulting' src/ public/   # Must return zero matches
```

---

## 🔧 Severity Triage

When running audits or code reviews:

| Severity | When to Fix | Examples |
|----------|------------|----------|
| **CRITICAL** | Blocker for merge; fix immediately | User input not escaped (injection), missing security headers, wrong contact email |
| **HIGH** | Must fix before feature release | Broken og:image, missing OG/Twitter tags, CTA buttons without focus states |
| **MEDIUM** | Should fix in next sprint | Performance optimization (lazy-load), reduced-motion guards, missing hover transitions |
| **LOW** | Backlog polish | Comment cleanup, minor UX refinement |

---

## 🚀 Common Tasks & Commands

### Run a Full Frontend Audit
```bash
# Interactive audit mode
copilot "Conduct a full 4-pillar frontend audit of this Astro site. 
Report findings by severity (CRITICAL/HIGH/MEDIUM/LOW).
Fix all CRITICAL and HIGH issues. 
Document remaining work in session files."
```

### Verify Domain/Email Consistency
```bash
# Must return zero matches:
rg 'morningtideconsulting' src/ public/
rg 'info@(?!morningtidecc)' src/    # Any non-canonical email
```

### Check Accessibility Issues
```bash
rg --type ts --type tsx --type astro 'aria-expanded|role=' src/
rg '<img' src/ | grep -v 'alt='
rg '<a[^>]*>' src/ | wc -l  # Count all links for manual review
```

### Check for Dead Code
```bash
rg 'TODO|FIXME|HACK|XXX' src/
rg '//' src/ | grep -i 'unused\|dead\|old'
```

### Build & Test
```bash
npm run build        # Verify build succeeds
npm run preview      # Local preview (requires Wrangler)
```

---

## 📝 Commit Message Template

When closing audit issues or fixes, use:

```bash
git commit -m "fix(security): escape HTML in contact email template

- Prevents HTML injection via user-submitted name/email/message fields
- Added escapeHtml() helper to src/pages/api/contact.ts
- All five user fields now sanitized before email interpolation

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

**Pattern:**
- `fix()` or `feat()` or `perf()` as appropriate
- Reference which pillar was fixed (a11y, seo, perf, security)
- Link to audit finding if available
- Always include the Co-authored-by trailer

---

## 🔍 Code Review Checklist

Before approving ANY pull request:

- [ ] **Critical constants**: No `morningtideconsulting` anywhere; email is `info@morningtidecc.com`
- [ ] **Security**: User input escaped before HTML interpolation; no new CDN without CSP update
- [ ] **Fonts**: No CSS `@import url(...)` added; preload has `crossorigin`
- [ ] **Assets**: All `public/` paths referenced in code actually exist
- [ ] **Buttons**: All CTAs have hover/focus/transition classes
- [ ] **SVG icons**: Visually verified in browser or preview
- [ ] **OG image**: If added, includes width/height/alt; if absent, no broken fallback
- [ ] **Audit framework**: Run quick scans for each pillar (see above)
- [ ] **Dead code**: No commented-out code, unused imports, or empty files
- [ ] **Build**: `npm run build` succeeds with no warnings
- [ ] **Semantic HTML**: New components use proper landmarks and heading hierarchy
- [ ] **Accessibility**: ARIA used correctly; focus management in place
- [ ] **Link text**: All links have descriptive text
- [ ] **Alt text**: All images have contextual alt (or `alt=""` if decorative)

---

## 📂 File Structure Reference

```
morningtide/
├── .github/
│   ├── COPILOT_INSTRUCTIONS.md       ← You are here
│   ├── PROJECT_STANDARDS.md          ← Project conventions
│   └── AUDIT_TEMPLATE.md             ← 4-pillar audit checklist
├── src/
│   ├── middleware.ts                 ← Security headers (CSP, X-Frame, etc.)
│   ├── components/                   ← React + Astro components
│   ├── pages/
│   │   └── api/contact.ts            ← Email API — always use escapeHtml()
│   ├── layouts/
│   │   └── Layout.astro              ← Font loading lives here (not in CSS)
│   └── styles/                       ← Global + component CSS (no font @imports)
├── public/                           ← Static assets; verify paths before referencing
├── package.json
├── astro.config.mjs
└── README.md
```

---

## 🎓 When to Escalate to Agents

Use `task` tool to delegate work to specialized agents when:

- ✅ Complex multi-file refactoring (e.g., audit + fix + test)
- ✅ Heavy investigation across many files
- ✅ Build/test failures requiring debug
- ✅ Code review of 50+ lines of changes

**Do NOT use agents for:**
- ❌ Simple grep/view lookups (use grep/view directly)
- ❌ Single-file edits
- ❌ Straightforward replace operations
- ❌ Tasks that fit in <5 direct tool calls

---

## 💾 Session Artifacts

When you run audits, create session files (not committed):

**Location:** `.copilot/session-state/*/files/`

**Files to create:**
- `AUDIT_TODO.md` — Remaining action items (CRITICAL/HIGH/MEDIUM/LOW)
- `AUDIT_FINDINGS.md` — Detailed report with table
- `CHECKLIST.md` — Reusable checklist for next audit

These are **not committed** but help the team track work across sessions.

---

## ❓ Questions?

Refer to:
- `.github/PROJECT_STANDARDS.md` — Project-specific conventions
- `.github/AUDIT_TEMPLATE.md` — Detailed audit checklist
- `docs/` — Architecture and design docs (if present)

