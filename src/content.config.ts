import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const common = {
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  // Drafts are visible in `npm run dev` and left out of the production build.
  draft: z.boolean().default(false),
};

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    ...common,
    stack: z.array(z.string()).default([]),
  }),
});

const decisions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/decisions' }),
  schema: z.object({
    ...common,
    status: z.enum(['Proposed', 'Accepted', 'Superseded', 'Rejected']),
  }),
});

const buildLog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/build-log' }),
  schema: z.object({
    ...common,
    tags: z.array(z.string()).default([]),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lab' }),
  schema: z.object({
    ...common,
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'case-studies': caseStudies,
  decisions,
  'build-log': buildLog,
  lab,
};
