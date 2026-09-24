import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { sephirot } from './data/sephirot';

const projects = defineCollection({
  // One file per project per locale: src/content/projects/<locale>/<slug>.md
  loader: glob({ base: './src/content/projects', pattern: '*/*.md' }),
  schema: z.object({
    name: z.string().min(1),
    sephirah: z.enum(sephirot),
    /** One primary project per sephirah; satellites orbit around it. */
    role: z.enum(['primary', 'satellite']),
    /** Sort order among satellites of the same sephirah. */
    order: z.number().int().default(0),
    tagline: z.string().min(1),
    problem: z.string().min(1),
    stack: z.array(z.string().min(1)),
    status: z.enum(['active', 'research', 'paused']),
    repo: z
      .url()
      .refine((url) => url.startsWith('https://github.com/ragePolpette/'), {
        message: 'repo must be a public repository under github.com/ragePolpette',
      })
      .optional(),
    /** Named parts of a project (Exodia's cards). `project` links to another entry by slug. */
    components: z
      .array(
        z.object({
          card: z.string().min(1),
          label: z.string().min(1),
          role: z.string().min(1),
          project: z.string().optional(),
          external: z.boolean().default(false),
        }),
      )
      .optional(),
  }),
});

export const collections = { projects };
