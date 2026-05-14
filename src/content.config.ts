import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from "astro/loaders";
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog/" }),
  schema: z.object({
    title: z.string(),
    date: z.union([z.string(), z.date()]).transform((val) => {
      if (typeof val === 'string') {
        return new Date(val);
      }
      return val;
    }),
    description: z.string().optional(),
    author: z.string().optional(),
    authors: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    minutesRead: z.string().optional(),
  }),
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

// Export the collections object
export const collections = { blog: posts, docs };
