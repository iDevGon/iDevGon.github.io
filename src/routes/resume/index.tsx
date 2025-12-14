import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';
import { css } from 'styled-system/css';
import { Container } from '../../components/Container';
import { Typo } from '../../components/Typo';
import resumeData from '../../data/resume.json';
import type { ResumeData } from '../../interfaces/resume';

export const Route = createFileRoute('/resume/')({
  component: RouteComponent,
});

const data = resumeData as ResumeData;

const sectionStyle = css({
  marginBottom: '4rem',
});

const profileSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginBottom: '2rem',
});

const linkStyle = css({
  color: 'blue.500',
  textDecoration: 'underline',
  _hover: { color: 'blue.700' },
});

const githubListStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

const highlightCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'gray.100',
  marginBottom: '1.2rem',
  _dark: { backgroundColor: 'gray.800' },
});

const experienceCardStyle = css({
  borderLeft: '3px solid',
  borderColor: 'blue.500',
  paddingLeft: '2rem',
  marginBottom: '3rem',
});

const projectCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'gray.50',
  marginBottom: '1.6rem',
  _dark: { backgroundColor: 'gray.900' },
});

const achievementListStyle = css({
  listStyleType: 'disc',
  paddingLeft: '2rem',
  marginTop: '0.8rem',
});

const skillTagStyle = css({
  display: 'inline-block',
  padding: '0.4rem 1.2rem',
  borderRadius: '2rem',
  backgroundColor: 'blue.100',
  color: 'blue.800',
  fontSize: '1.4rem',
  marginRight: '0.8rem',
  marginBottom: '0.8rem',
  _dark: { backgroundColor: 'blue.900', color: 'blue.100' },
});

const periodStyle = css({
  color: 'gray.500',
  fontSize: '1.4rem',
});

const dividerStyle = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'gray.200',
  margin: '3rem 0',
  _dark: { borderColor: 'gray.700' },
});

// Timeline Chart Styles
const timelineContainerStyle = css({
  marginTop: '2rem',
  marginBottom: '3rem',
});

const timelineChartStyle = css({
  position: 'relative',
  height: '120px',
  backgroundColor: 'gray.50',
  borderRadius: '0.8rem',
  overflow: 'hidden',
  _dark: { backgroundColor: 'gray.900' },
});

const timelineBarStyle = css({
  position: 'absolute',
  height: '40px',
  borderRadius: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'default',
  _hover: {
    transform: 'scaleY(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
});

const timelineYearMarkersStyle = css({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  height: '30px',
  display: 'flex',
  alignItems: 'flex-end',
  borderTop: '1px solid',
  borderColor: 'gray.200',
  _dark: { borderColor: 'gray.700' },
});

const yearMarkerStyle = css({
  position: 'absolute',
  fontSize: '1.1rem',
  color: 'gray.500',
  transform: 'translateX(-50%)',
});

const timelineLegendStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.6rem',
  marginTop: '1.2rem',
});

const legendItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

const legendColorStyle = css({
  width: '16px',
  height: '16px',
  borderRadius: '0.4rem',
});

const COMPANY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function parseDate(dateStr: string): Date {
  const [year, month] = dateStr.split('.').map(Number);
  return new Date(year, (month || 1) - 1);
}

function getMonthsDiff(start: Date, end: Date): number {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
}

function formatPeriod(period: { start: string; end: string | null }) {
  return `${period.start} ~ ${period.end ?? '현재'}`;
}

function ExperienceTimeline() {
  const now = new Date();
  const experiences = data.experiences;

  // 전체 기간 계산
  const allStartDates = experiences.map((exp) => parseDate(exp.period.start));
  const earliestStart = new Date(
    Math.min(...allStartDates.map((d) => d.getTime())),
  );
  const totalMonths = getMonthsDiff(earliestStart, now);

  // 연도 마커 생성
  const startYear = earliestStart.getFullYear();
  const endYear = now.getFullYear();
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }

  return (
    <div className={timelineContainerStyle}>
      <Typo variant="body2" asChild>
        <p style={{ marginBottom: '1rem', color: 'gray' }}>📊 경력 타임라인</p>
      </Typo>

      <div className={timelineChartStyle}>
        {/* Experience Bars */}
        {experiences.map((exp, idx) => {
          const startDate = parseDate(exp.period.start);
          const endDate = exp.period.end ? parseDate(exp.period.end) : now;

          const startOffset = getMonthsDiff(earliestStart, startDate);
          const duration = getMonthsDiff(startDate, endDate);

          const leftPercent = (startOffset / totalMonths) * 100;
          const widthPercent = (duration / totalMonths) * 100;

          const yearsWorked = (duration / 12).toFixed(1);

          return (
            <div
              key={exp.company}
              className={timelineBarStyle}
              style={{
                left: `${leftPercent}%`,
                width: `${Math.max(widthPercent, 5)}%`,
                top: `${20 + idx * 45}px`,
                backgroundColor: COMPANY_COLORS[idx % COMPANY_COLORS.length],
              }}
              title={`${exp.company}: ${formatPeriod(exp.period)} (${yearsWorked}년)`}
            >
              {widthPercent > 15 && <span>{exp.company}</span>}
            </div>
          );
        })}

        {/* Year Markers */}
        <div className={timelineYearMarkersStyle}>
          {years.map((year) => {
            const yearStart = new Date(year, 0);
            const offset = getMonthsDiff(earliestStart, yearStart);
            const leftPercent = (offset / totalMonths) * 100;

            return (
              <span
                key={year}
                className={yearMarkerStyle}
                style={{ left: `${Math.max(leftPercent, 2)}%` }}
              >
                {year}
              </span>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={timelineLegendStyle}>
        {experiences.map((exp, idx) => {
          const startDate = parseDate(exp.period.start);
          const endDate = exp.period.end ? parseDate(exp.period.end) : now;
          const duration = getMonthsDiff(startDate, endDate);
          const yearsWorked = (duration / 12).toFixed(1);

          return (
            <div key={exp.company} className={legendItemStyle}>
              <span
                className={legendColorStyle}
                style={{
                  backgroundColor: COMPANY_COLORS[idx % COMPANY_COLORS.length],
                }}
              />
              <Typo variant="caption">
                {exp.company} ({yearsWorked}년)
              </Typo>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RouteComponent() {
  return (
    <SsgoiTransition id="/resume">
      <Container>
        {/* Profile Section */}
        <section className={sectionStyle}>
          <Typo variant="h1" asChild>
            <h1>{data.profile.name}</h1>
          </Typo>
          <div className={profileSectionStyle}>
            <Typo variant="body2">
              📧 이메일:{' '}
              <a href={`mailto:${data.profile.email}`} className={linkStyle}>
                {data.profile.email}
              </a>
            </Typo>
            <Typo variant="body2">📞 연락처: {data.profile.phone}</Typo>
            <Typo variant="body2">
              📓 Github:{' '}
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
            <p style={{ marginTop: '1.6rem', lineHeight: '1.8' }}>
              {data.introduction.summary}
            </p>
          </Typo>

          <div style={{ marginTop: '2.4rem' }}>
            {data.introduction.highlights.map((highlight) => (
              <div key={highlight.title} className={highlightCardStyle}>
                <Typo variant="h3" asChild>
                  <h3>{highlight.title}</h3>
                </Typo>
                <Typo variant="body2" asChild>
                  <p style={{ marginTop: '0.8rem' }}>{highlight.description}</p>
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
          <ExperienceTimeline />

          {data.experiences.map((exp) => (
            <div
              key={exp.company}
              className={experienceCardStyle}
              style={{ marginTop: '2.4rem' }}
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
                {exp.position} | 📅 {formatPeriod(exp.period)}
              </Typo>
              <Typo variant="body2" asChild>
                <p style={{ marginTop: '0.8rem', color: 'gray' }}>
                  {exp.description}
                </p>
              </Typo>

              <div style={{ marginTop: '2rem' }}>
                {exp.projects.map((project) => (
                  <div key={project.title} className={projectCardStyle}>
                    <Typo variant="body1" asChild>
                      <h4 style={{ fontWeight: 'bold' }}>{project.title}</h4>
                    </Typo>
                    <Typo variant="caption" className={periodStyle}>
                      📅 {formatPeriod(project.period)}
                    </Typo>
                    <Typo variant="body2" asChild>
                      <p style={{ marginTop: '0.8rem' }}>
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
          <div style={{ marginTop: '1.6rem' }}>
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
