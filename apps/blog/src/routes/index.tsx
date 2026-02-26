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

const heroStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 12rem)',
  animation: 'fadeInUp 0.6s ease-out',
});

const greetingStyle = css({
  fontSize: '3rem',
  color: 'primary',
  fontWeight: 600,
  marginBottom: '1.2rem',
  letterSpacing: '0.05em',
});

const nameStyle = css({
  fontSize: '4.8rem',
  fontWeight: 800,
  lineHeight: 1.1,
  color: 'textPrimary',
  marginBottom: '1.6rem',
  textWrap: 'balance',
});

const nameHighlight = css({
  color: 'primary',
});

const descriptionStyle = css({
  fontSize: '1.8rem',
  color: 'textSecondary',
  lineHeight: 1.6,
  maxWidth: '56rem',
  marginBottom: '3.2rem',
});

const buttonGroupStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

function RouteComponent() {
  const careerYear = dayjs().diff(dayjs(CAREER_START_DATE), 'year');

  return (
    <SsgoiTransition id="/">
      <Container>
        <div className={heroStyle}>
          <Typo asChild variant="body1">
            <span className={greetingStyle}>안녕하세요! 👋🏻</span>
          </Typo>
          <Typo asChild variant="h1">
            <h1 className={nameStyle}>
              만 {careerYear}년차 프론트엔드 개발자
              <br />
              <strong className={nameHighlight}>천곤홍</strong>
              입니다.
            </h1>
          </Typo>
          <Typo asChild variant="body1">
            <p className={descriptionStyle}>
              사용자 경험에 대한 고민과 깔끔한 코드를 추구하는 개발자입니다.
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
      </Container>
    </SsgoiTransition>
  );
}
