// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Домен nikolaidev.online отпущен и занят парковкой, поэтому пока собираем под
// адрес проекта на Pages. Когда домен вернётся: site на него, base убрать.
export default defineConfig({
  site: 'https://nikolaimelni.github.io',
  base: '/Nikolai',
  integrations: [sitemap()],
});
