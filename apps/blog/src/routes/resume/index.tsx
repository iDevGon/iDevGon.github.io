import { Container } from '@idevgon/design-system';
import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { TimelineChart } from '../../components/TimelineChart';
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
  return (
    <SsgoiTransition id="/resume">
      <Container className={printPageStyle}>
        <ProfileSection profile={data.profile} />
        <hr className={dividerStyle} />

        <IntroductionSection introduction={data.introduction} />
        <hr className={dividerStyle} />

        <ExperienceSection experiences={data.experiences}>
          <TimelineChart items={timelineItems}>
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
    </SsgoiTransition>
  );
}
