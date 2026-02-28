import { css } from 'styled-system/css';
import { SunIcon, MoonIcon } from '@idevgon/icons';
import { useColorMode } from '@/store';

const switchStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.4rem',
  height: '2.4rem',
  padding: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: 'textPrimary',
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

export const ColorModeSwitch = () => {
  const { colorMode, setColorMode } = useColorMode();

  const toggle = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={switchStyle}
      aria-label={
        colorMode === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
    >
      {colorMode === 'dark' ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
    </button>
  );
};
