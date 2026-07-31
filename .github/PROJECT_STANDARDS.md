# Project Standards — Morningtide

This document defines project-wide conventions for the Morningtide repository. All contributors should follow these standards.

---

## 📚 Documentation

### File Organization
- **Root level:** Only `README.md` belongs in the project root
- **All other docs:** Go in `docs/` or `.github/` folders
- **API docs:** `docs/api/`
- **Architecture:** `docs/architecture/`
- **Contributing guide:** `.github/CONTRIBUTING.md`
- **Copilot instructions:** `.github/COPILOT_INSTRUCTIONS.md`
- **Audit templates:** `.github/AUDIT_TEMPLATE.md`

### Content Standards
- Keep README.md focused: project overview, setup, basic usage
- Long-form documentation (architecture, design decisions) goes in `docs/`
- Session artifacts (ephemeral notes, to-do lists) do NOT get committed

---

## 🧹 Code Cleanup

### Immediate Actions After Refactoring
1. **Remove commented-out code** — Dead code should be deleted, not commented
2. **Delete unused imports** — Keep imports lean and scannable
3. **Remove unused variables and functions** — No dead functions
4. **Delete empty files** — If a file becomes empty after cleanup, delete the file
5. **No TODO/FIXME without issues** — If you add a TODO, create a GitHub issue and reference it

### Pre-Commit Checklist
- [ ] No `console.log()` or debug statements left behind
- [ ] No commented code blocks
- [ ] No unused imports
- [ ] No empty files
- [ ] No merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)

---

## 📁 Project Organization

### Source Code Structure
```
src/
├── components/          ← React + Astro components
│   ├── Header.tsx       ← Client component
│   ├── Footer.tsx
│   ├── Layout.astro     ← Astro layout
│   └── ...
├── pages/               ← Routes (Astro file-based routing)
│   ├── index.astro      ← Home page
│   ├── services/
│   │   └── index.astro  ← Services overview
│   └── ...
├── layouts/             ← Reusable layout wrappers
│   └── Layout.astro
├── styles/              ← Global CSS
│   ├── global.css
│   ├── base.css
│   └── ...
└── assets/              ← Images, icons
    └── logo.svg
```

### Key Rules
- **No source code in root** — Everything goes in `src/`
- **No Python files in root** — All Python source in `src/` (if applicable to project)
- **Component co-location** — Keep styles, tests next to components when possible
- **No `src/utils.ts` dumping ground** — Organize utilities by domain (e.g., `src/utils/validation.ts`)

---

## 🎨 Code Style

### TypeScript/TSX
- Use strict mode (`strict: true` in `tsconfig.json`)
- Prefer `const` over `let`; never use `var`
- Use descriptive variable names (no single letters except loop counters)
- Export named exports; use default export only for page components

### React Components (TSX)
- Use functional components with hooks
- Props should be typed via `interface Props`
- Use `client:load`, `client:visible`, etc. in Astro files; not in TSX
- No prop drilling — use context for shared state

### Astro Components
- Use `---` frontmatter for server-side logic
- Keep component scripts focused and readable
- Use semantic HTML: `<header>`, `<main>`, `<nav>`, `<footer>`
- Client components marked with `client:*` directives at component boundary

### CSS / Tailwind
- Use Tailwind utilities for most styling
- Keep custom CSS in `src/styles/` for layout/theme
- CSS variable names: kebab-case (e.g., `--color-accent`, `--shadow-brand`)
- Avoid `!important` — improve specificity instead

---

## ♿ Accessibility Standards (WCAG 2.2 AA)

### All Components Must:
- Use semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<aside>`)
- Have proper heading hierarchy (h1 → h2 → h3, no skips)
- Include visible focus indicators (`:focus-visible`)
- Be fully keyboard navigable (Tab, Enter, Escape, Arrow keys)
- Have appropriate ARIA labels and roles (used sparingly, not overused)

### Interactive Components:
- Buttons: `<button>` element or `role="button"` + keyboard handler
- Dropdowns: `aria-expanded`, `aria-haspopup`, `role="menu"`
- Modals: `role="dialog" aria-modal="true"`, focus trap, escape closes
- Accordions: `aria-controls`, panel has `id`, proper `aria-expanded` state

### Images & Media:
- Every `<img>` has `alt` text (contextual, never `alt="image"` or `alt="photo"`)
- Decorative images use `alt=""` + `aria-hidden="true"`
- Images have explicit `width` and `height` to prevent CLS

### Forms:
- All inputs have associated `<label>` (via `for` or nested)
- Error messages associated with inputs via `aria-describedby`
- Form validation happens on both client and server

---

## 🔒 Security Standards

### No Secrets in Source
- Never commit `.env.local`, API keys, tokens, or passwords
- Use `.env.example` as a template (with placeholder values only)
- Sensitive config goes in deployment environment variables

### Third-Party Scripts
- All analytics/tracking must be opt-in (via environment variable)
- External links use HTTPS + `rel="noopener noreferrer"`
- Sanitize user input before rendering (if applicable)

### Data Privacy
- No PHI (Protected Health Information) hardcoded
- Session storage: only non-sensitive theme/UI preferences
- Comply with relevant regulations (HIPAA for healthcare, CCPA for CA residents)

---

## 📝 Commit Message Standards

### Format
```
<type>(<scope>): <subject>

<body>

Co-authored-by: Name <email>
```

### Types
- `fix:` — Bug fixes
- `feat:` — New features
- `perf:` — Performance improvements
- `refactor:` — Code restructuring (no behavior change)
- `docs:` — Documentation updates
- `test:` — Test additions/updates
- `chore:` — Build, deps, tooling

### Scopes (Examples)
- `a11y` — Accessibility fix
- `seo` — SEO improvement
- `perf` — Performance
- `images` — Image optimization
- `components` — Component changes
- `layout` — Layout changes

### Example
```
fix(a11y): add skip-to-main-content link

- Improves WCAG 2.4.1 keyboard navigation
- Users can now Tab to skip header nav
- Fixes #42

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

## 🧪 Testing Standards

### When to Test
- All utility functions should have tests
- Complex components should have tests
- Bug fixes should include regression tests

### Tools
- Framework: Vitest (if tests exist)
- Run with: `npm run test` (if script exists)
- Coverage target: 80%+ for critical paths

---

## 🚀 Deployment Standards

### Build
- `npm run build` must succeed with zero errors and zero warnings
- Build artifacts in `dist/`

### Environment
- `.env.example` must include all required variables
- Sensitive values are injected at deploy time (via Cloudflare, GitHub Actions, etc.)
- `SITE_URL` is set in production for absolute URLs in metadata

### Performance
- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

---

## ✅ Pre-Release Checklist

Before merging to main or deploying:

- [ ] Build succeeds: `npm run build`
- [ ] All tests pass: `npm run test` (if applicable)
- [ ] Audit passes: 4-pillar audit (see `.github/COPILOT_INSTRUCTIONS.md`)
- [ ] No dead code left behind
- [ ] Commit messages follow standards
- [ ] Documentation updated (if applicable)
- [ ] Accessibility check: Can navigate with keyboard only
- [ ] Link check: All internal links valid, external links active
- [ ] Images: All have alt text, width/height, loading="lazy" if below fold

---

## 📖 References

- [WCAG 2.2 AA Checklist](https://www.w3.org/WAI/WCAG22/quickref/)
- [Astro Docs](https://docs.astro.build)
- [Web.dev Accessibility](https://web.dev/accessible/)
- [Schema.org](https://schema.org/)

