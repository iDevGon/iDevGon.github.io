import { Container } from '@idevgon/design-system';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useWebSiteJsonLd } from '@/hooks/useJsonLd';
import { useSeo } from '@/hooks/useSeo';
import {
  avatarStyle,
  careerStyle,
  descriptionStyle,
  heroInnerStyle,
  heroStyle,
  nameStyle,
  quickLinksStyle,
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
    <Container className={heroStyle}>
      <section className={heroInnerStyle} aria-labelledby="home-intro">
        <div>
          <p className={careerStyle}>만 {careerYear}년차 프론트엔드 개발자</p>
          <h1 id="home-intro" className={nameStyle}>
            안녕하세요,
            <br />
            DevGon이에요.
          </h1>
          <p className={descriptionStyle}>
            쓰기 편한 화면을 만들고, 개발하면서 배운 것들을 이곳에 적어요.
          </p>
          <nav className={quickLinksStyle} aria-label="주요 페이지">
            <Link to="/articles">
              생각들 <span aria-hidden="true">→</span>
            </Link>
            <Link to="/resume">이력서</Link>
            <Link to="/contact">연락처</Link>
          </nav>
        </div>
        <img
          src="/images/devgon-avatar.webp"
          alt="노트북 앞에 앉은 DevGon 고양이 캐릭터"
          width={640}
          height={640}
          className={avatarStyle}
          fetchPriority="high"
        />
      </section>
    </Container>
  );
}
