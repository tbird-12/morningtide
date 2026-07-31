# GitHub Documentation & Templates

This folder contains operational and template documentation for the Morningtide repository.

---

## 📄 Files

### `COPILOT_INSTRUCTIONS.md` ⭐ START HERE
**For:** GitHub Copilot CLI users, agents, and contributors

Standing instructions for all work on this repository. Read this first before:
- Running audits
- Starting new features
- Conducting code reviews
- Debugging issues

Covers:
- 4-pillar audit framework (HIPAA, UX/Performance, Accessibility, SEO)
- Severity triage
- Common commands
- Code review checklist

---

### `PROJECT_STANDARDS.md`
**For:** All contributors

Project-wide conventions and standards:
- Documentation organization (README in root only; docs/ for everything else)
- Code cleanup rules (no dead code, unused imports, etc.)
- Project structure (src/ for all source; no Python in root)
- Code style (TypeScript, React, Astro, CSS/Tailwind)
- Accessibility standards (WCAG 2.2 AA)
- Security standards (no secrets, third-party script policy)
- Commit message format
- Pre-release checklist

---

### `AUDIT_TEMPLATE.md`
**For:** Auditors using Copilot CLI to run full 4-pillar audits

Detailed steps for running comprehensive audits:
- Step-by-step execution guide
- Quick scans for each pillar
- Full report template (copy-paste ready)
- Severity levels explained
- Quick fix snippets
- Commands reference

Used for:
- Initial full audits
- Recurring code reviews
- Quality gates before release

---

## 🎯 Quick Links

| Task | Start Here |
|------|-----------|
| **I'm new to this repo** | Read `COPILOT_INSTRUCTIONS.md` (5 min) |
| **I'm running an audit** | Copy/fill `AUDIT_TEMPLATE.md` (60 min) |
| **I'm contributing code** | Follow `PROJECT_STANDARDS.md` |
| **I'm doing code review** | Check `COPILOT_INSTRUCTIONS.md` → "Code Review Checklist" |

---

## 📋 What NOT to Put Here

- **Project README** → Goes in repository root (`/README.md`)
- **Architecture docs** → Goes in `docs/architecture/`
- **API documentation** → Goes in `docs/api/`
- **Session notes** → Go in `.copilot/session-state/*/files/` (not committed)
- **Temporary checklists** → Go in session files or issues

---

## 🔄 Workflow

### Audit Workflow
1. **Before audit:** Read `COPILOT_INSTRUCTIONS.md` → "Audit Framework"
2. **During audit:** Follow steps in `AUDIT_TEMPLATE.md`
3. **After audit:** Create session artifact `/session-files/AUDIT_TODO.md` with remaining work
4. **Commit fixes:** Use commit message template from `COPILOT_INSTRUCTIONS.md`

### Code Review Workflow
1. Check `PROJECT_STANDARDS.md` → relevant section
2. Use checklist from `COPILOT_INSTRUCTIONS.md` → "Code Review Checklist"
3. Reference findings against `AUDIT_TEMPLATE.md` severity levels

### Contribution Workflow
1. Read `PROJECT_STANDARDS.md` completely
2. Follow code style, documentation, and cleanup rules
3. Run audit before submitting PR
4. Use commit message format from `PROJECT_STANDARDS.md`

---

## 🤖 For Copilot Agents

If you're an automated agent (task, explore, code-review, etc.):

1. **First action:** Read `COPILOT_INSTRUCTIONS.md` (stored in repo for your reference)
2. **For audits:** Use `AUDIT_TEMPLATE.md` as your execution guide
3. **For code changes:** Verify against `PROJECT_STANDARDS.md`
4. **Output:** Document findings in session artifacts (`/session-files/`)
5. **Handoff:** Leave clear TODO items for humans to follow

---

## 📝 Maintenance

These files should be updated:
- **Monthly:** Review for accuracy against actual project practices
- **When standards change:** Add new sections and update references
- **After major audits:** Incorporate findings into templates
- **When processes improve:** Document new best practices

---

## ❓ Questions?

Refer to:
- `COPILOT_INSTRUCTIONS.md` → Audit framework and commands
- `PROJECT_STANDARDS.md` → Conventions and code style
- `AUDIT_TEMPLATE.md` → Step-by-step audit execution
- Main `README.md` (root) → Project overview

