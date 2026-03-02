import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Logo } from '@/components/Logo';
import { DesktopNav } from './DesktopNav';
import { headerStyle, logoAreaStyle, mobileActionsStyle } from './Header.styles';
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
      if (menuRef.current?.contains(target) || hamburgerRef.current?.contains(target)) return;
      setMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <header className={`${headerStyle} no-print`}>
      <Link to="/" className={logoAreaStyle}>
        <Logo height={36} />
      </Link>

      <DesktopNav />

      {/* Mobile Actions */}
      <div className={mobileActionsStyle}>
        <ColorModeSwitch />
        <MobileMenuButton
          open={mobileMenuOpen}
          onToggle={() => setMobileMenuOpen((prev) => !prev)}
          buttonRef={hamburgerRef}
        />
      </div>
    </header>

    {/* Mobile Menu - header 바깥에 위치해야 backdrop-filter 독립 적용 */}
    {mobileMenuOpen && (
      <MobileMenu
        menuRef={menuRef}
        onClose={() => setMobileMenuOpen(false)}
      />
    )}
    </>
  );
};
