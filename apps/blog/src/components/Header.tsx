import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Logo } from '@/components/Logo';

const headerStyle = css({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '6rem',
  paddingInline: { base: '1.6rem', tablet: '2.4rem' },
  background: 'color-mix(in srgb, var(--colors-surface) 85%, transparent)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 0.3s ease, border-color 0.3s ease',
  overflow: 'visible',
});

const logoAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  textDecoration: 'none',
  color: 'textPrimary',
});

const desktopNavStyle = css({
  display: { base: 'none', tablet: 'flex' },
  alignItems: 'center',
  gap: '2.4rem',
});

const mobileActionsStyle = css({
  display: { base: 'flex', tablet: 'none' },
  alignItems: 'center',
  gap: '0.8rem',
});

const hamburgerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '3.2rem',
  height: '3.2rem',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  gap: '0.5rem',
  touchAction: 'manipulation',
});

const hamburgerLineStyle = css({
  width: '2rem',
  height: '2px',
  backgroundColor: 'textPrimary',
  borderRadius: '1px',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
});

const mobileMenuStyle = css({
  display: { base: 'flex', tablet: 'none' },
  flexDirection: 'column',
  position: 'absolute',
  top: '6rem',
  left: 0,
  right: 0,
  background: 'color-mix(in srgb, var(--colors-surface) 95%, transparent)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid',
  borderColor: 'border',
  padding: '0.8rem 1.6rem',
  animation: 'fadeInUp 0.2s ease-out',
});

const navLinkStyle = css({
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

const mobileNavLinkStyle = css({
  fontSize: '1.5rem',
  fontWeight: 500,
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '1.2rem 0.8rem',
  display: 'block',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'textPrimary',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
});

const activeNavStyle = css({
  color: 'primary',
  fontWeight: 600,
  borderBottom: '2px solid',
  borderColor: 'primary',
});

const activeMobileNavStyle = css({
  color: 'primary',
  fontWeight: 600,
});

const NAV_LINKS = [
  { to: '/articles' as const, label: '생각들' },
  { to: '/resume' as const, label: '이력서' },
  { to: '/contact' as const, label: '연락처' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`${headerStyle} no-print`}>
      <Link to="/" className={logoAreaStyle}>
        <Logo height={36} />
      </Link>

      {/* Desktop Navigation */}
      <nav className={desktopNavStyle}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={navLinkStyle}
            activeProps={{ className: `${navLinkStyle} ${activeNavStyle}` }}
          >
            {link.label}
          </Link>
        ))}
        <ColorModeSwitch />
      </nav>

      {/* Mobile Actions */}
      <div className={mobileActionsStyle}>
        <ColorModeSwitch />
        <button
          type="button"
          className={hamburgerStyle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={hamburgerLineStyle}
            style={
              mobileMenuOpen
                ? { transform: 'rotate(45deg) translate(5px, 5px)' }
                : undefined
            }
          />
          <span
            className={hamburgerLineStyle}
            style={mobileMenuOpen ? { opacity: 0 } : undefined}
          />
          <span
            className={hamburgerLineStyle}
            style={
              mobileMenuOpen
                ? { transform: 'rotate(-45deg) translate(5px, -5px)' }
                : undefined
            }
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className={mobileMenuStyle}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={mobileNavLinkStyle}
              activeProps={{
                className: `${mobileNavLinkStyle} ${activeMobileNavStyle}`,
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
