import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { Container, Typo } from '@idevgon/design-system';
import {
  TimelineChart,
  type TimelineItem,
} from '../../components/TimelineChart';
import resumeData from '../../data/resume.json';
import type { ResumeData } from '../../interfaces/resume';
import {
  achievementListStyle,
  descriptionStyle,
  dividerStyle,
  experienceCardStyle,
  experienceCardWrapperStyle,
  githubListStyle,
  highlightCardStyle,
  highlightDescriptionStyle,
  highlightsWrapperStyle,
  introSummaryStyle,
  linkStyle,
  periodStyle,
  printPageStyle,
  profileSectionStyle,
  projectCardStyle,
  projectDescriptionStyle,
  projectsWrapperStyle,
  projectTitleStyle,
  sectionStyle,
  skillsWrapperStyle,
  skillTagStyle,
} from './styles';

export const Route = createFileRoute('/resume/')({
  component: RouteComponent,
});

const data = resumeData as ResumeData;

function formatPeriod(period: { start: string; end: string | null }) {
  return `${period.start} ~ ${period.end ?? '현재'}`;
}

// experiences 데이터를 TimelineChart 형식으로 변환
function experiencesToTimelineItems(
  experiences: ResumeData['experiences'],
): TimelineItem[] {
  return experiences.map((exp) => ({
    id: exp.company,
    label: exp.company,
    startDate: exp.period.start,
    endDate: exp.period.end,
  }));
}

function RouteComponent() {
  const timelineItems = experiencesToTimelineItems(data.experiences);

  return (
    <SsgoiTransition id="/resume">
      <Container className={printPageStyle}>
        {/* Profile Section */}
        <section className={sectionStyle}>
          <Typo variant="h1" asChild>
            <h1>{data.profile.name}</h1>
          </Typo>
          <div className={profileSectionStyle}>
            <Typo variant="body2">
              이메일:{' '}
              <a href={`mailto:${data.profile.email}`} className={linkStyle}>
                {data.profile.email}
              </a>
            </Typo>
            <Typo variant="body2">연락처: {data.profile.phone}</Typo>
            <Typo variant="body2">
              링크:{' '}
              <span className={githubListStyle}>
                {data.profile.github.map((gh) => (
                  <a
                    key={gh.url}
                    href={gh.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkStyle}
                  >
                    {gh.name}
                  </a>
                ))}
              </span>
            </Typo>
          </div>
        </section>

        <hr className={dividerStyle} />

        {/* Introduction Section */}
        <section className={sectionStyle}>
          <Typo variant="h2" asChild>
            <h2>{data.introduction.title}</h2>
          </Typo>
          <Typo variant="body1" asChild>
            <p className={introSummaryStyle}>
              {data.introduction.summary}
            </p>
          </Typo>

          <div className={highlightsWrapperStyle}>
            {data.introduction.highlights.map((highlight) => (
              <div key={highlight.title} className={highlightCardStyle}>
                <Typo variant="h3" asChild>
                  <h3>{highlight.title}</h3>
                </Typo>
                <Typo variant="body2" asChild>
                  <p className={highlightDescriptionStyle}>{highlight.description}</p>
                </Typo>
              </div>
            ))}
          </div>
        </section>

        <hr className={dividerStyle} />

        {/* Experience Section */}
        <section className={sectionStyle}>
          <Typo variant="h2" asChild>
            <h2>업무 경력</h2>
          </Typo>

          {/* Timeline Chart */}
          <TimelineChart items={timelineItems} title="경력 타임라인" />

          {data.experiences.map((exp) => (
            <div
              key={exp.company}
              className={`${experienceCardStyle} ${experienceCardWrapperStyle}`}
            >
              <Typo variant="h3" asChild>
                <h3>
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkStyle}
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
              </Typo>
              <Typo variant="body2" className={periodStyle}>
                {exp.position} | {formatPeriod(exp.period)}
              </Typo>
              <Typo variant="body2" asChild>
                <p className={descriptionStyle}>
                  {exp.description}
                </p>
              </Typo>

              <div className={projectsWrapperStyle}>
                {exp.projects.map((project) => (
                  <div key={project.title} className={projectCardStyle}>
                    <Typo variant="body1" asChild>
                      <h4 className={projectTitleStyle}>{project.title}</h4>
                    </Typo>
                    <Typo variant="caption" className={periodStyle}>
                      {formatPeriod(project.period)}
                    </Typo>
                    <Typo variant="body2" asChild>
                      <p className={projectDescriptionStyle}>
                        {project.description}
                      </p>
                    </Typo>
                    {project.achievements &&
                      project.achievements.length > 0 && (
                        <ul className={achievementListStyle}>
                          {project.achievements.map((achievement) => (
                            <li key={achievement}>
                              <Typo variant="body2">{achievement}</Typo>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <hr className={dividerStyle} />

        {/* Skills Section */}
        <section className={sectionStyle}>
          <Typo variant="h2" asChild>
            <h2>기술</h2>
          </Typo>
          <div className={skillsWrapperStyle}>
            {data.skills.map((skill) => (
              <span key={skill} className={skillTagStyle}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </Container>
    </SsgoiTransition>
  );
}
