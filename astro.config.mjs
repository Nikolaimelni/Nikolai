// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// nikolaidev.online lapsed and is parked, so for now this builds for the Pages
// project URL. When the domain is back, point site at it and drop base.
export default defineConfig({
  site: 'https://nikolaimelni.github.io',
  // Keep the trailing slash: without it @astrojs/sitemap lists the home page twice.
  base: '/Nikolai/',
  integrations: [sitemap()],
});
