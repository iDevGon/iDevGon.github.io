import { Link } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Flex } from '@idevgon/design-system';

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="페이지 네비게이션">
    <Flex justify="center" className={css({ gap: '2', marginTop: '8' })}>
      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <Link
          to="/articles"
          search={{ page: currentPage - 1 }}
          aria-label="이전 페이지"
          className={css({
            padding: '2 3',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'border',
            touchAction: 'manipulation',
            _hover: { background: 'surfaceHover' },
          })}
        >
          ←
        </Link>
      )}

      {/* 페이지 번호 */}
      {pages.map((pageNum) => (
        <Link
          key={pageNum}
          to="/articles"
          search={{ page: pageNum }}
          aria-label={`${pageNum} 페이지`}
          aria-current={pageNum === currentPage ? 'page' : undefined}
          className={css({
            padding: '2 3',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: pageNum === currentPage ? 'primary' : 'border',
            background: pageNum === currentPage ? 'primary' : 'transparent',
            color: pageNum === currentPage ? 'white' : 'inherit',
            fontVariantNumeric: 'tabular-nums',
            touchAction: 'manipulation',
            _hover: {
              background: pageNum === currentPage ? 'primary.dark' : 'surfaceHover',
            },
          })}
        >
          {pageNum}
        </Link>
      ))}

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <Link
          to="/articles"
          search={{ page: currentPage + 1 }}
          aria-label="다음 페이지"
          className={css({
            padding: '2 3',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'border',
            touchAction: 'manipulation',
            _hover: { background: 'surfaceHover' },
          })}
        >
          →
        </Link>
      )}
    </Flex>
    </nav>
  );
}
