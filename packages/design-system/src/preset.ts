import { definePreset } from '@pandacss/dev';

export const idevgonPreset = definePreset({
  name: '@idevgon/preset',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      breakpoints: {
        mobile: '0px',
        tablet: '768px',
        desktop: '1024px',
      },
      tokens: {
        radii: {
          sm: { value: '0.4rem' },
          md: { value: '0.8rem' },
          lg: { value: '1.2rem' },
          xl: { value: '1.6rem' },
          full: { value: '9999px' },
        },
        colors: {
          brand: {
            primary: { value: 'oklch(45% 0.12 43)' },
            primaryLight: { value: 'oklch(79% 0.12 56)' },
            primaryDark: { value: 'oklch(38% 0.105 43)' },
            secondary: { value: 'oklch(90% 0.04 62)' },
            secondaryLight: { value: 'oklch(94% 0.025 62)' },
            secondaryDark: { value: 'oklch(35% 0.06 52)' },
          },
        },
        fonts: {
          sans: {
            value:
              "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Noto Sans KR', sans-serif",
          },
          mono: {
            value:
              "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace",
          },
        },
      },
      semanticTokens: {
        colors: {
          background: {
            value: { base: '#faf8f4', _light: '#faf8f4', _dark: '#201d1a' },
          },
          surface: {
            value: { base: '#fffdf8', _light: '#fffdf8', _dark: '#292520' },
          },
          surfaceHover: {
            value: { base: '#f2ede5', _light: '#f2ede5', _dark: '#332d27' },
          },
          textPrimary: {
            value: { base: '#292521', _light: '#292521', _dark: '#eee8df' },
          },
          textSecondary: {
            value: { base: '#625a50', _light: '#625a50', _dark: '#c3b8aa' },
          },
          textMuted: {
            value: { base: '#6e655a', _light: '#6e655a', _dark: '#aca092' },
          },
          border: {
            value: { base: '#e3dbd0', _light: '#e3dbd0', _dark: '#483f36' },
          },
          borderHover: {
            value: { base: '#bdad9b', _light: '#bdad9b', _dark: '#66584a' },
          },
          primary: {
            DEFAULT: {
              value: {
                base: '{colors.brand.primary}',
                _light: '{colors.brand.primary}',
                _dark: '{colors.brand.primaryLight}',
              },
            },
            dark: {
              value: {
                base: '{colors.brand.primaryDark}',
                _light: '{colors.brand.primaryDark}',
                _dark: 'oklch(87% 0.085 56)',
              },
            },
            light: {
              value: {
                base: '{colors.brand.primaryLight}',
                _light: '{colors.brand.primaryLight}',
                _dark: '{colors.brand.primaryLight}',
              },
            },
          },
          secondary: {
            DEFAULT: {
              value: {
                base: '{colors.brand.secondary}',
                _light: '{colors.brand.secondary}',
                _dark: '{colors.brand.secondaryDark}',
              },
            },
          },
          tagBg: {
            value: { base: '#f1e9dd', _light: '#f1e9dd', _dark: '#3a3026' },
          },
          tagText: {
            value: {
              base: '{colors.brand.primaryDark}',
              _light: '{colors.brand.primaryDark}',
              _dark: '{colors.brand.primaryLight}',
            },
          },
          cardBg: {
            value: { base: '#fffdf8', _light: '#fffdf8', _dark: '#292520' },
          },
          codeBg: {
            value: { base: '#f1ede6', _light: '#f1ede6', _dark: '#29241f' },
          },
          codeBlockBg: {
            value: { base: '#1E293B', _light: '#1E293B', _dark: '#0F1219' },
          },
        },
      },
    },
  },
  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
    print: '@media print',
  },
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    'html, body': {
      fontSize: '62.5%',
      margin: 0,
      padding: 0,
      fontFamily: '{fonts.sans}',
    },
    html: {
      scrollBehavior: 'smooth',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      backgroundColor: 'background',
    },
    body: {
      backgroundColor: 'background',
      color: 'textPrimary',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      lineHeight: 1.6,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'code, pre, kbd, samp': {
      fontFamily: '{fonts.mono}',
    },
    '::selection': {
      backgroundColor: '{colors.brand.primary}',
      color: 'white',
    },
    '.skip-link': {
      position: 'absolute',
      top: '-4rem',
      left: '1.6rem',
      background: 'primary',
      color: 'white',
      padding: '0.8rem 1.6rem',
      borderRadius: '0.4rem',
      fontSize: '1.4rem',
      zIndex: 1000,
      transition: 'top 0.2s ease',
      '&:focus': {
        top: '1rem',
      },
    },
    '@page': { size: 'A4', margin: '15mm' },
    '@media print': {
      'html, body': {
        margin: 0,
        padding: 0,
        fontSize: '10pt',
        backgroundColor: '#ffffff !important',
        color: '#1a1a1a !important',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
        colorScheme: 'light !important',
        transition: 'none !important',
      },
      '[data-color-mode]': {
        '--colors-background': '#ffffff !important',
        '--colors-surface': '#ffffff !important',
        '--colors-surface-hover': '#f4f2ee !important',
        '--colors-text-primary': '#1a1a1a !important',
        '--colors-text-secondary': '#404040 !important',
        '--colors-text-muted': '#525252 !important',
        '--colors-border': '#d6d2cd !important',
        '--colors-primary': '#743b26 !important',
        '--colors-tag-bg': '#f3f0eb !important',
        '--colors-tag-text': '#34302c !important',
      },
      '.no-print, .skip-link': { display: 'none !important' },
      a: { color: '#1a1a1a !important', textDecoration: 'underline' },
      'h1, h2, h3, h4': { pageBreakAfter: 'avoid', breakAfter: 'avoid' },
      'p, li': { orphans: 3, widows: 3 },
    },
  },
});
