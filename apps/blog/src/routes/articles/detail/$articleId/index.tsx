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
  fontSize: { base: '2.4rem', tablet: '3.2rem' },
  fontWeight: 'bold',
  lineHeight: '1.2',
  marginBottom: '1.6rem',
  textWrap: 'balance',
  letterSpacing: '-0.025em',
});

const metaStyle = css({
  gap: { base: '0.8rem', tablet: '1.6rem' },
  color: 'textMuted',
  fontSize: { base: '1.2rem', tablet: '1.4rem' },
  fontFamily: '{fonts.mono}',
  letterSpacing: '0.01em',
});

const headerStyle = css({
  marginBottom: { base: '3.2rem', tablet: '4rem' },
  paddingBottom: '2.4rem',
  borderBottom: '1px solid',
  borderColor: 'border',
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
            &larr; 목록으로 돌아가기
          </Link>
        </Container>
      </SsgoiTransition>
    );
  }

  return (
    <SsgoiTransition id={`/articles/detail/${articleId}`}>
      <Container className={css({ padding: '4' })}>
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
