import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { css } from 'styled-system/css';
import { Container, Flex } from '@idevgon/design-system';
import type { Article } from '@/interfaces/article';
import { parseFrontmatter } from '@/utils/parseFrontmatter';

// Vite의 import.meta.glob으로 md 파일들을 가져옴
const articleFiles = import.meta.glob<string>('/src/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// 특정 아티클 가져오기
function getArticle(id: string): Article | null {
  const path = `/src/articles/${id}.md`;
  const rawContent = articleFiles[path];

  if (!rawContent) return null;

  const { data, content } = parseFrontmatter(rawContent);

  const EXCERPT_LENGTH = 150;
  const excerpt = content
    .replace(/[#*`>\-[\]]/g, '')
    .trim()
    .slice(0, EXCERPT_LENGTH);

  return {
    id,
    title: data.title,
    author: data.author,
    date: data.date,
    tags: data.tags,
    excerpt,
    content,
  };
}

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
          <h1 className={css({ fontSize: '2.4rem', fontWeight: 'bold' })}>
            Article Not Found
          </h1>
          <p className={css({ marginTop: '4', color: 'textSecondary' })}>
            요청하신 아티클을 찾을 수 없습니다.
          </p>
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
          <h1
            className={css({
              fontSize: '3.2rem',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '4',
            })}
          >
            {article.title}
          </h1>

          <Flex
            className={css({ gap: '4', color: 'textSecondary', fontSize: '1.4rem' })}
          >
            <span>{article.author}</span>
            <span>{article.date}</span>
          </Flex>

          {article.tags.length > 0 && (
            <Flex className={css({ gap: '2', marginTop: '3' })} wrap="wrap">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={css({
                    padding: '1 2',
                    borderRadius: 'md',
                    background: 'tagBg',
                    fontSize: '1.2rem',
                    color: 'tagText',
                  })}
                >
                  #{tag}
                </span>
              ))}
            </Flex>
          )}
        </header>

        {/* 마크다운 본문 */}
        <article className={markdownStyles}>
          <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
        </article>
      </Container>
    </SsgoiTransition>
  );
}

// 마크다운 스타일
const markdownStyles = css({
  lineHeight: '1.8',
  fontSize: '1.6rem',

  '& h1': {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginTop: '8',
    marginBottom: '4',
    lineHeight: '1.3',
  },
  '& h2': {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginTop: '6',
    marginBottom: '3',
    lineHeight: '1.3',
    borderBottom: '1px solid',
    borderColor: 'border',
    paddingBottom: '2',
  },
  '& h3': {
    fontSize: '1.8rem',
    fontWeight: 'semibold',
    marginTop: '5',
    marginBottom: '2',
    lineHeight: '1.4',
  },
  '& p': {
    marginBottom: '4',
  },
  '& a': {
    color: 'primary',
    textDecoration: 'underline',
    _hover: { color: 'primary.dark' },
  },
  '& ul, & ol': {
    marginBottom: '4',
    paddingLeft: '6',
  },
  '& li': {
    marginBottom: '2',
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'primary',
    paddingLeft: '4',
    paddingBlock: '2',
    marginBottom: '4',
    color: 'textSecondary',
    backgroundColor: 'surfaceHover',
    fontStyle: 'italic',
  },
  '& code': {
    background: 'codeBg',
    padding: '0.5 1',
    borderRadius: 'sm',
    fontSize: '0.9em',
    fontFamily: 'monospace',
  },
  '& pre': {
    background: 'codeBlockBg',
    color: 'white',
    padding: '4',
    borderRadius: 'md',
    overflow: 'auto',
    marginBottom: '4',

    '& code': {
      background: 'transparent',
      padding: '0',
    },
  },
  '& hr': {
    border: 'none',
    borderTop: '1px solid',
    borderColor: 'border',
    marginTop: '6',
    marginBottom: '6',
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '4',
  },
  '& th, & td': {
    border: '1px solid',
    borderColor: 'border',
    padding: '2 3',
    textAlign: 'left',
  },
  '& th': {
    background: 'surfaceHover',
    fontWeight: 'semibold',
  },
  '& img': {
    maxWidth: '100%',
    borderRadius: 'md',
    marginBottom: '4',
  },
});
