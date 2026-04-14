import { Container, Flex, Typo } from '@idevgon/design-system';
import { SearchIcon } from '@idevgon/icons';
import { createFileRoute } from '@tanstack/react-router';
import { useArticleFilters } from '@/hooks/useArticleFilters';
import { useSeo } from '@/hooks/useSeo';
import {
  articleListStyle,
  containerPaddingStyle,
  emptyStateStyle,
  emptySubtextStyle,
  headerStyle,
  noResultStyle,
  pageStyle,
  searchResultCountStyle,
  searchToggleStyle,
  titleStyle,
} from './-styles';
import { ArticleCard } from './components/-ArticleCard';
import { ArticleFilters } from './components/-ArticleFilters';
import { ArticleSearch } from './components/-ArticleSearch';
import { Pagination } from './components/-Pagination';

type ArticlesSearch = {
  page?: number;
  tag?: string;
};

export const Route = createFileRoute('/articles/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): ArticlesSearch => ({
    page: Number(search.page) || 1,
    tag: typeof search.tag === 'string' ? search.tag : undefined,
  }),
});

function RouteComponent() {
  useSeo({
    title: '생각들',
    description:
      'DevGon의 프론트엔드 개발 아티클 모음. React, TypeScript 등 웹 개발 경험을 공유합니다.',
    path: '/articles',
  });

  const { page, tag } = Route.useSearch();
  const {
    inputRef,
    searchOpen,
    allArticles,
    allTags,
    tagCounts,
    filteredArticles,
    articles,
    isSearching,
    currentPage,
    totalPages,
    selectedTags,
    toggleSearch,
    submitSearch,
    handleSearchKeyDown,
    handleTagClick,
  } = useArticleFilters({ page, tag });

  return (
    <Container className={`${pageStyle} ${containerPaddingStyle}`}>
      <div className={headerStyle}>
        <Typo asChild variant="h1">
          <h1 className={titleStyle}>생각들</h1>
        </Typo>
        {allArticles.length > 0 && (
          <button
            type="button"
            className={searchToggleStyle}
            data-active={searchOpen}
            onClick={toggleSearch}
            aria-expanded={searchOpen}
            aria-label="검색 열기"
            title="검색 ( / )"
          >
            <SearchIcon width="18" height="18" aria-hidden="true" />
          </button>
        )}
      </div>

      <ArticleSearch
        searchOpen={searchOpen}
        inputRef={inputRef}
        onSearchKeyDown={handleSearchKeyDown}
        onSubmit={submitSearch}
      >
        <ArticleFilters
          allTags={allTags}
          tagCounts={tagCounts}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
      </ArticleSearch>

      {isSearching && (
        <p className={searchResultCountStyle}>
          {filteredArticles.length} / {allArticles.length} posts
        </p>
      )}

      {allArticles.length === 0 ? (
        <Flex direction="column" align="center" className={emptyStateStyle}>
          <Typo variant="h3">아직 여러분과 나눌 이야기가 부족해요. 😅</Typo>
          <Typo variant="body1" className={emptySubtextStyle}>
            조금 더 경험을 쌓고, 생각을 정리해서 곧 돌아올게요.
          </Typo>
        </Flex>
      ) : filteredArticles.length === 0 ? (
        <div className={noResultStyle}>
          <Typo variant="body1">검색 결과가 없습니다.</Typo>
        </div>
      ) : (
        <>
          <Flex direction="column" className={articleListStyle}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Flex>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </>
      )}
    </Container>
  );
}
