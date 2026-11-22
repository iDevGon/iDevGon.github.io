import { css } from 'styled-system/css';

const logoStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '2.1rem',
  fontWeight: 780,
  letterSpacing: '-0.05em',
  lineHeight: 1,
});

export const Logo = () => (
  <span className={logoStyle}>
    <img src="/favicon.svg" alt="" width={28} height={28} />
    DevGon
  </span>
);
