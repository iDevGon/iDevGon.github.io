import { useMemo } from 'react';
import type { Article } from '@/interfaces/article';
import { useBlogPostingJsonLd } from './useJsonLd';
import { useSeo } from './useSeo';

export function useArticleSeo(
  article: Article | null | undefined,
  articleId: string,
  coverImageMetaUrl?: string,
) {
  const articleMeta = useMemo(
    () =>
      article
        ? {
            publishedTime: article.date,
            author: article.author,
            tags: article.tags,
          }
        : undefined,
    [article],
  );

  useSeo({
    title: article?.title ?? 'Article Not Found',
    description: article?.description ?? article?.excerpt ?? '',
    path: `/articles/detail/${articleId}`,
    type: article ? 'article' : 'website',
    article: articleMeta,
    ...(coverImageMetaUrl && { image: coverImageMetaUrl }),
  });

  useBlogPostingJsonLd({
    title: article?.title ?? '',
    description: article?.description ?? article?.excerpt ?? '',
    datePublished: article?.date ?? '',
    author: article?.author ?? 'DevGon',
    tags: article?.tags ?? [],
    url: `/articles/detail/${articleId}`,
    ...(coverImageMetaUrl && { image: coverImageMetaUrl }),
  });
}
