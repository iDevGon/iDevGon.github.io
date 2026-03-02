import { css } from 'styled-system/css';
import { SunIcon, MoonIcon } from '@idevgon/icons';

const switchStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: { base: '4.4rem', tablet: '2.4rem' },
  height: { base: '4.4rem', tablet: '2.4rem' },
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: { base: 'textPrimary', tablet: 'textSecondary' },
  touchAction: 'manipulation',
  transition: 'color 0.2s ease, transform 0.2s ease',
  _hover: {
    color: 'textPrimary',
  },
  '& svg': {
    width: '2rem',
    height: '2rem',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
});

export interface ColorModeSwitchProps {
  colorMode: 'light' | 'dark';
  onToggle: () => void;
}

export const ColorModeSwitch = ({ colorMode, onToggle }: ColorModeSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={switchStyle}
      aria-label={
        colorMode === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
    >
      {colorMode === 'dark' ? (
        <SunIcon aria-hidden="true" />
      ) : (
        <MoonIcon aria-hidden="true" />
      )}
    </button>
  );
};
