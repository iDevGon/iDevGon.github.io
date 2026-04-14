import { defineConfig } from '@pandacss/dev';
import { idevgonPreset } from '@idevgon/design-system/preset';

export default defineConfig({
  presets: ['@pandacss/preset-base', idevgonPreset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  preflight: true,
});
