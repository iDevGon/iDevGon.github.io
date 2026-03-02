import { Container, Flex, Typo } from '@idevgon/design-system';
import { createFileRoute, Link } from '@tanstack/react-router';
import { lazy, Suspense, useEffect, useMemo } from 'react';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { TagList } from '@/components/TagList';
import { useBlogPostingJsonLd } from '@/hooks/useJsonLd';
import { useSeo } from '@/hooks/useSeo';
import { useColorMode } from '@/store';
import { getArticle } from '@/utils/articleLoader';
import { markdownStyles } from '../-styles';
import { MARKDOWN_COMPONENTS } from './-markdown-components';
import { ArticleNotFound } from './-not-found';
import { ArticleSkeleton } from './-skeleton';
import {
  articleHeaderStyle,
  articleLayoutStyle,
  articleTitleStyle,
  backLinkStyle,
  containerPaddingStyle,
  coverImageStyle,
  coverImageWrapperStyle,
  giscusWrapperStyle,
  metaStyle,
} from './-styles';
import { TableOfContents } from './-toc';
import { resolveImageUrl } from './-utils';

const Markdown = lazy(() => import('react-markdown'));
const Giscus = lazy(() =>
  import('@giscus/react').then((m) => ({ default: m.default })),
);
const REMARK_PLUGINS = [remarkGfm, remarkBreaks];

export const Route = createFileRoute('/articles/detail/$articleId/')({
  component: RouteComponent,
});

const GISCUS_THEME_MAP = {
  light: 'light_protanopia',
  dark: 'dark_protanopia',
  system: 'preferred_color_scheme',
} as const;

function RouteComponent() {
  const { articleId } = Route.useParams();
  const article = getArticle(articleId);
  const colorMode = useColorMode((s) => s.colorMode);

  const coverImageUrl = article?.coverImage
    ? resolveImageUrl(article.coverImage)
    : undefined;

  const coverImageMetaUrl = article?.coverImage
    ? resolveImageUrl(article.coverImage, true)
    : undefined;

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

  useEffect(() => {
    document.getElementById('prerendered-article')?.remove();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = decodeURIComponent(hash);
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const observer = new MutationObserver(() => {
      const found = document.getElementById(target);
      if (found) {
        found.scrollIntoView({ behavior: 'smooth' });
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!article) return <ArticleNotFound />;

  return (
    <Container className={containerPaddingStyle}>
      <div className={articleLayoutStyle}>
        <Link to="/articles" className={backLinkStyle}>
          &larr; cd ..
        </Link>

        {coverImageUrl && (
          <div className={coverImageWrapperStyle}>
            <img
              src={coverImageUrl}
              alt={article.title}
              className={coverImageStyle}
            />
          </div>
        )}

        <header className={articleHeaderStyle}>
          <Typo asChild variant="h1">
            <h1 className={articleTitleStyle}>{article.title}</h1>
          </Typo>

          <Flex className={metaStyle}>
            <Typo asChild variant="body2">
              <span>{article.author}</span>
            </Typo>
            <Typo asChild variant="body2">
              <span>{article.date}</span>
            </Typo>
          </Flex>

          <TagList tags={article.tags} />
        </header>
      </div>

      <article className={markdownStyles}>
        <Suspense fallback={<ArticleSkeleton />}>
          <Markdown remarkPlugins={REMARK_PLUGINS} components={MARKDOWN_COMPONENTS}>
            {article.content}
          </Markdown>
        </Suspense>
      </article>

      <TableOfContents content={article.content} />

      <div className={giscusWrapperStyle}>
        <Suspense fallback={null}>
          <Giscus
            repo="iDevGon/iDevGon.github.io"
            repoId="R_kgDOP8gvzw"
            category="Comment"
            categoryId="DIC_kwDOP8gvz84Cwh-G"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={GISCUS_THEME_MAP[colorMode]}
            lang="ko"
            loading="lazy"
          />
        </Suspense>
      </div>
    </Container>
  );
}
