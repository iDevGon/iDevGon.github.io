import { Container, Flex, Typo } from '@idevgon/design-system';
import { createFileRoute, Link } from '@tanstack/react-router';
import { lazy, Suspense, useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import { TagList } from '@/components/TagList';
import { useBlogPostingJsonLd } from '@/hooks/useJsonLd';
import { useSeo } from '@/hooks/useSeo';
import { useColorMode } from '@/store';
import { getArticle } from '@/utils/articleLoader';
import { markdownStyles } from '../-styles';
import { ArticleSkeleton } from './-skeleton';
import {
  articleHeaderStyle,
  articleLayoutStyle,
  articleTitleStyle,
  backLinkStyle,
  containerPaddingStyle,
  giscusWrapperStyle,
  metaStyle,
  notFoundBodyStyle,
  notFoundLinkStyle,
  notFoundTitleStyle,
} from './-styles';

const Markdown = lazy(() => import('react-markdown'));
const Giscus = lazy(() =>
  import('@giscus/react').then((m) => ({ default: m.default })),
);
const REMARK_PLUGINS = [remarkGfm];

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
  });

  useBlogPostingJsonLd({
    title: article?.title ?? '',
    description: article?.description ?? article?.excerpt ?? '',
    datePublished: article?.date ?? '',
    author: article?.author ?? 'DevGon',
    tags: article?.tags ?? [],
    url: `/articles/detail/${articleId}`,
  });

  if (!article) {
    return (
      <Container className={containerPaddingStyle}>
        <Typo asChild variant="h1">
          <h1 className={notFoundTitleStyle}>Article Not Found</h1>
        </Typo>
        <Typo asChild variant="body1">
          <p className={notFoundBodyStyle}>
            요청하신 아티클을 찾을 수 없습니다.
          </p>
        </Typo>
        <Link to="/articles" className={notFoundLinkStyle}>
          &larr; 목록으로 돌아가기
        </Link>
      </Container>
    );
  }

  return (
    <Container className={containerPaddingStyle}>
      <div className={articleLayoutStyle}>
        <Link to="/articles" className={backLinkStyle}>
          &larr; cd ..
        </Link>

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
          <Markdown remarkPlugins={REMARK_PLUGINS}>{article.content}</Markdown>
        </Suspense>
      </article>

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
