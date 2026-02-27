import { Typo } from '@idevgon/design-system';
import dayjs from 'dayjs';
import { css } from 'styled-system/css';

const footerStyle = css({
  borderTop: '1px solid',
  borderColor: 'border',
  padding: { base: '2rem 1.6rem', tablet: '2.4rem' },
  transition: 'border-color 0.3s ease',
});

const footerInnerStyle = css({
  display: 'flex',
  flexDirection: { base: 'column', tablet: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.8rem',
  maxWidth: '1200px',
  marginInline: 'auto',
});

const footerTextStyle = css({
  fontSize: '1.2rem',
  color: 'textMuted',
});

const footerMonoStyle = css({
  fontSize: '1.1rem',
  color: 'textMuted',
  fontFamily: '{fonts.mono}',
  letterSpacing: '0.02em',
});

export const Footer = () => {
  const year = dayjs().year();

  return (
    <footer className={`${footerStyle} no-print`}>
      <div className={footerInnerStyle}>
        <Typo asChild variant="caption">
          <p className={footerTextStyle}>
            &copy; {year} DevGon. All rights reserved.
          </p>
        </Typo>
        <span className={footerMonoStyle}>{/* built with care */}</span>
      </div>
    </footer>
  );
};
