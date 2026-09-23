import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) => {
    const shared = {
      title: z.string(),
      // Lower number sorts higher on the page.
      order: z.number(),
      summary: z.string(),
      role: z.string(),
      stack: z.array(z.string()),
      outcome: z.string(),
      cover: image(),
      coverAlt: z.string(),
    };

    return z.discriminatedUnion('status', [
      z.object({ ...shared, status: z.literal('live'), url: z.url() }),
      // The product has shut down, so there is nothing left to link to.
      z.object({ ...shared, status: z.literal('closed') }),
    ]);
  },
});

export const collections = { projects };
