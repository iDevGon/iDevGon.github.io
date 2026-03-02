import { Container, Typo } from '@idevgon/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/Button';
import { useWebSiteJsonLd } from '@/hooks/useJsonLd';
import { useSeo } from '@/hooks/useSeo';
import {
  avatarStyle,
  buttonGroupStyle,
  cursorStyle,
  descriptionStyle,
  greetingStyle,
  heroInnerStyle,
  heroStyle,
  heroTextStyle,
  nameHighlight,
  nameStyle,
  pageStyle,
  terminalPromptStyle,
} from './-styles';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const CAREER_START = new Date('2020-03-01');

function getCareerYears(): number {
  const now = new Date();
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return Math.floor(months / 12);
}

function RouteComponent() {
  const careerYear = getCareerYears();

  useSeo({
    title: "DevGon's Log",
    description:
      '프론트엔드 개발자 DevGon의 기술 블로그. 사용자 경험을 고민하고, 깔끔한 코드를 추구합니다.',
    path: '/',
  });

  useWebSiteJsonLd();

  return (
    <div className={pageStyle}>
      <Container css={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className={heroStyle}>
          <div className={heroInnerStyle}>
            <img
              src="https://avatars.githubusercontent.com/u/106735547?v=4"
              alt="DevGon 프로필"
              width={320}
              height={320}
              className={avatarStyle}
              fetchPriority="high"
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
    </div>
  );
}
