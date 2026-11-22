import { Typo } from '@idevgon/design-system';
import { css } from 'styled-system/css';

const footerStyle = css({
  borderTop: '1px solid var(--colors-border)',
  paddingBlock: '2.4rem',
  transition: 'border-color 0.3s ease',
});

const footerInnerStyle = css({
  display: 'flex',
  maxWidth: '1200px',
  marginInline: 'auto',
  paddingInline: { base: '1.6rem', tablet: '2.4rem', desktop: '3.2rem' },
});

const footerTextStyle = css({
  fontSize: '1.2rem',
  color: 'textMuted',
});

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={`${footerStyle} no-print`}>
      <div className={footerInnerStyle}>
        <Typo asChild variant="caption">
          <p className={footerTextStyle}>
            &copy; {year} DevGon. All rights reserved.
          </p>
        </Typo>
      </div>
    </footer>
  );
};
