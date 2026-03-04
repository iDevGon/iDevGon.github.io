import { Container, Typo } from '@idevgon/design-system';
import { BlogIcon, EmailIcon, GithubIcon, LinkedinIcon, PhoneIcon } from '@idevgon/icons';
import { createFileRoute } from '@tanstack/react-router';
import { useSeo } from '@/hooks/useSeo';
import {
  contactInfoStyle,
  contactItemStyle,
  contactLabelStyle,
  contactLinkStyle,
  contactListStyle,
  iconStyle,
  pageStyle,
  subtitleStyle,
  titleStyle,
} from './-styles';

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
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
            <a href="mailto:ghcheondev@gmail.com" className={contactItemStyle}>
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
              href="https://www.linkedin.com/in/idevgon/"
              target="_blank"
              rel="noopener noreferrer"
              className={contactItemStyle}
            >
              <div className={iconStyle}>
                <LinkedinIcon width={20} height={20} aria-hidden="true" />
              </div>
              <div className={contactInfoStyle}>
                <Typo asChild variant="caption">
                  <span className={contactLabelStyle}>LinkedIn</span>
                </Typo>
                <Typo asChild variant="body1">
                  <span className={contactLinkStyle}>linkedin.com/in/idevgon</span>
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
  );
}
