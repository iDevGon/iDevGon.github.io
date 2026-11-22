import { Container } from '@idevgon/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { useSeo } from '@/hooks/useSeo';
import portfolioData from '../../data/portfolio.json';
import type { PortfolioData } from '../../interfaces/portfolio';
import { ProjectCard } from './-ProjectCard';
import {
  heroDescription,
  heroHeading,
  heroNavigation,
  heroStyle,
  pageStyle,
  projectGrid,
  sectionHeading,
  sectionStyle,
} from './-styles';

export const Route = createFileRoute('/portfolio/')({
  component: RouteComponent,
});

const { projects } = portfolioData as PortfolioData;
const liveProjects = projects.filter((project) => project.status === '운영 중');
const moreProjects = projects.filter((project) => project.status !== '운영 중');

function RouteComponent() {
  useSeo({
    title: '포트폴리오',
    description:
      'Chessi, 동물식당과 함께 현장 파티 게임, 웹 추리 게임 등 DevGon이 만든 프로젝트를 소개합니다.',
    path: '/portfolio',
  });

  return (
    <Container className={pageStyle}>
      <header className={heroStyle}>
        <div>
          <h1 className={heroHeading}>
            포트폴리오<span>.</span>
          </h1>
          <p className={heroDescription}>
            혼자 푸는 추리 게임부터 모임에서 함께 즐기는 팀 게임까지 직접
            기획하고 개발했습니다.
          </p>
        </div>
        <nav aria-label="포트폴리오 바로가기" className={heroNavigation}>
          <a href="#live-projects">
            운영 중인 서비스 <span aria-hidden="true">↓</span>
          </a>
          <a href="#more-projects">
            그 외 프로젝트 <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>

      <section
        id="live-projects"
        aria-labelledby="live-title"
        className={sectionStyle}
      >
        <h2 id="live-title" className={sectionHeading}>
          운영 중인 서비스
        </h2>
        <div className={projectGrid} data-featured>
          {liveProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
      </section>

      <section
        id="more-projects"
        aria-labelledby="more-title"
        className={sectionStyle}
      >
        <h2 id="more-title" className={sectionHeading}>
          그 외 프로젝트
        </h2>
        <div className={projectGrid}>
          {moreProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
}
