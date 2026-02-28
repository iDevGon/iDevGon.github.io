import { Container, Flex, Typo } from '@idevgon/design-system';
import { SearchIcon } from '@idevgon/icons';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { getAllTags, getArticles } from '@/utils/articleLoader';
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

const ITEMS_PER_PAGE = 10;

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
  const navigate = useNavigate();
  const currentPage = page ?? 1;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(!!tag);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    () => new Set(tag ? [tag.toLowerCase()] : []),
  );

  useEffect(() => {
    if (tag) {
      setSelectedTags(new Set([tag.toLowerCase()]));
      setSearchOpen(true);
    }
  }, [tag]);

  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedTags(new Set());
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const submitSearch = useCallback(() => {
    const value = inputRef.current?.value.trim() ?? '';
    setSearchQuery(value);
    navigate({ to: '/articles', search: { page: 1 } });
  }, [navigate]);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => {
      if (!prev) {
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        resetSearch();
      }
      return !prev;
    });
  }, [resetSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !searchOpen &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        resetSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, resetSearch]);

  const allArticles = getArticles();
  const allTags = getAllTags();

  const filteredArticles = useMemo(() => {
    let results = allArticles;

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(lower) ||
          a.plainText.toLowerCase().includes(lower),
      );
    }

    if (selectedTags.size > 0) {
      results = results.filter((a) =>
        a.tags.some((t) =>
          selectedTags.has(t.toLowerCase()),
        ),
      );
    }

    return results;
  }, [allArticles, searchQuery, selectedTags]);

  const isSearching = !!searchQuery || selectedTags.size > 0;
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const articles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitSearch();
    }
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      const key = tagName.toLowerCase();
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    navigate({ to: '/articles', search: { page: 1 } });
  };

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
        <Flex
          direction="column"
          align="center"
          className={emptyStateStyle}
        >
          <Typo variant="h3">아직 여러분과 나눌 이야기가 부족해요. 😅</Typo>
          <Typo
            variant="body1"
            className={emptySubtextStyle}
          >
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
