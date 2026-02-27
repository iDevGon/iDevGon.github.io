import { Container, Typo } from '@idevgon/design-system';
import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { css } from 'styled-system/css';
import { Button } from '@/components/Button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const CAREER_START_DATE = '2020-03-01';

const pageStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: '-6rem',
});

const heroStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  animation: 'fadeInUp 0.6s ease-out',
});

const heroInnerStyle = css({
  display: 'flex',
  flexDirection: { base: 'column', desktop: 'row' },
  alignItems: { base: 'flex-start', desktop: 'center' },
  gap: { base: '0', desktop: '2rem' },
});

const heroTextStyle = css({
  flex: { base: 1, desktop: 'none' },
  display: 'flex',
  flexDirection: 'column',
});

const avatarStyle = css({
  width: { base: '16rem', tablet: '20rem' },
  height: { base: '16rem', tablet: '20rem' },
  borderRadius: '50%',
  marginBottom: { base: '2rem', desktop: '0' },
  objectFit: 'cover',
  border: '3px solid',
  borderColor: 'border',
  flexShrink: 0,
  order: { base: 0, desktop: 1 },
});

const terminalPromptStyle = css({
  fontSize: { base: '1.3rem', tablet: '1.4rem' },
  color: 'textMuted',
  fontFamily: '{fonts.mono}',
  marginBottom: '1.6rem',
  letterSpacing: '0.02em',
});

const greetingStyle = css({
  fontSize: { base: '2rem', tablet: '3rem' },
  color: 'primary',
  fontWeight: 600,
  marginBottom: '1.2rem',
  letterSpacing: '0.02em',
});

const nameStyle = css({
  fontSize: { base: '3.2rem', tablet: '4.8rem' },
  fontWeight: 800,
  lineHeight: 1.1,
  color: 'textPrimary',
  marginBottom: '1.6rem',
  textWrap: 'balance',
  letterSpacing: '-0.03em',
  wordBreak: 'auto-phrase',
});

const nameHighlight = css({
  color: 'primary',
});

const descriptionStyle = css({
  fontSize: { base: '1.5rem', tablet: '1.8rem' },
  color: 'textSecondary',
  lineHeight: 1.7,
  maxWidth: '56rem',
  marginBottom: '3.2rem',
});

const cursorStyle = css({
  display: 'inline-block',
  width: '2px',
  height: '1em',
  backgroundColor: 'primary',
  marginLeft: '0.2rem',
  verticalAlign: 'text-bottom',
  animation: 'blink 1s step-end infinite',
});

const buttonGroupStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

function RouteComponent() {
  const careerYear = dayjs().diff(dayjs(CAREER_START_DATE), 'year');

  return (
    <SsgoiTransition id="/" className={pageStyle}>
      <Container css={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className={heroStyle}>
          <div className={heroInnerStyle}>
            <img
              src="https://avatars.githubusercontent.com/u/106735547?v=4"
              alt="DevGon 프로필"
              className={avatarStyle}
            />
            <div className={heroTextStyle}>
              <span className={terminalPromptStyle}>
                $ whoami
                <span className={cursorStyle} />
              </span>
              <Typo asChild variant="body1">
                <span className={greetingStyle}>안녕하세요! 👋🏻</span>
              </Typo>
              <Typo asChild variant="h1">
                <h1 className={nameStyle}>
                  만 {careerYear}년차 프론트엔드 개발자
                  <br />
                  <strong className={nameHighlight}>DevGon</strong>
                  이에요.
                </h1>
              </Typo>
              <Typo asChild variant="body1">
                <p className={descriptionStyle}>
                  사용자 경험을 고민하고, 깔끔한 코드를 추구하고 있어요.
                </p>
              </Typo>
              <div className={buttonGroupStyle}>
                <Button to="/articles">생각들</Button>
                <Button to="/resume" outline>
                  이력서
                </Button>
                <Button to="/contact" outline>
                  연락처
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SsgoiTransition>
  );
}
