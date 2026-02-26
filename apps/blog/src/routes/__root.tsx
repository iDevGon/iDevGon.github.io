import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { drill, fade } from '@ssgoi/react/view-transitions';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { css } from 'styled-system/css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useColorMode } from '@/store';

const ssgoiConfig: SsgoiConfig = {
  transitions: [
    {
      from: '/articles/detail/*',
      to: '/articles?page=*',
      transition: drill({
        direction: 'exit',
      }),
      symmetric: false,
    },
    {
      from: '/articles?page=*',
      to: '/articles/detail/*',
      transition: drill({
        direction: 'enter',
      }),
      symmetric: false,
    },
  ],
  defaultTransition: fade({
    inSpring: {
      stiffness: 400,
      damping: 35,
    },
    outSpring: {
      stiffness: 400,
      damping: 35,
    },
  }),
};

const rootLayoutStyle = css({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'background',
  color: 'textPrimary',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  _print: {
    background: '#ffffff !important',
    color: '#1a1a1a !important',
    minHeight: 'auto',
  },
});

const mainContentStyle = css({
  flex: 1,
  paddingTop: '6rem',
  _print: {
    paddingTop: 0,
  },
});

const RootLayout = () => {
  const colorMode = useColorMode((s) => s.colorMode);
  const setColorMode = useColorMode((s) => s.setColorMode);

  useEffect(() => {
    if (colorMode === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setColorMode(prefersDark ? 'dark' : 'light');
    }
  }, [colorMode, setColorMode]);

  const resolvedColorMode = colorMode === 'system' ? 'light' : colorMode;

  return (
    <Ssgoi config={ssgoiConfig}>
      <div data-color-mode={resolvedColorMode} className={rootLayoutStyle}>
        <a href="#main-content" className="skip-link">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content" className={mainContentStyle}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Ssgoi>
  );
};

export const Route = createRootRoute({ component: RootLayout });
