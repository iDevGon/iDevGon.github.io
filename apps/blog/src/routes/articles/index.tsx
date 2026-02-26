import { Container, Flex, Typo } from '@idevgon/design-system';
import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { css } from 'styled-system/css';
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
        <Typo asChild variant="h1">
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
        </Typo>

        {/* 아티클 목록 */}
        {allArticles.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            className={css({
              padding: '16',
              textAlign: 'center',
              color: 'textSecondary',
            })}
          >
            <Typo variant="h3">아직 작성된 글이 없습니다.</Typo>
            <Typo
              variant="body1"
              className={css({ marginTop: '0.75rem', color: 'textSecondary' })}
            >
              곧 새로운 글로 찾아뵙겠습니다.
            </Typo>
          </Flex>
        ) : (
          <>
            <Flex direction="column" className={css({ gap: '4' })}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </Flex>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
          </>
        )}
      </Container>
    </SsgoiTransition>
  );
}
