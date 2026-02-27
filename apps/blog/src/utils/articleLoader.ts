import type { Article, ArticleMeta } from '@/interfaces/article';
import { parseFrontmatter } from '@/utils/parseFrontmatter';

const EXCERPT_LENGTH = 150;

// Vite의 import.meta.glob으로 md 파일들을 가져옴
const articleFiles = import.meta.glob<string>('/src/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// 마크다운에서 순수 텍스트만 추출
function extractPlainText(markdown: string): string {
  return (
    markdown
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^-{3,}$/gm, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

let cachedArticles: ArticleMeta[] | null = null;

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
  const path = `/src/articles/${id}.md`;
  const rawContent = articleFiles[path];

  if (!rawContent) return null;

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
    excerpt,
    plainText,
    content,
  };
}
