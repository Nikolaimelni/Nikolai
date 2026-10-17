// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://www.nikolaidev.online',
  integrations: [sitemap()],
  // Pages cannot send headers, so this goes out as a <meta> tag, and a meta CSP
  // cannot carry frame-ancestors. Astro adds the script and style hashes itself.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        'form-action https://formspree.io',
        'connect-src https://formspree.io',
        "require-trusted-types-for 'script'",
      ],
    },
  },
  // Fetched from Google at build time and served from the site itself, so a
  // visitor's browser never talks to Google.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Orbitron',
      cssVariable: '--font-orbitron',
      weights: [500, 700],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Roboto Mono',
      cssVariable: '--font-roboto-mono',
      weights: [500],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
