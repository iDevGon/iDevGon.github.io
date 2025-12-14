import { Ssgoi, type SsgoiConfig } from '@ssgoi/react';
import { slide } from '@ssgoi/react/view-transitions';
import { createRootRoute, Outlet } from '@tanstack/react-router';

const ssgoiConfig: SsgoiConfig = {
  // defaultTransition: fade(),
  transitions: [
    {
      from: '/',
      to: '/contact',
      transition: slide({ direction: 'right' }),
      symmetric: true,
    },
  ],
};

const RootLayout = () => {
  // const year = dayjs().year();
  // const { colorMode } = useColorMode();
  return (
    <Ssgoi config={ssgoiConfig}>
      {/* <div
        data-color-mode={colorMode}
        className={css({ background: 'background' })}
        style={{
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <Flex css={{ gap: '2' }}>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/articles/$articleId" params={{ articleId: '1' }}>
            Article 1
          </Link>
        </Flex>
        <hr /> */}
      <Outlet />
      {/* <footer>
          <p>Copyright © {year} DevGon. All rights reserved.</p>
        </footer>
      </div> */}
    </Ssgoi>
  );
};

export const Route = createRootRoute({ component: RootLayout });
