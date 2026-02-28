import { Link } from '@tanstack/react-router';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import {
  activeNavStyle,
  desktopNavStyle,
  NAV_LINKS,
  navLinkStyle,
} from './Header.styles';

export const DesktopNav = () => (
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
);
