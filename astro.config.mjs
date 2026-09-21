// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Домен nikolaidev.online отпущен и занят парковкой, поэтому пока собираем под
// адрес проекта на Pages. Когда домен вернётся: site на него, base убрать.
export default defineConfig({
  site: 'https://nikolaimelni.github.io',
  // Keep the trailing slash: without it @astrojs/sitemap lists the home page twice.
  base: '/Nikolai/',
  integrations: [sitemap()],
});
