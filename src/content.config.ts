import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Lower number sorts higher on the page.
      order: z.number(),
      summary: z.string(),
      tags: z.array(z.string()),
      github: z.url(),
      cover: z.object({ src: image(), alt: z.string() }).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
