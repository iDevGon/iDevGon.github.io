import { Typo } from '@idevgon/design-system';
import type { Experience } from '../../interfaces/resume';
import {
  achievementListStyle,
  descriptionStyle,
  experienceCardStyle,
  experienceCardWrapperStyle,
  linkStyle,
  periodStyle,
  projectCardStyle,
  projectDescriptionStyle,
  projectsWrapperStyle,
  projectTitleStyle,
  sectionStyle,
} from './-styles';
import { formatPeriod } from './-utils';

function renderTextWithLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match)
      return (
        <a
          key={part}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyle}
        >
          {match[1]}
        </a>
      );
    return part;
  });
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
              <Typo variant="body2">{renderTextWithLinks(achievement)}</Typo>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div
      id={`experience-${experience.company}`}
      className={`${experienceCardStyle} ${experienceCardWrapperStyle}`}
    >
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

export function ExperienceSection({
  experiences,
  children,
}: {
  experiences: Experience[];
  children?: React.ReactNode;
}) {
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
