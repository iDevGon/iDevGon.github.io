import { Container, Flex, Typo } from '@idevgon/design-system';
import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import remarkGfm from 'remark-gfm';
import { css } from 'styled-system/css';
import { TagList } from '@/components/TagList';
import { getArticle } from '@/utils/articleLoader';
import { markdownStyles } from '../-styles';

const Markdown = lazy(() => import('react-markdown'));
const REMARK_PLUGINS = [remarkGfm];

export const Route = createFileRoute('/articles/detail/$articleId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { articleId } = Route.useParams();
  const article = getArticle(articleId);

  if (!article) {
    return (
      <SsgoiTransition id={`/articles/detail/${articleId}`}>
        <Container className={css({ padding: '4' })}>
          <Typo asChild variant="h1">
            <h1 className={css({ fontSize: '2.4rem', fontWeight: 'bold' })}>
              Article Not Found
            </h1>
          </Typo>
          <Typo asChild variant="body1">
            <p className={css({ marginTop: '4', color: 'textSecondary' })}>
              요청하신 아티클을 찾을 수 없습니다.
            </p>
          </Typo>
          <Link
            to="/articles"
            className={css({
              display: 'inline-block',
              marginTop: '4',
              color: 'primary',
              _hover: { textDecoration: 'underline' },
            })}
          >
            ← 목록으로 돌아가기
          </Link>
        </Container>
      </SsgoiTransition>
    );
  }

  return (
    <SsgoiTransition id={`/articles/detail/${articleId}`}>
      <Container className={css({ padding: '4' })}>
        {/* 뒤로가기 링크 */}
        <Link
          to="/articles"
          className={css({
            display: 'inline-block',
            marginBottom: '4',
            color: 'textSecondary',
            fontSize: '1.4rem',
            _hover: { color: 'primary' },
          })}
        >
          ← 목록으로
        </Link>

        {/* 아티클 헤더 */}
        <header className={css({ marginBottom: '8' })}>
          <Typo asChild variant="h1">
            <h1
              className={css({
                fontSize: '3.2rem',
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '4',
                textWrap: 'balance',
              })}
            >
              {article.title}
            </h1>
          </Typo>

          <Flex
            className={css({
              gap: '4',
              color: 'textSecondary',
              fontSize: '1.4rem',
            })}
          >
            <Typo asChild variant="body2">
              <span>{article.author}</span>
            </Typo>
            <Typo asChild variant="body2">
              <span>{article.date}</span>
            </Typo>
          </Flex>

          <TagList tags={article.tags} />
        </header>

        {/* 마크다운 본문 */}
        <article className={markdownStyles}>
          <Suspense fallback={null}>
            <Markdown remarkPlugins={REMARK_PLUGINS}>
              {article.content}
            </Markdown>
          </Suspense>
        </article>
      </Container>
    </SsgoiTransition>
  );
}
