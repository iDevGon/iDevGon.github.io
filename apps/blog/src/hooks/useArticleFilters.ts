import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAllTags, getArticles, getTagCounts } from '@/utils/articleLoader';

const ITEMS_PER_PAGE = 10;

interface UseArticleFiltersOptions {
  page?: number;
  tag?: string;
}

export function useArticleFilters({ page, tag }: UseArticleFiltersOptions) {
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
  const tagCounts = getTagCounts();

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
        a.tags.some((t) => selectedTags.has(t.toLowerCase())),
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

  return {
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
  };
}
