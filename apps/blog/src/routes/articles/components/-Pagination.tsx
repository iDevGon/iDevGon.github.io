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
      <Flex
        justify="center"
        className={css({
          gap: { base: '0.6rem', tablet: '0.8rem' },
          marginTop: '4rem',
        })}
      >
        {currentPage > 1 && (
          <Link
            to="/articles"
            search={(prev) => ({ ...prev, page: currentPage - 1 })}
            aria-label="이전 페이지"
            className={css({
              padding: '0.8rem 1.2rem',
              minWidth: '3.6rem',
              textAlign: 'center',
              borderRadius: '0.6rem',
              border: '1px solid',
              borderColor: 'border',
              fontSize: '1.4rem',
              fontFamily: '{fonts.mono}',
              touchAction: 'manipulation',
              transition: 'all 0.15s ease',
              _hover: { background: 'surfaceHover' },
            })}
          >
            &larr;
          </Link>
        )}

        {pages.map((pageNum) => (
          <Link
            key={pageNum}
            to="/articles"
            search={(prev) => ({ ...prev, page: pageNum })}
            aria-label={`${pageNum} 페이지`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
            className={css({
              padding: '0.8rem 1.2rem',
              minWidth: '3.6rem',
              textAlign: 'center',
              borderRadius: '0.6rem',
              border: '1px solid',
              borderColor: pageNum === currentPage ? 'primary' : 'border',
              background: pageNum === currentPage ? 'primary' : 'transparent',
              color: pageNum === currentPage ? 'white' : 'inherit',
              fontSize: '1.4rem',
              fontFamily: '{fonts.mono}',
              fontVariantNumeric: 'tabular-nums',
              touchAction: 'manipulation',
              transition: 'all 0.15s ease',
              _hover: {
                background:
                  pageNum === currentPage ? 'primary.dark' : 'surfaceHover',
              },
            })}
          >
            {pageNum}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            to="/articles"
            search={(prev) => ({ ...prev, page: currentPage + 1 })}
            aria-label="다음 페이지"
            className={css({
              padding: '0.8rem 1.2rem',
              minWidth: '3.6rem',
              textAlign: 'center',
              borderRadius: '0.6rem',
              border: '1px solid',
              borderColor: 'border',
              fontSize: '1.4rem',
              fontFamily: '{fonts.mono}',
              touchAction: 'manipulation',
              transition: 'all 0.15s ease',
              _hover: { background: 'surfaceHover' },
            })}
          >
            &rarr;
          </Link>
        )}
      </Flex>
    </nav>
  );
}
