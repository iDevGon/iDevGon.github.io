import { Container, Flex, Typo } from '@idevgon/design-system';
import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { lazy, Suspense, useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import { css } from 'styled-system/css';
import { TagList } from '@/components/TagList';
import { useBlogPostingJsonLd } from '@/hooks/useJsonLd';
import { useSeo } from '@/hooks/useSeo';
import { useColorMode } from '@/store';
import { getArticle } from '@/utils/articleLoader';
import { markdownStyles } from '../-styles';

const Markdown = lazy(() => import('react-markdown'));
const Giscus = lazy(() => import('@giscus/react').then((m) => ({ default: m.default })));
const REMARK_PLUGINS = [remarkGfm];

export const Route = createFileRoute('/articles/detail/$articleId/')({
  component: RouteComponent,
});

const articleLayoutStyle = css({
  maxWidth: '72rem',
  marginInline: 'auto',
});

const containerPaddingStyle = css({
  padding: '4',
});

const notFoundTitleStyle = css({
  fontSize: '2.4rem',
  fontWeight: 'bold',
});

const notFoundBodyStyle = css({
  marginTop: '4',
  color: 'textSecondary',
});

const notFoundLinkStyle = css({
  display: 'inline-block',
  marginTop: '4',
  color: 'primary',
  _hover: { textDecoration: 'underline' },
});

const giscusWrapperStyle = css({
  maxWidth: '72rem',
  marginInline: 'auto',
  marginTop: '4.8rem',
  paddingTop: '3.2rem',
  borderTop: '1px solid',
  borderColor: 'border',
});

const GISCUS_THEME_MAP = {
  light: 'light',
  dark: 'dark',
  system: 'preferred_color_scheme',
} as const;

const backLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginBottom: '2.4rem',
  color: 'textMuted',
  fontSize: '1.4rem',
  fontFamily: '{fonts.mono}',
  transition: 'color 0.2s',
  _hover: { color: 'primary' },
});

const articleTitleStyle = css({
  fontSize: { base: '2.6rem', tablet: '3.4rem' },
  fontWeight: 'bold',
  lineHeight: '1.25',
  marginBottom: '2rem',
  textWrap: 'balance',
  letterSpacing: '-0.03em',
  wordBreak: 'keep-all',
});

const metaStyle = css({
  gap: { base: '0.8rem', tablet: '1.6rem' },
  color: 'textMuted',
  fontSize: { base: '1.3rem', tablet: '1.4rem' },
  fontFamily: '{fonts.mono}',
  letterSpacing: '0.01em',
});

const headerStyle = css({
  marginBottom: { base: '3.2rem', tablet: '4.8rem' },
  paddingBottom: '2.4rem',
  borderBottom: '1px solid',
  borderColor: 'border',
});

function RouteComponent() {
  const { articleId } = Route.useParams();
  const article = getArticle(articleId);
  const { colorMode } = useColorMode();

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
      <SsgoiTransition id={`/articles/detail/${articleId}`}>
        <Container className={containerPaddingStyle}>
          <Typo asChild variant="h1">
            <h1 className={notFoundTitleStyle}>
              Article Not Found
            </h1>
          </Typo>
          <Typo asChild variant="body1">
            <p className={notFoundBodyStyle}>
              요청하신 아티클을 찾을 수 없습니다.
            </p>
          </Typo>
          <Link
            to="/articles"
            className={notFoundLinkStyle}
          >
            &larr; 목록으로 돌아가기
          </Link>
        </Container>
      </SsgoiTransition>
    );
  }

  return (
    <SsgoiTransition id={`/articles/detail/${articleId}`}>
      <Container className={containerPaddingStyle}>
        <div className={articleLayoutStyle}>
          <Link to="/articles" className={backLinkStyle}>
            &larr; cd ..
          </Link>

          <header className={headerStyle}>
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
          <Suspense fallback={null}>
            <Markdown remarkPlugins={REMARK_PLUGINS}>
              {article.content}
            </Markdown>
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
    </SsgoiTransition>
  );
}
