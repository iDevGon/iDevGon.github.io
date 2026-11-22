import { css } from 'styled-system/css';

export const headerStyle = css({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background: 'background',
  borderBottom: '1px solid var(--colors-border)',
});

export const headerInnerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '6rem',
  maxWidth: '120rem',
  marginInline: 'auto',
  paddingInline: { base: '1.6rem', tablet: '2.4rem', desktop: '3.2rem' },
});

export const logoAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  textDecoration: 'none',
  color: 'textPrimary',
  transition: 'opacity 0.2s ease',
  _hover: {
    opacity: 0.7,
  },
});

export const desktopNavStyle = css({
  display: { base: 'none', tablet: 'flex' },
  alignItems: 'center',
  gap: '2.4rem',
});

export const mobileActionsStyle = css({
  display: { base: 'flex', tablet: 'none' },
  alignItems: 'center',
  gap: '0',
});

export const hamburgerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '4.4rem',
  height: '4.4rem',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  gap: '0.5rem',
  touchAction: 'manipulation',
});

export const hamburgerLineStyle = css({
  width: '2rem',
  height: '2px',
  backgroundColor: 'textPrimary',
  borderRadius: '1px',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
});

export const hamburgerLineTopOpenStyle = css({
  transform: 'rotate(45deg) translate(5px, 5px)',
});

export const hamburgerLineMiddleOpenStyle = css({
  opacity: 0,
  transform: 'scaleX(0)',
});

export const hamburgerLineBottomOpenStyle = css({
  transform: 'rotate(-45deg) translate(5px, -5px)',
});

export const mobileMenuStyle = css({
  display: { base: 'flex', tablet: 'none' },
  flexDirection: 'column',
  position: 'fixed',
  top: 'calc(6rem + env(safe-area-inset-top, 0px))',
  left: 0,
  right: 0,
  zIndex: 99,
  background: 'background',
  borderBottom: '1px solid var(--colors-border)',
  padding: '0.8rem 1.6rem',
  animation: 'fadeInUp 0.2s ease-out',
});

export const navLinkStyle = css({
  fontSize: '1.4rem',
  fontWeight: 500,
  color: 'textSecondary',
  textDecoration: 'none',
  paddingBlock: '0.4rem',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'textPrimary',
  },
});

export const mobileNavLinkStyle = css({
  fontSize: '1.5rem',
  fontWeight: 500,
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '1.2rem 0.8rem',
  display: 'block',
  borderBottom: '1px solid var(--colors-border)',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'textPrimary',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
});

export const activeNavStyle = css({
  color: 'primary',
  fontWeight: 600,
  borderBottom: '2px solid var(--colors-primary)',
});

export const activeMobileNavStyle = css({
  color: 'primary',
  fontWeight: 600,
});

export const NAV_LINKS = [
  { to: '/articles' as const, label: '생각들' },
  { to: '/portfolio' as const, label: '포트폴리오' },
  { to: '/resume' as const, label: '이력서' },
  { to: '/contact' as const, label: '연락처' },
];
