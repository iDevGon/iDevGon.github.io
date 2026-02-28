import type { RefObject } from 'react';
import {
  hamburgerLineBottomOpenStyle,
  hamburgerLineMiddleOpenStyle,
  hamburgerLineStyle,
  hamburgerLineTopOpenStyle,
  hamburgerStyle,
} from './Header.styles';

interface MobileMenuButtonProps {
  open: boolean;
  onToggle: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}

export const MobileMenuButton = ({ open, onToggle, buttonRef }: MobileMenuButtonProps) => (
  <button
    ref={buttonRef}
    type="button"
    className={hamburgerStyle}
    onClick={onToggle}
    aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
    aria-expanded={open}
  >
    <span className={`${hamburgerLineStyle} ${open ? hamburgerLineTopOpenStyle : ''}`} />
    <span className={`${hamburgerLineStyle} ${open ? hamburgerLineMiddleOpenStyle : ''}`} />
    <span className={`${hamburgerLineStyle} ${open ? hamburgerLineBottomOpenStyle : ''}`} />
  </button>
);
