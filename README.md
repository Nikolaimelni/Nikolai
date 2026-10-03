# Nikolai Melnichenko

A one-page personal site: who I am, what I work with and how to reach me.
Live at [nikolaimelni.github.io/Nikolai](https://nikolaimelni.github.io/Nikolai/).

## Built with

- Astro 7, static output, no client-side framework
- TypeScript in strict mode
- Plain CSS with custom properties and cascade layers, no CSS framework
- Astro content collections with Zod schemas
- Plus Jakarta Sans, self-hosted through Astro's fonts API
- Astro's built-in CSP, with script and style hashes worked out at build time
- Playwright for end-to-end tests, Biome for linting and formatting
- GitHub Actions for CI and deploys to GitHub Pages

## Running it

Needs Node 24 and pnpm.

```sh
pnpm install
pnpm dev
```

The dev server runs at http://localhost:4321/Nikolai/.

`pnpm build` and `pnpm preview` show the production build. `pnpm lint`,
`pnpm typecheck` and `pnpm test` are what CI runs.

## Content

Everything on the page comes from `src/data/profile.ts`, plus one markdown file
per project in `src/content/projects/`. A project with `draft: true` stays off
the page, and with no published projects the Work section and its nav link are
left out. After changing the profile, run `pnpm og` to redraw the social card.

## Known issues

- The custom domain lapsed, so the site builds for the Pages project URL. Under
  `/Nikolai/` the generated `robots.txt` does nothing: crawlers only read it from
  the root of a host.
- GitHub Pages cannot send response headers. The CSP goes out as a `<meta>` tag,
  which cannot carry `frame-ancestors`, so nothing stops another site from framing
  the page. Astro also puts that tag at the end of `<head>`, so the font styles and
  the JSON-LD above it fall outside the policy. Both are static.
- Both projects are drafts for now, so the Work section is off.
- `pnpm og` pulls the font from Google Fonts when it runs, while the site itself
  serves its own copy.
