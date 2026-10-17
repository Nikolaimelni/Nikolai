# Nikolai Melnichenko

A one-page personal site: who I am, what I work with and how to reach me.
Live at [www.nikolaidev.online](https://www.nikolaidev.online/).

## Built with

- Astro 7, static output, no client-side framework
- TypeScript in strict mode
- Plain CSS, no CSS framework: scoped `<style>` in each component, shared tokens
  and cascade layers in `src/styles/`, light and dark themes through `light-dark()`
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
