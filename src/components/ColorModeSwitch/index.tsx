import { useColorMode } from '../../store';

export const ColorModeSwitch = () => {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <button
      type="button"
      onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
    >
      ColorModeSwitch
    </button>
  );
};
