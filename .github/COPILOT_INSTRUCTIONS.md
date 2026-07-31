# Copilot CLI Instructions for Morningtide

This document provides standing instructions for all GitHub Copilot CLI agents working on the Morningtide repository. **Read this before starting any task.**

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

### Pillar 1: HIPAA Mindfulness & Data Privacy
- ✅ Zero PHI (Protected Health Information) hardcoded
- ✅ No unvetted third-party tracking scripts
- ✅ Analytics opt-in via environment variables only
- ✅ All external links use HTTPS
- ✅ No API keys, credentials, or secrets in source

**Quick Scan:**
```bash
rg "API_KEY|SECRET|PASSWORD|token" src/
rg "localStorage|sessionStorage" src/
grep -r "http://" src/
```

### Pillar 2: Modern UX & Performance
- ✅ Skip-to-main-content link present + `<main id="main-content">`
- ✅ Images have explicit `width`/`height` (prevents CLS)
- ✅ Below-fold images use `loading="lazy"`
- ✅ Font optimization: `font-display: swap` or preload
- ✅ Above-fold React islands use `client:load`; below-fold use `client:visible`

**Quick Scan:**
```bash
rg '<img' src/ | grep -v 'width='
rg 'client:load' src/ | head -20
```

### Pillar 3: Accessibility (WCAG 2.2 AA)
- ✅ Semantic HTML: `<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`
- ✅ Heading hierarchy: h1 → h2 → h3 (no skips, no duplicates)
- ✅ All interactive elements keyboard-accessible
- ✅ Visible focus indicators (`:focus-visible`)
- ✅ ARIA used correctly: `aria-expanded`, `aria-controls`, `aria-label`, `role`
- ✅ Focus management: modals trap Tab; focus returns on close
- ✅ Link text descriptive (avoid "click here", "read more" without context)
- ✅ Alt text on every image (never empty unless `alt=""`for decorative)

**Quick Scan:**
```bash
rg '<main' src/ | grep -v 'id='
rg '<button' src/ | grep -v 'aria-'
rg '<a[^>]*>click here|<a[^>]*>read more' src/
rg '<img' src/ | grep -v 'alt='
```

### Pillar 4: SEO & Structural Integrity
- ✅ Meta description per page (150–160 chars)
- ✅ OG tags: og:type, og:title, og:description, og:image, og:url
- ✅ Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image
- ✅ JSON-LD schema (Organization or ProfessionalService for healthcare)
- ✅ Canonical links present
- ✅ All internal links valid and routable
- ✅ External links are HTTPS, active, have `rel="noopener noreferrer"`
- ✅ Sitemap auto-generated or manually maintained

**Quick Scan:**
```bash
rg 'og:title|og:description' src/
rg 'twitter:card' src/
rg 'application/ld+json' src/
rg 'canonical' src/
```

---

## 🔧 Severity Triage

When running audits or code reviews:

| Severity | When to Fix | Examples |
|----------|------------|----------|
| **CRITICAL** | Blocker for merge; fix immediately | Skip link missing, no `id="main-content"`, hardcoded API key, data leak |
| **HIGH** | Must fix before feature release | Missing OG/Twitter tags, unoptimized images, vague link text |
| **MEDIUM** | Should fix in next sprint | Performance optimization (lazy-load), reduced-motion guards |
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

### Check Accessibility Issues
```bash
rg --type ts --type tsx --type astro 'aria-expanded|role=' src/
rg '<img' src/ | grep -v 'alt='
rg '<a[^>]*>' src/ | wc -l  # Count all links for manual review
```

### Check for Dead Code
```bash
rg 'TODO|FIXME|HACK|XXX' src/
rg '//' src/ | grep -i 'unused\|dead\|old'  # Scan for commented code
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
git commit -m "fix(a11y): add skip-to-main-content link

- Improves WCAG 2.4.1 compliance
- Keyboard users can now bypass header nav
- Fixed in Layout.astro

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

- [ ] **Audit framework**: Run quick scans for each pillar (see above)
- [ ] **Dead code**: No commented-out code, unused imports, or empty files
- [ ] **Documentation**: Updated `docs/` or `.github/` if needed
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
│   ├── components/                   ← React + Astro components
│   ├── pages/                        ← Routes
│   ├── layouts/                      ← Layout components
│   └── styles/                       ← Global + component CSS
├── public/                           ← Static assets (images, fonts)
├── docs/                             ← Documentation (if added)
├── package.json                      ← Dependencies
├── astro.config.mjs                  ← Build config
└── README.md                         ← Main project README (only doc in root)
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

