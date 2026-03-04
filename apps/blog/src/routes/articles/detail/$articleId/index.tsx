import { Container, Flex, Typo } from '@idevgon/design-system';
import { createFileRoute, Link } from '@tanstack/react-router';
import { lazy, Suspense, useEffect } from 'react';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { TagList } from '@/components/TagList';
import { useArticleSeo } from '@/hooks/useArticleSeo';
import { useHashScroll } from '@/hooks/useHashScroll';
import { useColorMode } from '@/store';
import { getAdjacentArticles, getArticle } from '@/utils/articleLoader';
import { markdownStyles } from '../-styles';
import { MARKDOWN_COMPONENTS } from './-markdown-components';
import { ArticleNotFound } from './-not-found';
import { ArticleSkeleton } from './-skeleton';
import {
  articleHeaderStyle,
  articleLayoutStyle,
  articlePageStyle,
  articleTitleStyle,
  backLinkStyle,
  containerPaddingStyle,
  contentAreaStyle,
  coverImageStyle,
  coverImageWrapperStyle,
  giscusWrapperStyle,
  metaStyle,
} from './-styles';
import { TableOfContents } from './-toc';
import { ArticleNav } from './-article-nav';
import { resolveImageUrl } from './-utils';

const markdownImport = import('react-markdown');
const Markdown = lazy(() => markdownImport);
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
  const { prev, next } = getAdjacentArticles(articleId);
  const colorMode = useColorMode((s) => s.colorMode);

  const coverImageUrl = article?.coverImage
    ? resolveImageUrl(article.coverImage)
    : undefined;

  const coverImageMetaUrl = article?.coverImage
    ? resolveImageUrl(article.coverImage, true)
    : undefined;

  useArticleSeo(article, articleId, coverImageMetaUrl);

  useEffect(() => {
    document.getElementById('prerendered-article')?.remove();
  }, []);

  useHashScroll();

  if (!article) return <ArticleNotFound />;

  return (
    <div className={articlePageStyle}>
      <div className={contentAreaStyle}>
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
                  fetchPriority="high"
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

          <ArticleNav prev={prev} next={next} />

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
      </div>

      <TableOfContents content={article.content} />
    </div>
  );
}
