// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || undefined,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()],

  adapter: cloudflare()
});