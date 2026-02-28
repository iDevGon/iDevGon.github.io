import { ColorModeSwitch as ColorModeSwitchBase } from '@idevgon/design-system';
import { useColorMode } from '@/store';

export const ColorModeSwitch = () => {
  const { colorMode, setColorMode } = useColorMode();

  const resolvedMode = colorMode === 'dark' ? 'dark' : 'light';

  const toggle = () => {
    setColorMode(resolvedMode === 'dark' ? 'light' : 'dark');
  };

  return <ColorModeSwitchBase colorMode={resolvedMode} onToggle={toggle} />;
};
