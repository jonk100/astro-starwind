export interface BlogPost {
  data: any;
  id: any;
  title: string;
  description: string;
  date: Date | string;
  slug: string;
  author?: string;
  authors?: string;
  image?: string;
  tags?: string[];
  keywords?: string[];
  categories?: string[];
  draft?: boolean;
  minutesRead?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content?: string;
}

export interface RelatedPostsOptions {
  byTags?: boolean;
  byCategories?: boolean;
  byAuthor?: boolean;
  limit?: number;
  excludeCurrent?: boolean;
}

export interface BlogNavigationPost {
  title: string;
  slug: string;
  date?: Date | string;
}

export interface BlogNavigation {
  previous?: BlogNavigationPost;
  next?: BlogNavigationPost;
}

export interface BlogBreadcrumb {
  label: string;
  href: string;
  current?: boolean;
}

export type BlogCardVariant = "default" | "featured" | "minimal" | "compact" | "colorful";
export type BlogCardSize = "sm" | "md" | "lg";
export type HeroCardStyle = "classic" | "modern" | "minimal" | "overlay";
export type GridLayout = "three-column" | "stacking" | "masonry";
