import { css } from 'styled-system/css';

const logoStyle = css({
  display: 'block',
  width: '11.1rem',
  height: '2.8rem',
  flexShrink: 0,
  fill: 'currentColor',
});

const accentStyle = css({
  fill: 'primary',
});

export const Logo = () => (
  <svg
    className={logoStyle}
    viewBox="0 0 127 32"
    role="img"
    aria-label="DevGon"
  >
    <use href="/logo.svg#cat-laptop" className={accentStyle} />
    <use href="/logo.svg#dev" />
    <use href="/logo.svg#gon" className={accentStyle} />
  </svg>
);
