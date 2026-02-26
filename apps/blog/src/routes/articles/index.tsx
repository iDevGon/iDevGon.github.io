import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Container, Flex } from '@idevgon/design-system';
import { getArticles } from '@/utils/articleLoader';
import { ArticleCard } from './components/-ArticleCard';
import { Pagination } from './components/-Pagination';

const ITEMS_PER_PAGE = 10;

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
            textWrap: 'balance',
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
