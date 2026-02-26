import { Typo } from '@idevgon/design-system';
import type { Experience, Introduction, Profile } from '../../interfaces/resume';
import { formatPeriod } from './-utils';
import {
  achievementListStyle,
  descriptionStyle,
  experienceCardStyle,
  experienceCardWrapperStyle,
  githubListStyle,
  highlightCardStyle,
  highlightDescriptionStyle,
  highlightsWrapperStyle,
  introSummaryStyle,
  linkStyle,
  periodStyle,
  profileSectionStyle,
  projectCardStyle,
  projectDescriptionStyle,
  projectsWrapperStyle,
  projectTitleStyle,
  sectionStyle,
  skillsWrapperStyle,
  skillTagStyle,
} from './-styles';

export function ProfileSection({ profile }: { profile: Profile }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h1" asChild>
        <h1>{profile.name}</h1>
      </Typo>
      <div className={profileSectionStyle}>
        <Typo variant="body2">
          이메일:{' '}
          <a href={`mailto:${profile.email}`} className={linkStyle}>
            {profile.email}
          </a>
        </Typo>
        <Typo variant="body2">연락처: {profile.phone}</Typo>
        <Typo variant="body2">
          링크:{' '}
          <span className={githubListStyle}>
            {profile.github.map((gh) => (
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
  );
}

export function IntroductionSection({ introduction }: { introduction: Introduction }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>{introduction.title}</h2>
      </Typo>
      <Typo variant="body1" asChild>
        <p className={introSummaryStyle}>{introduction.summary}</p>
      </Typo>

      <div className={highlightsWrapperStyle}>
        {introduction.highlights.map((highlight) => (
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
  );
}

function ProjectCard({ project }: { project: Experience['projects'][number] }) {
  return (
    <div className={projectCardStyle}>
      <Typo variant="body1" asChild>
        <h4 className={projectTitleStyle}>{project.title}</h4>
      </Typo>
      <Typo variant="caption" className={periodStyle}>
        {formatPeriod(project.period)}
      </Typo>
      <Typo variant="body2" asChild>
        <p className={projectDescriptionStyle}>{project.description}</p>
      </Typo>
      {project.achievements && project.achievements.length > 0 && (
        <ul className={achievementListStyle}>
          {project.achievements.map((achievement) => (
            <li key={achievement}>
              <Typo variant="body2">{achievement}</Typo>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className={`${experienceCardStyle} ${experienceCardWrapperStyle}`}>
      <Typo variant="h3" asChild>
        <h3>
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              {experience.company}
            </a>
          ) : (
            experience.company
          )}
        </h3>
      </Typo>
      <Typo variant="body2" className={periodStyle}>
        {experience.position} | {formatPeriod(experience.period)}
      </Typo>
      <Typo variant="body2" asChild>
        <p className={descriptionStyle}>{experience.description}</p>
      </Typo>

      <div className={projectsWrapperStyle}>
        {experience.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection({ experiences, children }: { experiences: Experience[]; children?: React.ReactNode }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>업무 경력</h2>
      </Typo>

      {children}

      {experiences.map((exp) => (
        <ExperienceCard key={exp.company} experience={exp} />
      ))}
    </section>
  );
}

export function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>기술</h2>
      </Typo>
      <div className={skillsWrapperStyle}>
        {skills.map((skill) => (
          <span key={skill} className={skillTagStyle}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
