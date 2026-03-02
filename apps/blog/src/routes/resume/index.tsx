import { Container } from '@idevgon/design-system';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { TimelineChart } from '../../components/TimelineChart';
import type { TimelineItem } from '../../components/TimelineChart';
import resumeData from '../../data/resume.json';
import type { ResumeData } from '../../interfaces/resume';
import {
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  IntroductionSection,
  OthersSection,
  ProfileSection,
  SkillsSection,
} from './-components';
import { dividerStyle, printPageStyle } from './-styles';
import { experiencesToTimelineItems } from './-utils';

export const Route = createFileRoute('/resume/')({
  component: RouteComponent,
});

const data = resumeData as ResumeData;
const timelineItems = experiencesToTimelineItems(data.experiences);

function RouteComponent() {
  useSeo({
    title: '이력서',
    description:
      '프론트엔드 개발자 DevGon의 이력서. 경력, 기술 스택, 프로젝트 경험을 확인할 수 있습니다.',
    path: '/resume',
    noindex: true,
  });

  const handleBarClick = useCallback((item: TimelineItem) => {
    const el = document.getElementById(`experience-${item.id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <Container className={printPageStyle}>
        <ProfileSection profile={data.profile} />
        <hr className={dividerStyle} />

        <IntroductionSection introduction={data.introduction} />
        <hr className={dividerStyle} />

        <ExperienceSection experiences={data.experiences}>
          <TimelineChart items={timelineItems} onBarClick={handleBarClick}>
            <TimelineChart.Title>경력 타임라인</TimelineChart.Title>
            <TimelineChart.Chart />
            <TimelineChart.Legend />
          </TimelineChart>
        </ExperienceSection>
        <hr className={dividerStyle} />

        <SkillsSection skills={data.skills} />
        <hr className={dividerStyle} />

        <EducationSection education={data.education} />
        <hr className={dividerStyle} />

        <CertificationsSection certifications={data.certifications} />
        <hr className={dividerStyle} />

        <OthersSection others={data.others} />
      </Container>
  );
}
