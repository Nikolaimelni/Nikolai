// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// nikolaidev.online lapsed and is parked, so for now this builds for the Pages
// project URL. When the domain is back, point site at it and drop base.
export default defineConfig({
  site: 'https://nikolaimelni.github.io',
  // Keep the trailing slash: without it @astrojs/sitemap lists the home page twice.
  base: '/Nikolai/',
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
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: [400, 600, 800],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
});
