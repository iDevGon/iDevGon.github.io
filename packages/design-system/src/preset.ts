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
            primary: { value: '#3D6B99' },
            primaryLight: { value: '#6B9AC4' },
            primaryDark: { value: '#3A5F8A' },
            secondary: { value: '#C0E0DE' },
            secondaryLight: { value: '#D4EDEB' },
            secondaryDark: { value: '#9CCBC8' },
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
            value: { base: '#F8F9FA', _light: '#F8F9FA', _dark: '#1A1D23' },
          },
          surface: {
            value: { base: '#FFFFFF', _light: '#FFFFFF', _dark: '#242830' },
          },
          surfaceHover: {
            value: { base: '#F0F2F5', _light: '#F0F2F5', _dark: '#2D3139' },
          },
          textPrimary: {
            value: { base: '#2D3436', _light: '#2D3436', _dark: '#E4E6EB' },
          },
          textSecondary: {
            value: { base: '#636E72', _light: '#636E72', _dark: '#A0A4AB' },
          },
          textMuted: {
            value: { base: '#6B7280', _light: '#6B7280', _dark: '#9CA3AF' },
          },
          border: {
            value: { base: '#E1E8ED', _light: '#E1E8ED', _dark: '#363A42' },
          },
          borderHover: {
            value: { base: '#CBD2D9', _light: '#CBD2D9', _dark: '#4A4F5A' },
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
                _dark: '{colors.brand.primary}',
              },
            },
            light: {
              value: {
                base: '{colors.brand.primaryLight}',
                _light: '{colors.brand.primaryLight}',
                _dark: '{colors.brand.primaryDark}',
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
            value: { base: '#EBF2F8', _light: '#EBF2F8', _dark: '#2A3444' },
          },
          tagText: {
            value: {
              base: '{colors.brand.primaryDark}',
              _light: '{colors.brand.primaryDark}',
              _dark: '{colors.brand.primaryLight}',
            },
          },
          cardBg: {
            value: { base: '#FFFFFF', _light: '#FFFFFF', _dark: '#242830' },
          },
          codeBg: {
            value: { base: '#F1F5F9', _light: '#F1F5F9', _dark: '#1E2028' },
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
        width: '210mm',
        height: '297mm',
        margin: 0,
        padding: 0,
        fontSize: '10pt',
        backgroundColor: '#ffffff !important',
        color: '#1a1a1a !important',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      },
      '.no-print': { display: 'none !important' },
      a: { color: '#3182ce !important', textDecoration: 'underline' },
      'h1, h2, h3, h4': { pageBreakAfter: 'avoid', breakAfter: 'avoid' },
      'p, li': { orphans: 3, widows: 3 },
    },
  },
});
