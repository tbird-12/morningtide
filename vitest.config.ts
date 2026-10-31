import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/__tests__/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/utils/**', 'src/data/**', 'src/pages/api/**'],
			exclude: ['src/__tests__/**'],
		},
	},
	resolve: {
		// Prevent Astro/Cloudflare plugins from loading during test runs
		conditions: ['node'],
	},
});
