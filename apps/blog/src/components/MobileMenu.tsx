import { Link } from '@tanstack/react-router';
import type { Ref } from 'react';
import {
  activeMobileNavStyle,
  mobileMenuStyle,
  mobileNavLinkStyle,
  NAV_LINKS,
} from './Header.styles';

interface MobileMenuProps {
  ref?: Ref<HTMLElement>;
  onClose: () => void;
}

export const MobileMenu = ({ ref, onClose }: MobileMenuProps) => (
  <nav ref={ref} className={mobileMenuStyle}>
    {NAV_LINKS.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className={mobileNavLinkStyle}
        activeProps={{
          className: `${mobileNavLinkStyle} ${activeMobileNavStyle}`,
        }}
        onClick={onClose}
      >
        {link.label}
      </Link>
    ))}
  </nav>
);
