import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ===========================
//     NAVIGATION HELPERS
// ===========================

export function getNavItems() {
  return [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];
}

export async function getBlogPages() {
  // Always include the main blog pages
  const pages = [
    { label: 'All Posts', href: '/blog/' },
    { label: 'Categories', href: '/blog/categories/' },
    { label: 'Tags', href: '/blog/tags/' },
  ];

  try {
    // Import getCollection to check if we have actual content
    const { getCollection } = await import('astro:content');
    
    // Check if we have blog posts
    const blogPosts = await getCollection('blog');
    if (blogPosts && blogPosts.length > 0) {
      // Extract unique categories and tags from actual content
      const categories = new Set<string>();
      const tags = new Set<string>();
      
      blogPosts.forEach((post: { data: { categories?: string[]; tags?: string[] } }) => {
        if (post.data.categories) {
          post.data.categories.forEach((cat: string) => categories.add(cat));
        }
        if (post.data.tags) {
          post.data.tags.forEach((tag: string) => tags.add(tag));
        }
      });

      // Only show Categories and Tags if we have actual content
      if (categories.size === 0) {
        pages.splice(pages.findIndex(p => p.href === '/blog/categories/'), 1);
      }
      if (tags.size === 0) {
        pages.splice(pages.findIndex(p => p.href === '/blog/tags/'), 1);
      }
    } else {
      // No blog posts found, remove categories and tags
      pages.splice(pages.findIndex(p => p.href === '/blog/categories/'), 1);
      pages.splice(pages.findIndex(p => p.href === '/blog/tags/'), 1);
    }
  } catch (error) {
    // If we can't access collections, fall back to basic navigation
    console.warn('Could not load blog collections for dynamic navigation:', error);
  }

  return pages;
}

/**
 * Removes trailing slash from a path.
 */
export function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

/**
 * Determines if a nav item is active based on pathname.
 */
export function isActivePath(href: string, pathname: string) {
  const target = normalizePath(href);
  const current = normalizePath(pathname);

  if (target === '/') return current === '/';

  return current === target || current.startsWith(target + '/');
}