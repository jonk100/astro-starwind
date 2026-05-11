import type { BlogPost, RelatedPostsOptions, TableOfContentsItem, SearchOptions } from './types';

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

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: TableOfContentsItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    items.push({
      id,
      title,
      level
    });
  }
  
  return items;
}

export function searchPosts(posts: BlogPost[], options: SearchOptions): BlogPost[] {
  const { query, tags, categories, author, dateRange } = options;
  
  return posts.filter(post => {
    // Text search
    if (query) {
      const searchLower = query.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(searchLower);
      const descMatch = post.description?.toLowerCase().includes(searchLower);
      const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      const catMatch = post.categories?.some(cat => cat.toLowerCase().includes(searchLower));
      
      if (!titleMatch && !descMatch && !tagMatch && !catMatch) {
        return false;
      }
    }
    
    // Tag filter
    if (tags && tags.length > 0) {
      const hasTag = tags.some(tag => post.tags?.includes(tag));
      if (!hasTag) return false;
    }
    
    // Category filter
    if (categories && categories.length > 0) {
      const hasCategory = categories.some(cat => post.categories?.includes(cat));
      if (!hasCategory) return false;
    }
    
    // Author filter
    if (author && post.author !== author && post.authors !== author) {
      return false;
    }
    
    // Date range filter
    if (dateRange) {
      const postDate = typeof post.date === 'string' ? new Date(post.date) : post.date;
      if (dateRange.from && postDate < dateRange.from) return false;
      if (dateRange.to && postDate > dateRange.to) return false;
    }
    
    return true;
  });
}
