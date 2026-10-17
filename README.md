# Nikolai Melnichenko

A one-page personal site: who I am, what I work with and how to reach me.
Live at [www.nikolaidev.online](https://www.nikolaidev.online/).

## Built with

- Astro 7, static output, no client-side framework
- TypeScript in strict mode
- Plain CSS with custom properties and cascade layers, no CSS framework
- Astro content collections with Zod schemas
- Orbitron, Inter and Roboto Mono, self-hosted through Astro's fonts API
- Astro's built-in CSP, with script and style hashes worked out at build time
- Playwright for end-to-end tests, Biome for linting and formatting
- GitHub Actions for CI and deploys to GitHub Pages

## Running it

Needs Node 24 and pnpm.

```sh
pnpm install
pnpm dev
```

The dev server runs at http://localhost:4321/.

`pnpm build` and `pnpm preview` show the production build. `pnpm lint`,
`pnpm typecheck` and `pnpm test` are what CI runs.

## Content

Everything on the page comes from `src/data/profile.ts`, plus one markdown file
per project in `src/content/projects/`. A project needs a title, a summary, tags
and a GitHub link; the cover is optional and the card shows a blank frame without
one. A project with `draft: true` stays off the page, and with no published
projects the Projects section and its nav link are left out. After changing the
profile, run `pnpm og` to redraw the social card.

## Known issues

- GitHub Pages cannot send response headers. The CSP goes out as a `<meta>` tag,
  which cannot carry `frame-ancestors`, so nothing stops another site from framing
  the page. Astro also puts that tag at the end of `<head>`, so the font styles and
  the JSON-LD above it fall outside the policy. Both are static.
- The six projects are placeholders until the real write-ups are ready.
- The social card still uses the old blue and green and Plus Jakarta Sans. The
  favicon and touch icon are new, but the card half of `pnpm og` has not been
  redone for the new design, so running it redraws the old card.
- `pnpm og` pulls the font from Google Fonts when it runs, while the site itself
  serves its own copy.
