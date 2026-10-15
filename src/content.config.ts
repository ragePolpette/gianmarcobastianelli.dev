import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { nodeIds } from './data/nodes';

const projects = defineCollection({
  // One file per project per locale: src/content/projects/<locale>/<slug>.md
  loader: glob({ base: './src/content/projects', pattern: '*/*.md' }),
  schema: z.object({
    name: z.string().min(1),
    node: z.enum(nodeIds),
    /** One primary project per tree node; satellites orbit around it. */
    role: z.enum(['primary', 'satellite']),
    kind: z.enum(['agent', 'mcp', 'tooling', 'research']),
    /** Sort order among satellites of the same node. */
    order: z.number().int().default(0),
    tagline: z.string().min(1),
    /** Short line shown under the node on the tree. */
    summary: z.string().min(1).max(40),
    problem: z.string().min(1),
    /** What the project actually delivers today: a result, not a description. */
    outcome: z.string().min(1),
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

const pages = defineCollection({
  // Site sections that live on the tree without being projects: src/content/pages/<locale>/<slug>.md
  loader: glob({ base: './src/content/pages', pattern: '*/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    node: z.enum(nodeIds),
    /** Small label above the title, on the tree and on the page. */
    eyebrow: z.string().min(1),
    /** Short line shown under the node on the tree. */
    summary: z.string().min(1).max(44),
    lead: z.string().min(1),
    description: z.string().min(1).max(200),
  }),
});

export const collections = { projects, pages };
