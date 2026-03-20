# Morning Tide

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

## SEO defaults

The shared layout now includes reusable SEO metadata, so all pages automatically get:

- description
- canonical URL (when available)
- robots directives
- Open Graph tags
- Twitter card tags

You can override per page by passing props to the layout:

```astro
<Layout
	title="Page title"
	description="Page description"
	canonical="/pricing"
	image="/social/pricing-og.png"
	type="article"
	noindex={false}
>
	<!-- page content -->
</Layout>
```

## Analytics (GA-ready)

Global GA script loading is prepared and only activates when a measurement ID is present.

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` when ready.
3. Optionally set `SITE_URL=https://your-domain.com` for absolute metadata URLs.
