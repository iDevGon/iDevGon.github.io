import { Link } from '@tanstack/react-router';
import type { RefObject } from 'react';
import { activeMobileNavStyle, mobileMenuStyle, mobileNavLinkStyle, NAV_LINKS } from './Header.styles';

interface MobileMenuProps {
  menuRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

export const MobileMenu = ({ menuRef, onClose }: MobileMenuProps) => (
  <nav ref={menuRef} className={mobileMenuStyle}>
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
