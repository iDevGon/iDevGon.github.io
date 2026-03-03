import { Link } from '@tanstack/react-router';
import {
  Pagination as PaginationBase,
  paginationItemStyle,
  type PaginationProps,
} from '@idevgon/design-system';

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
        className={paginationItemStyle({ active })}
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
