import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import {
  Pagination as PaginationBase,
  type PaginationProps,
} from '@idevgon/design-system';

const linkStyle = css({
  padding: '0.8rem 1.2rem',
  minWidth: '3.6rem',
  textAlign: 'center',
  borderRadius: '0.6rem',
  border: '1px solid',
  borderColor: 'border',
  fontSize: '1.4rem',
  fontFamily: '{fonts.mono}',
  fontVariantNumeric: 'tabular-nums',
  touchAction: 'manipulation',
  transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
  textDecoration: 'none',
  color: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  _hover: { background: 'surfaceHover' },
});

const activeLinkStyle = css({
  borderColor: 'primary',
  background: 'primary',
  color: 'white',
  _hover: { background: 'primary.dark' },
});

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const renderItem: PaginationProps['renderItem'] = ({
    page,
    children,
    active,
    ...ariaProps
  }) => {
    const targetPage =
      page === 'prev'
        ? currentPage - 1
        : page === 'next'
          ? currentPage + 1
          : page;

    return (
      <Link
        key={page}
        to="/articles"
        search={(prev) => ({ ...prev, page: targetPage })}
        className={`${linkStyle} ${active ? activeLinkStyle : ''}`}
        {...ariaProps}
      >
        {children}
      </Link>
    );
  };

  return (
    <PaginationBase
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={() => {}}
      renderItem={renderItem}
    />
  );
}
