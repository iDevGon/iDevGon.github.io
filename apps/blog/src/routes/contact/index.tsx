import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Container } from '@idevgon/design-system';
import { EmailIcon, GithubIcon, BlogIcon } from '@idevgon/icons';

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
  textWrap: 'balance',
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
  transition: 'border-color 0.2s ease, transform 0.2s ease',
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
                <EmailIcon width={20} height={20} aria-hidden="true" />
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
                <GithubIcon width={20} height={20} aria-hidden="true" />
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
                <BlogIcon width={20} height={20} aria-hidden="true" />
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
