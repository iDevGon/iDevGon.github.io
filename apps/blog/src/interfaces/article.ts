export interface ArticleFrontmatter {
  title: string;
  author: string;
  date: string;
  tags: string[];
  description?: string;
}

export interface ArticleMeta extends ArticleFrontmatter {
  id: string;
  excerpt: string;
  plainText: string;
}

export interface Article extends ArticleMeta {
  content: string;
}
