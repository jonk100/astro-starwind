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

export function getBlogPages() {
  return [
    { label: 'All Posts', href: '/blog/' },
    { label: 'Categories', href: '/blog/categories/' },
    { label: 'Tags', href: '/blog/tags/' },
  ];
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