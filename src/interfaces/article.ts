export interface ArticleFrontmatter {
  title: string;
  author: string;
  date: string;
  tags: string[];
}

export interface ArticleMeta extends ArticleFrontmatter {
  id: string;
  excerpt: string;
}

export interface Article extends ArticleMeta {
  content: string;
}
