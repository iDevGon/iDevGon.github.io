import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Logo } from '@/components/Logo';
import { DesktopNav } from './DesktopNav';
import {
  headerInnerStyle,
  headerStyle,
  logoAreaStyle,
  mobileActionsStyle,
} from './Header.styles';
import { MobileMenu } from './MobileMenu';
import { MobileMenuButton } from './MobileMenuButton';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target)
      )
        return;
      setMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`${headerStyle} no-print`}>
        <div className={headerInnerStyle}>
          <Link to="/" className={logoAreaStyle}>
            <Logo />
          </Link>

          <DesktopNav />

          <div className={mobileActionsStyle}>
            <ColorModeSwitch />
            <MobileMenuButton
              open={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen((prev) => !prev)}
              ref={hamburgerRef}
            />
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <MobileMenu ref={menuRef} onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
};
