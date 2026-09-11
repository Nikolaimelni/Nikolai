# nikolaidev

My personal site. One page: who I am, what I have shipped, and how to reach me.

It used to be a Start Bootstrap template with my edits written straight into the
compiled `bootstrap.css`. That worked until it didn't, so this is the rewrite.

## Running it

```sh
pnpm install
pnpm dev
```

Build and look at the real output:

```sh
pnpm build && pnpm preview
```

Everything else:

| command | what it does |
| --- | --- |
| `pnpm lint` | Biome over the TypeScript, CSS and config |
| `pnpm typecheck` | `astro check`, which covers the `.astro` files |
| `pnpm test` | Playwright, offline |
| `pnpm test:links` | hits every outbound link, runs weekly in CI |
| `pnpm og` | regenerates the social card and the touch icon |

## Where things are

Career data lives in `src/data/profile.ts`. Job, dates, bullet points, the
availability line, the numbers in the hero: all of it is there, so updating the
CV never means opening a component.

Projects are markdown in `src/content/projects/`, validated by a Zod schema in
`src/content.config.ts`. A project whose domain has died gets `offline: true`
and renders without a link.

Styles are two files. `src/styles/tokens.css` holds the colours and the type
scale, `src/styles/base.css` the element defaults. Components carry their own
CSS in their `.astro` file.

## Decisions worth explaining

**Astro, not Next.js.** The page has one interactive thing on it, the contact
form. Shipping a React runtime to render static text is a strange trade. Astro
builds it to HTML and the only JavaScript on the page is the twenty lines that
submit the form.

**No CSS framework.** Tailwind on a fifteen-component site buys less than it
costs, and the old site is the argument: the whole problem was a vendored
framework I had edited from the inside.

**Biome does not lint `.astro`.** It reads the frontmatter without seeing the
template, so every import used only in markup looks unused. `astro check` covers
those files instead, and Biome handles the rest.

**The green changed.** It was `#00B945`. White text on it measures 2.62:1, which
fails WCAG AA, and that green was on the main button. It is `#046A38` now, at
6.72:1. The original survives as `--vivid`, behind the photo, where no text sits
on top of it.

## Known issues

The custom domain lapsed and is now a parking page, so the site is served from
the GitHub Pages project URL. That is why `astro.config.mjs` sets a `base`. When
the domain comes back, point `site` at it, drop `base`, and put `CNAME` back in
`public/`.

Fonts still come from Google Fonts, which is two extra connections before the
page can paint. Self-hosting through `@fontsource` would kill that, and it is the
next thing I would do.

There is no blog. Content collections are already set up for one, so the
scaffolding exists whenever I have something worth writing down.
