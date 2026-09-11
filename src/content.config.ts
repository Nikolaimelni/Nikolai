import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Lower number sorts higher on the page.
      order: z.number(),
      summary: z.string(),
      role: z.string(),
      stack: z.array(z.string()),
      outcome: z.string(),
      cover: image(),
      coverAlt: z.string(),
      url: z.string().url().optional(),
      // The project's domain is gone. Set this so the card renders without a dead link.
      offline: z.boolean().default(false),
    }),
});

export const collections = { projects };
