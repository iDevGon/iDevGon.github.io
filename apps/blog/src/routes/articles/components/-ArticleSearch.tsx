import { SearchIcon } from '@idevgon/icons';
import type { RefObject } from 'react';
import {
  searchIconStyle,
  searchInputStyle,
  searchInputWrapperStyle,
  searchPanelInnerStyle,
  searchPanelStyle,
  searchSubmitStyle,
} from '../-styles';

interface ArticleSearchProps {
  searchOpen: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  children?: React.ReactNode;
}

export function ArticleSearch({
  searchOpen,
  inputRef,
  onSearchKeyDown,
  onSubmit,
  children,
}: ArticleSearchProps) {
  return (
    <div className={searchPanelStyle} data-open={searchOpen}>
      <div>
        <div className={searchPanelInnerStyle}>
          <div className={searchInputWrapperStyle}>
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
              onKeyDown={onSearchKeyDown}
              aria-label="글 검색"
            />
            <button
              type="button"
              className={searchSubmitStyle}
              onClick={onSubmit}
              aria-label="검색"
            >
              <SearchIcon width="16" height="16" aria-hidden="true" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
