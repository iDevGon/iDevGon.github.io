import type { Article, ArticleMeta } from '@/interfaces/article';
import { parseFrontmatter } from '@/utils/parseFrontmatter';

const EXCERPT_LENGTH = 150;

// Vite의 import.meta.glob으로 md 파일들을 가져옴
const articleFiles = import.meta.glob<string>('/src/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const RE_HEADINGS = /^#{1,6}\s+/gm;
const RE_LINKS = /\[([^\]]+)\]\([^)]+\)/g;
const RE_IMAGES = /!\[([^\]]*)\]\([^)]+\)/g;
const RE_BOLD = /(\*\*|__)(.*?)\1/g;
const RE_ITALIC = /(\*|_)(.*?)\1/g;
const RE_CODE_BLOCKS = /```[\s\S]*?```/g;
const RE_INLINE_CODE = /`([^`]+)`/g;
const RE_HR = /^-{3,}$/gm;
const RE_NEWLINES = /\n+/g;
const RE_WHITESPACE = /\s+/g;

// 마크다운에서 순수 텍스트만 추출
export function extractPlainText(markdown: string): string {
  return (
    markdown
      .replace(RE_HEADINGS, '')
      .replace(RE_LINKS, '$1')
      .replace(RE_IMAGES, '')
      .replace(RE_BOLD, '$2')
      .replace(RE_ITALIC, '$2')
      .replace(RE_CODE_BLOCKS, '')
      .replace(RE_INLINE_CODE, '$1')
      .replace(RE_HR, '')
      .replace(RE_NEWLINES, ' ')
      .replace(RE_WHITESPACE, ' ')
      .trim()
  );
}

let cachedArticles: ArticleMeta[] | null = null;
const articleCache = new Map<string, Article | null>();

export function getArticles(): ArticleMeta[] {
  if (cachedArticles) return cachedArticles;

  cachedArticles = Object.entries(articleFiles)
    .map(([path, rawContent]) => {
      const id = path.replace('/src/articles/', '').replace('.md', '');
      const { data, content } = parseFrontmatter(rawContent);

      const plainText = extractPlainText(content);
      const excerpt =
        plainText.length > EXCERPT_LENGTH
          ? `${plainText.slice(0, EXCERPT_LENGTH)}...`
          : plainText;

      return {
        id,
        title: data.title,
        author: data.author,
        date: data.date,
        tags: data.tags,
        description: data.description,
        coverImage: data.coverImage,
        excerpt,
        plainText,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return cachedArticles;
}

export function getAllTags(): string[] {
  const articles = getArticles();
  const tagCount = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    }
  }
  return [...tagCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

export function getArticle(id: string): Article | null {
  if (articleCache.has(id)) return articleCache.get(id)!;

  const path = `/src/articles/${id}.md`;
  const rawContent = articleFiles[path];

  if (!rawContent) {
    articleCache.set(id, null);
    return null;
  }

  const { data, content } = parseFrontmatter(rawContent);

  const plainText = extractPlainText(content);
  const excerpt =
    plainText.length > EXCERPT_LENGTH
      ? `${plainText.slice(0, EXCERPT_LENGTH)}...`
      : plainText;

  const article: Article = {
    id,
    title: data.title,
    author: data.author,
    date: data.date,
    tags: data.tags,
    description: data.description,
    coverImage: data.coverImage,
    excerpt,
    plainText,
    content,
  };

  articleCache.set(id, article);
  return article;
}
