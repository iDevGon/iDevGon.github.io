import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const CAREER_START_DATE = '2020-03-01';

function RouteComponent() {
  const careerYear = dayjs().diff(dayjs(CAREER_START_DATE), 'year');

  return (
    <SsgoiTransition id="/">
      <Container>
        <h1>안녕하세요!</h1>
        <br />
        <h2>저는 만 {careerYear}년차 개발자</h2>
        천곤홍 입니다.
        <br />
        <br />
        제가 궁금하신가요?
        <Button wiggled to="/contact">
          Contact
        </Button>
        <Button wiggled to="/resume">
          Resume
        </Button>
        <Button wiggled to="/articles">
          Articles
        </Button>
      </Container>
    </SsgoiTransition>
  );
}
