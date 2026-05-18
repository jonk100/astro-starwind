import type { BlogPost, RelatedPostsOptions } from '../types';

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  options: RelatedPostsOptions = {}
): BlogPost[] {
  const {
    byTags = true,
    byCategories = false,
    byAuthor = false,
    limit = 3,
    excludeCurrent = true
  } = options;

  const related: BlogPost[] = [];
  const currentTags = currentPost.tags || [];
  const currentCategories = currentPost.categories || [];
  const currentAuthor = currentPost.author || currentPost.authors;

  // Filter out current post if requested
  const pool = excludeCurrent 
    ? allPosts.filter(post => post.slug !== currentPost.slug)
    : allPosts;

  // Find posts by tags
  if (byTags && currentTags.length > 0) {
    const tagMatches = pool.filter(post => 
      post.tags?.some(tag => currentTags.includes(tag))
    );
    related.push(...tagMatches);
  }

  // Find posts by categories
  if (byCategories && currentCategories.length > 0) {
    const categoryMatches = pool.filter(post => 
      post.categories?.some(cat => currentCategories.includes(cat))
    );
    related.push(...categoryMatches);
  }

  // Find posts by author
  if (byAuthor && currentAuthor) {
    const authorMatches = pool.filter(post => 
      post.author === currentAuthor || post.authors === currentAuthor
    );
    related.push(...authorMatches);
  }

  // Remove duplicates and sort by relevance (matching tags/categories count)
  const unique = Array.from(new Map(related.map(post => [post.slug, post])).values());
  
  const scored = unique.map(post => {
    let score = 0;
    if (post.tags) {
      score += post.tags.filter(tag => currentTags.includes(tag)).length * 2;
    }
    if (post.categories) {
      score += post.categories.filter(cat => currentCategories.includes(cat)).length;
    }
    if (post.author === currentAuthor || post.authors === currentAuthor) {
      score += 1;
    }
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

export function generateBlogBreadcrumb(slug: string): Array<{label: string, href: string, current?: boolean}> {
  const parts = slug.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Home', href: '/', current: false }];
  
  let path = '';
  parts.forEach((part, index) => {
    path += `/${part}`;
    const isCurrent = index === parts.length - 1;
    breadcrumbs.push({
      label: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      href: path,
      current: isCurrent
    });
  });
  
  return breadcrumbs;
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
