import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

// Export the collections object
export const collections = { blog: posts };
