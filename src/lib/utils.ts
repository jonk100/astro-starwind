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

export const getTagColor = (tag: string) => {
  const tagColors: { [key: string]: string } = {
    'mental health': 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-color: #3b82f6;',
    'mindfulness': 'background: linear-gradient(135deg, #10b981, #059669); color: white; border-color: #10b981;',
    'stress management': 'background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; border-color: #f59e0b;',
    'anxiety': 'background: linear-gradient(135deg, #ef4444, #ec4899); color: white; border-color: #ef4444;',
    'self-care': 'background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border-color: #8b5cf6;',
    'educational': 'background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; border-color: #06b6d4;',
    'cognitive': 'background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border-color: #6366f1;',
    'emotional regulation': 'background: linear-gradient(135deg, #ec4899, #db2777); color: white; border-color: #ec4899;',
    'sleep': 'background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; border-color: #3b82f6;',
    'well-being': 'background: linear-gradient(135deg, #14b8a6, #0d9488); color: white; border-color: #14b8a6;'
  };
  return tagColors[tag] || '';
};

export const getCategoryColors = (category: string) => {
  const categoryColors: { [key: string]: string } = {
    'mental health': 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-color: #3b82f6;',
    'mindfulness': 'background: linear-gradient(135deg, #10b981, #059669); color: white; border-color: #10b981;',
    'stress management': 'background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; border-color: #f59e0b;',
    'anxiety': 'background: linear-gradient(135deg, #ef4444, #ec4899); color: white; border-color: #ef4444;',
    'self-care': 'background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border-color: #8b5cf6;',
    'educational': 'background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; border-color: #06b6d4;',
    'cognitive': 'background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border-color: #6366f1;',
    'emotional regulation': 'background: linear-gradient(135deg, #ec4899, #db2777); color: white; border-color: #ec4899;',
    'sleep': 'background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; border-color: #3b82f6;',
    'well-being': 'background: linear-gradient(135deg, #14b8a6, #0d9488); color: white; border-color: #14b8a6;'
  };
  return categoryColors[category] || '';
};

