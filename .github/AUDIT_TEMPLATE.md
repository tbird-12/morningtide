# Audit Template — 4-Pillar Framework

Use this template for all future audits on Morningtide. Copy and customize as needed.

---

## Audit Execution Steps

### 1. Discovery (5 min)
```bash
find src -type f -name "*.astro" -o -name "*.tsx" -o -name "*.ts" | wc -l
cat package.json | grep -A 20 '"dependencies"'
head -30 README.md
```

### 2. Pillar 1: HIPAA & Privacy Scans (10 min)

| Check | Command | Expected |
|-------|---------|----------|
| No hardcoded secrets | `rg "API_KEY\|SECRET\|PASSWORD\|token" src/` | Zero matches |
| No PHI | `rg "SSN\|\d{3}-\d{2}-\d{4}" src/` | Zero matches |
| Analytics opt-in | `grep -r "gtag\|ga_id" src/` | Only conditional loads via env var |
| HTTPS external links | `rg 'href="http://' src/` | Zero matches (except internal) |
| Tracking policy | Check FAQs/about for privacy notice | Clear explanation |

**Findings Template:**
```
| ID | Severity | Finding | Fix |
|----|----------|---------|-----|
| H1 | ✅ INFO | Analytics conditional on GA_MEASUREMENT_ID | Verified |
| H2 | ✅ CLEAN | No secrets in source | Verified |
```

---

### 3. Pillar 2: UX & Performance Scans (15 min)

| Check | Command | Expected |
|-------|---------|----------|
| Skip link | `grep -r 'href="#main-content"' src/` | At least 1 match |
| Main ID | `rg '<main[^>]*id="main-content"' src/` | All pages have it |
| Image dimensions | `rg '<img[^>]*>' src/ \| grep -v 'width='` | Zero matches |
| Lazy load below fold | `rg 'loading="lazy"' src/` | Present on appropriate images |
| Font display | `rg 'font-display' src/` | `font-display: swap` or preload |
| Client directives | `rg 'client:load' src/` | Only Header (above fold) |
| Unused deps | `npm ls` | No warnings |

**Findings Template:**
```
| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| U1 | ✅ FIXED | Skip link added | Done |
| U2 | HIGH | Hero images are text placeholders | Flagged for next sprint |
```

---

### 4. Pillar 3: Accessibility Scans (20 min)

| Check | Command | Expected |
|-------|---------|----------|
| Semantic landmarks | `rg '<header>\|<main>\|<nav>\|<footer>' src/` | All used appropriately |
| Heading hierarchy | Manually review | h1 → h2 → h3 (no skips) |
| Skip link | `rg 'Skip.*main' src/` | Present, keyboard accessible |
| Aria-expanded | `rg 'aria-expanded' src/` | On dropdowns/modals/accordions |
| Aria-controls | `rg 'aria-controls' src/` | Button/panel properly wired |
| Focus indicators | Check CSS | `:focus-visible` defined |
| Link text | `rg '<a[^>]*>(click here\|read more)<' src/` | Zero vague links |
| Alt text | `rg '<img[^>]*>' src/ \| grep -v 'alt='` | Zero matches (all images have alt) |
| Reduced motion | Check components | `prefers-reduced-motion` respected |

**Findings Template:**
```
| ID | Severity | Finding | Fix |
|----|----------|---------|-----|
| A1 | ✅ FIXED | Skip link added | Done |
| A2 | ✅ FIXED | Accordion aria-controls wired | Done |
| A3 | ✅ FIXED | Mobile menu focus trap + role=dialog | Done |
| A5 | ✅ FIXED | Link text contextualised | Done |
```

---

### 5. Pillar 4: SEO & Structure Scans (15 min)

| Check | Command | Expected |
|-------|---------|----------|
| Meta description | `rg 'name="description"' src/` | Per page, 150–160 chars |
| OG tags | `rg 'og:title\|og:description' src/` | All 5 OG tags present |
| Twitter card | `rg 'twitter:card\|twitter:title' src/` | All 4 Twitter tags present |
| JSON-LD schema | `rg 'application/ld+json' src/` | Schema present (Organization/ProfessionalService) |
| Canonical | `rg 'rel="canonical"' src/` | Every page has one |
| Internal links | Manual review | All routable, no dead links |
| External links | `rg 'href="https://' src/ \| grep -v 'rel='` | HTTPS + proper rel |
| Sitemap | `ls public/sitemap.xml` or check `astro.config` | Present or auto-generated |

**Findings Template:**
```
| ID | Severity | Finding | Fix |
|----|----------|---------|-----|
| S1 | ✅ FIXED | Twitter Card tags added | Done |
| S2 | ✅ FIXED | JSON-LD ProfessionalService schema added | Done |
| S3 | ✅ FIXED | OG default image fallback added | Awaiting /public/og-default.png |
| S4 | ✅ FIXED | Missing closing div in index.astro | Done |
```

---

## Full Audit Report Template

```markdown
# Audit Report: Morningtide — [Date]

## Executive Summary
- **Status:** ✅ PASSED / 🟡 PASSED WITH CAVEATS / ❌ FAILED
- **CRITICAL Issues:** 0
- **HIGH Issues:** 3 (Flagged for next sprint)
- **MEDIUM Issues:** 2
- **LOW Issues:** 1
- **Total:** 6 findings (4 fixed, 2 pending)

## Pillar 1: HIPAA & Privacy — ✅ PASSED
| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| H1 | ✅ | Analytics opt-in via env var | Verified |
| H2 | ✅ | No secrets in source | Verified |
| H3 | ✅ | HTTPS external links only | Verified |

## Pillar 2: UX & Performance — ✅ PASSED (WITH MINOR FLAGS)
| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| U1 | ✅ FIXED | Skip link added to Layout.astro | Done |
| U2 | HIGH | Hero logo/headshot are text placeholders | Flagged — add real images + width/height |
| U3 | MEDIUM | theme-color hardcoded light | Acceptable (JS patches inline) |
| U4 | MEDIUM | Framer-motion on every page | Consider client:visible for non-critical |

## Pillar 3: Accessibility — ✅ PASSED
| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| A1 | ✅ FIXED | Skip link wired | Done |
| A2 | ✅ FIXED | Accordion aria-controls added | Done |
| A3 | ✅ FIXED | Mobile menu focus trap + dialog role | Done |
| A4 | ✅ FIXED | Dropdown aria-label added | Done |
| A5 | ✅ FIXED | Link text contextualised | Done |

## Pillar 4: SEO — ✅ PASSED
| ID | Severity | Finding | Status |
|----|----------|---------|--------|
| S1 | ✅ FIXED | Twitter Card tags added | Done |
| S2 | ✅ FIXED | JSON-LD schema added | Done |
| S3 | ✅ FIXED | OG default image path wired | Done (needs file: /public/og-default.png) |
| S4 | ✅ FIXED | Missing closing div fixed | Done |
| S5 | LOW | Sitemap not configured | Pending: npx astro add sitemap |

## Remaining Action Items (Not Blocking)

### 🔴 Must-Do (Before Production)
1. Add `/public/og-default.png` (1200×630px)
2. Replace image placeholders with actual `<img>` tags + alt text

### 🟡 Should-Do (Next Sprint)
1. Add `useReducedMotion()` guards to animation components
2. Swap below-fold FadeIn to `client:visible`
3. Setup Astro sitemap integration

---

## Build Verification
```
✅ npm run build succeeded (0 errors, 0 warnings)
✅ All 20 pages pre-rendered successfully
✅ No console errors in browser
```

## Audit Date
- **Date:** 2026-07-31
- **Auditor:** Copilot CLI
- **Time Spent:** ~60 minutes
```

---

## Severity Levels Explained

| Severity | Definition | Example | Action |
|----------|-----------|---------|--------|
| **CRITICAL** | Blocker; fails WCAG, leaks data, breaks UX | Missing skip link, hardcoded API key | Fix immediately |
| **HIGH** | Must fix before release; significantly impacts SEO/a11y | Missing OG tags, vague link text | Fix in current sprint |
| **MEDIUM** | Should fix soon; improves performance/UX | Image optimization, lazy-load | Next sprint |
| **LOW** | Nice-to-have polish | Code comments, minor refinement | Backlog |

---

## Quick Fix Snippets

### Add Skip Link
```html
<!-- In Layout.astro or main layout -->
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
<main id="main-content">...</main>
```

### Wire Accordion ARIA
```tsx
const uid = useId();
const panelId = `accordion-panel-${uid}`;

<button aria-expanded={open} aria-controls={panelId}>Question</button>
<div id={panelId} role="region" aria-labelledby={triggerId}>{answer}</div>
```

### Add OG/Twitter Tags
```html
<meta property="og:image" content="/og-default.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/og-default.png" />
```

### Add JSON-LD
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Morning Tide Consulting and Collective",
  "url": "https://morningtideconsulting.com"
}
</script>
```

---

## Commands Reference

```bash
# Scan for secrets
rg "API_KEY|SECRET|PASSWORD" src/

# Find vague link text
rg '<a[^>]*>(click here|read more)<' src/

# Find images without alt
rg '<img' src/ | grep -v 'alt='

# Find missing widths
rg '<img' src/ | grep -v 'width='

# Check all links
rg '<a href="([^"]*)"' src/

# Count pages
find src/pages -name "*.astro" | wc -l

# Build
npm run build

# View build output
ls -la dist/client/ | head -20
```

