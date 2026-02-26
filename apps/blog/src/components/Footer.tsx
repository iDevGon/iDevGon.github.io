import { Typo } from '@idevgon/design-system';
import dayjs from 'dayjs';
import { css } from 'styled-system/css';

const footerStyle = css({
  borderTop: '1px solid',
  borderColor: 'border',
  padding: '2.4rem',
  transition: 'border-color 0.3s ease',
});

const footerTextStyle = css({
  fontSize: '1.2rem',
  color: 'textMuted',
  textAlign: 'center',
});

export const Footer = () => {
  const year = dayjs().year();

  return (
    <footer className={`${footerStyle} no-print`}>
      <Typo asChild variant="body2">
        <p className={footerTextStyle}>
          &copy; {year} DevGon. All rights reserved.
        </p>
      </Typo>
    </footer>
  );
};
