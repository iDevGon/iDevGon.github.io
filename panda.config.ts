import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  exclude: [],
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
  preflight: true,
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '5%': { transform: 'rotate(-3deg) scale(1.03)' },
          '10%': { transform: 'rotate(3deg) scale(1.03)' },
          '15%': { transform: 'rotate(-2deg) scale(1.01)' },
          '20%': { transform: 'rotate(0deg) scale(1)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
      },
      breakpoints: {
        mobile: '0px',
        tablet: '768px',
        desktop: '1024px',
      },
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: 'black',
              _light: 'white',
              _dark: 'black',
            }
          },
          primary: {
            DEFAULT: {
              value: {
                base: 'hsl(222.2 84% 45%)',
                _light: 'hsl(222.2 84% 45%)',
                _dark: 'hsl(222.2 84% 45%)',
              }
            },
            dark: {
              value: {
                base: 'hsl(222.2 84% 30%)',
                _light: 'hsl(222.2 84% 30%)',
                _dark: 'hsl(222.2 84% 30%)',
              }
            },
            light: {
              value: {
                base: 'hsl(222.2 84% 60%)',
                _light: 'hsl(222.2 84% 60%)',
                _dark: 'hsl(222.2 84% 60%)',
              }
            }
          }
        }
      },
    },
  },
  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
  },
  globalCss: {
    "*": {
      fontFamily: 'Roboto, Noto Sans KR, sans-serif',
      boxSizing: 'border-box',
    },
    "html,body": {
      fontSize: '62.5%',
    },
  },
});
