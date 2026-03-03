import { defineConfig } from '@pandacss/dev';
import { idevgonPreset } from '@idevgon/design-system/preset';

export default defineConfig({
  presets: ['@pandacss/preset-base', idevgonPreset],
  exclude: [],
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/design-system/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/timeline-chart/src/**/*.{js,jsx,ts,tsx}',
  ],
  jsxFramework: 'react',
  outdir: 'styled-system',
  preflight: true,
});
