import { useEffect } from 'react';
import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { drill, fade } from '@ssgoi/react/view-transitions';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
});

const mainContentStyle = css({
  flex: 1,
  paddingTop: '6rem',
});

const RootLayout = () => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setColorMode(prefersDark ? 'dark' : 'light');
    }
  }, [colorMode, setColorMode]);

  const resolvedColorMode =
    colorMode === 'system' ? 'light' : colorMode;

  return (
    <Ssgoi config={ssgoiConfig}>
      <div data-color-mode={resolvedColorMode} className={rootLayoutStyle}>
        <Header />
        <main className={mainContentStyle}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Ssgoi>
  );
};

export const Route = createRootRoute({ component: RootLayout });
