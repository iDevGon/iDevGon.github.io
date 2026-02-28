import { Container, Typo } from '@idevgon/design-system';
import { BlogIcon, EmailIcon, GithubIcon, PhoneIcon } from '@idevgon/icons';
import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { useSeo } from '@/hooks/useSeo';

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
});

const pageStyle = css({
  animation: 'fadeInUp 0.6s ease-out',
});

const titleStyle = css({
  fontSize: { base: '2.4rem', tablet: '2.8rem' },
  fontWeight: 700,
  color: 'textPrimary',
  marginBottom: '1.2rem',
  textWrap: 'balance',
  letterSpacing: '-0.02em',
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
  gap: { base: '1.2rem', tablet: '1.6rem' },
  padding: { base: '1.6rem', tablet: '2rem' },
  borderRadius: '1.2rem',
  backgroundColor: 'cardBg',
  border: '1px solid',
  borderColor: 'border',
  transition: 'border-color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    borderColor: 'borderHover',
    transform: { base: 'none', tablet: 'translateX(4px)' },
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
  useSeo({
    title: '연락처',
    description:
      'DevGon에게 연락하기. 이메일, GitHub 등 다양한 채널로 소통할 수 있습니다.',
    path: '/contact',
    noindex: true,
  });

  return (
    <SsgoiTransition id="/contact">
      <Container>
        <div className={pageStyle}>
          <Typo asChild variant="h1">
            <h1 className={titleStyle}>연락처</h1>
          </Typo>
          <Typo asChild variant="body1">
            <p className={subtitleStyle}>
              궁금한 점이 있으시면 언제든 연락해 주세요.
            </p>
          </Typo>

          <div className={contactListStyle}>
            <a href="mailto:rhcksrhd93@gmail.com" className={contactItemStyle}>
              <div className={iconStyle}>
                <EmailIcon width={20} height={20} aria-hidden="true" />
              </div>
              <div className={contactInfoStyle}>
                <Typo asChild variant="caption">
                  <span className={contactLabelStyle}>Email</span>
                </Typo>
                <Typo asChild variant="body1">
                  <span className={contactLinkStyle}>ghcheondev@gmail.com</span>
                </Typo>
              </div>
            </a>

            <a href="tel:010-2675-0229" className={contactItemStyle}>
              <div className={iconStyle}>
                <PhoneIcon width={20} height={20} aria-hidden="true" />
              </div>
              <div className={contactInfoStyle}>
                <Typo asChild variant="caption">
                  <span className={contactLabelStyle}>Phone</span>
                </Typo>
                <Typo asChild variant="body1">
                  <span className={contactLinkStyle}>010-2675-0229</span>
                </Typo>
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
                <Typo asChild variant="caption">
                  <span className={contactLabelStyle}>GitHub</span>
                </Typo>
                <Typo asChild variant="body1">
                  <span className={contactLinkStyle}>github.com/iDevGon</span>
                </Typo>
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
                <Typo asChild variant="caption">
                  <span className={contactLabelStyle}>Blog</span>
                </Typo>
                <Typo asChild variant="body1">
                  <span className={contactLinkStyle}>iDevGon.github.io</span>
                </Typo>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </SsgoiTransition>
  );
}
