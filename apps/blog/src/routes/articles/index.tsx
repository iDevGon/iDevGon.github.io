import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Container, Flex } from '@idevgon/design-system';
import type { ArticleMeta } from '@/interfaces/article';
import { parseFrontmatter } from '@/utils/parseFrontmatter';

const ITEMS_PER_PAGE = 10;
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
      // 헤딩 제거 (# ## ### 등)
      .replace(/^#{1,6}\s+/gm, '')
      // 링크 텍스트만 남김 [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // 이미지 제거
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // 굵은 글씨/이탤릭 마크다운 제거
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // 코드 블록 제거
      .replace(/```[\s\S]*?```/g, '')
      // 인라인 코드 제거
      .replace(/`([^`]+)`/g, '$1')
      // 수평선 제거
      .replace(/^-{3,}$/gm, '')
      // 여러 줄바꿈을 공백으로
      .replace(/\n+/g, ' ')
      // 여러 공백을 하나로
      .replace(/\s+/g, ' ')
      .trim()
  );
}

// 파일들을 파싱해서 메타 정보 추출
function getArticles(): ArticleMeta[] {
  return Object.entries(articleFiles)
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

type ArticlesSearch = {
  page?: number;
};

export const Route = createFileRoute('/articles/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): ArticlesSearch => ({
    page: Number(search.page) || 1,
  }),
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const currentPage = page ?? 1;

  const allArticles = getArticles();
  const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const articles = allArticles.slice(startIndex, endIndex);

  return (
    <SsgoiTransition id="/articles">
      <Container className={css({ padding: '4' })}>
        <h1
          className={css({
            fontSize: '2.8rem',
            fontWeight: 700,
            marginBottom: '3.2rem',
            color: 'textPrimary',
          })}
        >
          Articles
        </h1>

        {/* 아티클 목록 */}
        <Flex direction="column" className={css({ gap: '4' })}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Flex>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </Container>
    </SsgoiTransition>
  );
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      to="/articles/detail/$articleId"
      params={{ articleId: article.id }}
      className={css({
        display: 'block',
        padding: '4',
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'border',
        transition: 'all 0.2s',
        _hover: {
          borderColor: 'borderHover',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
          '& h2': { color: 'primary' },
        },
      })}
    >
      <h2
        className={css({
          fontSize: '1.8rem',
          fontWeight: 'semibold',
          marginBottom: '2',
          transition: 'color 0.2s',
        })}
      >
        {article.title}
      </h2>

      <Flex
        className={css({ gap: '4', color: 'textSecondary', fontSize: '1.4rem' })}
      >
        <span>{article.author}</span>
        <span>{article.date}</span>
      </Flex>

      {article.excerpt && (
        <p
          className={css({
            marginTop: '3',
            fontSize: '1.4rem',
            color: 'textSecondary',
            lineHeight: '1.6',
          })}
        >
          {article.excerpt}
        </p>
      )}

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
    </Link>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex justify="center" className={css({ gap: '2', marginTop: '8' })}>
      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <Link
          to="/articles"
          search={{ page: currentPage - 1 }}
          className={css({
            padding: '2 3',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'border',
            _hover: { background: 'surfaceHover' },
          })}
        >
          ←
        </Link>
      )}

      {/* 페이지 번호 */}
      {pages.map((pageNum) => (
        <Link
          key={pageNum}
          to="/articles"
          search={{ page: pageNum }}
          className={css({
            padding: '2 3',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: pageNum === currentPage ? 'primary' : 'border',
            background: pageNum === currentPage ? 'primary' : 'transparent',
            color: pageNum === currentPage ? 'white' : 'inherit',
            _hover: {
              background: pageNum === currentPage ? 'primary.dark' : 'surfaceHover',
            },
          })}
        >
          {pageNum}
        </Link>
      ))}

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <Link
          to="/articles"
          search={{ page: currentPage + 1 }}
          className={css({
            padding: '2 3',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'border',
            _hover: { background: 'surfaceHover' },
          })}
        >
          →
        </Link>
      )}
    </Flex>
  );
}
