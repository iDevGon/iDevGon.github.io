import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { css } from 'styled-system/css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useColorMode } from '@/store';

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
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 'calc(6rem + env(safe-area-inset-top, 0px))',
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

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', resolvedColorMode);
    document.documentElement.style.colorScheme = resolvedColorMode;
    const themeColor = resolvedColorMode === 'dark' ? '#1A1D23' : '#F8F9FA';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = themeColor;
  }, [resolvedColorMode]);

  return (
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
  );
};

export const Route = createRootRoute({ component: RootLayout });
