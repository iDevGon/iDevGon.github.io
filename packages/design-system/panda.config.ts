import { defineConfig } from '@pandacss/dev';
import { idevgonPreset } from './src/preset';

export default defineConfig({
	presets: ['@pandacss/preset-base', idevgonPreset],
	include: ['./src/**/*.{js,jsx,ts,tsx}', './stories/**/*.{js,jsx,ts,tsx}'],
	exclude: [],
	jsxFramework: 'react',
	outdir: 'styled-system',
	preflight: true,
});
