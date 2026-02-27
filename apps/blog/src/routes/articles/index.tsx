import { Container, Flex, Typo } from '@idevgon/design-system';
import { SearchIcon } from '@idevgon/icons';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { getAllTags, getArticles } from '@/utils/articleLoader';
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

const pageStyle = css({
  animation: 'fadeIn 0.8s ease',
});

const titleStyle = css({
  fontSize: { base: '2.4rem', tablet: '2.8rem' },
  fontWeight: 700,
  color: 'textPrimary',
  letterSpacing: '-0.02em',
  textWrap: 'balance',
});

const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3.2rem',
});

const searchToggleStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '50%',
  border: 'none',
  background: 'transparent',
  color: 'textMuted',
  cursor: 'pointer',
  transition: 'color 0.15s, background 0.15s',
  _hover: {
    color: 'textPrimary',
    background: 'backgroundAlt',
  },
  '&[data-active="true"]': {
    background: 'backgroundAlt',
    color: 'primary',
  },
});

const searchPanelStyle = css({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: 'grid-template-rows 0.2s ease',
  '& > div': {
    overflow: 'hidden',
  },
  '&[data-open="true"]': {
    gridTemplateRows: '1fr',
  },
});

const searchPanelInnerStyle = css({
  paddingBottom: '2rem',
});

const searchInputStyle = css({
  width: '100%',
  padding: {
    base: '1rem 1.2rem 1rem 3.6rem',
    tablet: '1.2rem 1.6rem 1.2rem 4rem',
  },
  fontSize: { base: '1.4rem', tablet: '1.6rem' },
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0.8rem',
  background: 'surface',
  color: 'textPrimary',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  _focus: {
    borderColor: 'primary',
    boxShadow:
      '0 0 0 3px color-mix(in srgb, token(colors.primary) 12%, transparent)',
  },
  _placeholder: {
    color: 'textMuted',
  },
});

const searchIconStyle = css({
  position: 'absolute',
  left: { base: '1.2rem', tablet: '1.4rem' },
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'textMuted',
  pointerEvents: 'none',
});

const tagFilterStyle = css({
  marginTop: '1.2rem',
  gap: '0.6rem',
  flexWrap: 'wrap',
});

const tagButtonStyle = css({
  padding: '0.4rem 1rem',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'border',
  background: 'surface',
  color: 'textSecondary',
  fontSize: '1.3rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
  _hover: {
    borderColor: 'primary',
    color: 'primary',
  },
  '&[data-selected="true"]': {
    borderColor: 'primary',
    background: 'primary',
    color: 'white',
  },
});

const noResultStyle = css({
  padding: { base: '4rem 0', tablet: '6rem 0' },
  textAlign: 'center',
  color: 'textMuted',
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const currentPage = page ?? 1;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => {
      if (!prev) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      return !prev;
    });
  }, []);

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
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

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

    if (selectedTag) {
      results = results.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()),
      );
    }

    return results;
  }, [allArticles, searchQuery, selectedTag]);

  const isSearching = !!searchQuery || !!selectedTag;
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const articles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  let debounceTimer: ReturnType<typeof setTimeout>;
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTag((prev) => (prev === tagName ? '' : tagName));
  };

  return (
    <Container className={`${pageStyle} ${css({ padding: '4' })}`}>
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

      <div className={searchPanelStyle} data-open={searchOpen}>
        <div>
          <div className={searchPanelInnerStyle}>
            <div className={css({ position: 'relative' })}>
              <SearchIcon
                className={searchIconStyle}
                width="18"
                height="18"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                className={searchInputStyle}
                placeholder="제목이나 내용으로 검색..."
                onChange={handleSearchInput}
                aria-label="글 검색"
              />
            </div>

            {allTags.length > 0 && (
              <Flex className={tagFilterStyle}>
                {allTags.map((tagName) => (
                  <button
                    type="button"
                    key={tagName}
                    className={tagButtonStyle}
                    data-selected={selectedTag === tagName}
                    onClick={() => handleTagClick(tagName)}
                    aria-pressed={selectedTag === tagName}
                  >
                    #{tagName}
                  </button>
                ))}
              </Flex>
            )}
          </div>
        </div>
      </div>

      {isSearching && (
        <p
          className={css({
            fontSize: '1.3rem',
            color: 'textMuted',
            fontFamily: '{fonts.mono}',
            marginBottom: '1.6rem',
          })}
        >
          {filteredArticles.length} / {allArticles.length} posts
        </p>
      )}

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
          <Typo variant="h3">아직 여러분과 나눌 이야기가 부족해요. 😅</Typo>
          <Typo
            variant="body1"
            className={css({
              marginTop: '0.75rem',
              color: 'textSecondary',
            })}
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
          <Flex direction="column" className={css({ gap: '4' })}>
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
