import { Container, Typo } from '@idevgon/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { useSeo } from '@/hooks/useSeo';
import portfolioData from '../../data/portfolio.json';
import type { PortfolioData } from '../../interfaces/portfolio';
import { ProjectCard } from './-components';
import {
  heroDescStyle,
  heroStyle,
  pageStyle,
  projectListStyle,
  titleStyle,
} from './-styles';

export const Route = createFileRoute('/portfolio/')({
  component: RouteComponent,
});

const data = portfolioData as PortfolioData;

function RouteComponent() {
  useSeo({
    title: '포트폴리오',
    description:
      '프론트엔드 개발자 DevGon의 사이드 프로젝트 포트폴리오. 기획부터 디자인, 개발까지 직접 만든 프로젝트들을 소개합니다.',
    path: '/portfolio',
  });

  return (
    <Container className={pageStyle}>
      <header className={heroStyle}>
        <Typo asChild variant="h1">
          <h1 className={titleStyle}>포트폴리오</h1>
        </Typo>
        <p className={heroDescStyle}>
          업무 외 시간에 직접 기획하고, 디자인하고, 개발한 사이드
          프로젝트들입니다.
        </p>
      </header>

      <div className={projectListStyle}>
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  );
}
