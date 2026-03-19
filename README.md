# Morning Tide

Astro + Tailwind CSS starter template with editable global design tokens.

## Run locally

```bash
npm install
npm run dev
```

## Theme tokens

Update the global colors and fonts in `src/styles/global.css`:

- `--color-page`
- `--color-surface`
- `--color-surface-strong`
- `--color-brand`
- `--color-brand-soft`
- `--color-accent`
- `--color-accent-soft`
- `--color-ink`
- `--color-muted`
- `--color-line`
- `--font-body`
- `--font-display`

The homepage intentionally uses those variables through Tailwind utility classes such as `bg-[var(--color-brand)]` and `text-[var(--color-muted)]`, so updating the tokens will restyle the template quickly.
