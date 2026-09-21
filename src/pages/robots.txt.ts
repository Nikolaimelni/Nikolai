import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

// Generated so the domain lives only in astro.config.mjs. Crawlers read
// robots.txt from the root of a host, so under /Nikolai/ this does nothing
// until the custom domain is back.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};
