import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Container } from '@idevgon/design-system';

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
});

const pageStyle = css({
  animation: 'fadeInUp 0.6s ease-out',
});

const titleStyle = css({
  fontSize: '2.8rem',
  fontWeight: 700,
  color: 'textPrimary',
  marginBottom: '1.2rem',
});

const subtitleStyle = css({
  fontSize: '1.6rem',
  color: 'textSecondary',
  marginBottom: '4rem',
  lineHeight: 1.6,
});

const contactListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const contactItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  padding: '2rem',
  borderRadius: '1.2rem',
  backgroundColor: 'cardBg',
  border: '1px solid',
  borderColor: 'border',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: 'borderHover',
    transform: 'translateX(4px)',
  },
});

const iconStyle = css({
  width: '4.4rem',
  height: '4.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1rem',
  backgroundColor: 'surfaceHover',
  flexShrink: 0,
});

const contactInfoStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

const contactLabelStyle = css({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const contactLinkStyle = css({
  fontSize: '1.6rem',
  color: 'primary',
  fontWeight: 500,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

// 간단한 인라인 SVG 아이콘들 (16x16)
function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function RouteComponent() {
  return (
    <SsgoiTransition id="/contact">
      <Container>
        <div className={pageStyle}>
          <h1 className={titleStyle}>Contact</h1>
          <p className={subtitleStyle}>
            궁금한 점이 있으시면 언제든 연락해 주세요.
          </p>

          <div className={contactListStyle}>
            <a href="mailto:rhcksrhd93@gmail.com" className={contactItemStyle}>
              <div className={iconStyle}>
                <EmailIcon />
              </div>
              <div className={contactInfoStyle}>
                <span className={contactLabelStyle}>Email</span>
                <span className={contactLinkStyle}>ghcheondev@gmail.com</span>
              </div>
            </a>

            <a
              href="https://github.com/iDevGon"
              target="_blank"
              rel="noopener noreferrer"
              className={contactItemStyle}
            >
              <div className={iconStyle}>
                <GithubIcon />
              </div>
              <div className={contactInfoStyle}>
                <span className={contactLabelStyle}>GitHub</span>
                <span className={contactLinkStyle}>github.com/iDevGon</span>
              </div>
            </a>

            <a
              href="https://iDevGon.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className={contactItemStyle}
            >
              <div className={iconStyle}>
                <BlogIcon />
              </div>
              <div className={contactInfoStyle}>
                <span className={contactLabelStyle}>Blog</span>
                <span className={contactLinkStyle}>iDevGon.github.io</span>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </SsgoiTransition>
  );
}
