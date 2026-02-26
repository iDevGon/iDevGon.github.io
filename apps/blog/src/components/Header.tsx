import { Typo } from '@idevgon/design-system';
import { Link } from '@tanstack/react-router';
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
  paddingInline: '2.4rem',
  background: 'color-mix(in srgb, var(--colors-surface) 85%, transparent)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 0.3s ease, border-color 0.3s ease',
});

const logoAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  textDecoration: 'none',
  color: 'textPrimary',
});

const logoTextStyle = css({
  fontSize: '1.8rem',
  fontWeight: 700,
  letterSpacing: '-0.02em',
});

const navAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2.4rem',
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

const activeNavStyle = css({
  color: 'primary',
  fontWeight: 600,
  borderBottom: '2px solid',
  borderColor: 'primary',
});

export const Header = () => {
  return (
    <header className={`${headerStyle} no-print`}>
      <Link to="/" className={logoAreaStyle}>
        <Logo width={32} height={36} />
        <Typo asChild variant="body1">
          <span className={logoTextStyle}>DevGon</span>
        </Typo>
      </Link>
      <nav className={navAreaStyle}>
        <Link
          to="/articles"
          className={navLinkStyle}
          activeProps={{ className: `${navLinkStyle} ${activeNavStyle}` }}
        >
          생각들
        </Link>
        <Link
          to="/resume"
          className={navLinkStyle}
          activeProps={{ className: `${navLinkStyle} ${activeNavStyle}` }}
        >
          이력서
        </Link>
        <Link
          to="/contact"
          className={navLinkStyle}
          activeProps={{ className: `${navLinkStyle} ${activeNavStyle}` }}
        >
          연락처
        </Link>
        <ColorModeSwitch />
      </nav>
    </header>
  );
};
