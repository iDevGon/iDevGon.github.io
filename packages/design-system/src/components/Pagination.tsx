import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from './Flex';

const paginationItemStyle = cva({
  base: {
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
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    _hover: {
      background: 'surfaceHover',
    },
  },
  variants: {
    active: {
      true: {
        borderColor: 'primary',
        background: 'primary',
        color: 'white',
        _hover: {
          background: 'primary.dark',
        },
      },
    },
  },
});

export const PaginationItem = styled('button', paginationItemStyle);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  renderItem?: (props: {
    page: number | 'prev' | 'next';
    children: ReactNode;
    active?: boolean;
    'aria-label': string;
    'aria-current'?: 'page';
  }) => ReactNode;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  renderItem,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const defaultRenderItem: NonNullable<PaginationProps['renderItem']> = ({
    page,
    children,
    active,
    ...ariaProps
  }) => (
    <PaginationItem
      type="button"
      active={active}
      onClick={() =>
        onPageChange(
          page === 'prev'
            ? currentPage - 1
            : page === 'next'
              ? currentPage + 1
              : page,
        )
      }
      {...ariaProps}
    >
      {children}
    </PaginationItem>
  );

  const render = renderItem ?? defaultRenderItem;

  return (
    <nav aria-label="페이지 네비게이션">
      <Flex
        justify="center"
        css={{
          gap: { base: '0.6rem', tablet: '0.8rem' },
          marginTop: '4rem',
        }}
      >
        {currentPage > 1 &&
          render({
            page: 'prev',
            children: '\u2190',
            'aria-label': '이전 페이지',
          })}

        {pages.map((pageNum) =>
          render({
            page: pageNum,
            children: pageNum,
            active: pageNum === currentPage,
            'aria-label': `${pageNum} 페이지`,
            ...(pageNum === currentPage
              ? { 'aria-current': 'page' as const }
              : {}),
          }),
        )}

        {currentPage < totalPages &&
          render({
            page: 'next',
            children: '\u2192',
            'aria-label': '다음 페이지',
          })}
      </Flex>
    </nav>
  );
}
