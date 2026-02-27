import { Typo } from '@idevgon/design-system';
import { EmailIcon, LinkIcon, PhoneIcon } from '@idevgon/icons';
import type {
  Certification,
  Education,
  Experience,
  Introduction,
  Other,
  Profile,
} from '../../interfaces/resume';
import {
  achievementListStyle,
  certificationCardStyle,
  certificationInfoStyle,
  descriptionStyle,
  educationCardStyle,
  educationInfoStyle,
  experienceCardStyle,
  experienceCardWrapperStyle,
  githubListStyle,
  highlightCardStyle,
  highlightDescriptionStyle,
  highlightsWrapperStyle,
  introSummaryStyle,
  introSummaryWrapperStyle,
  linkStyle,
  othersItemStyle,
  othersListStyle,
  periodStyle,
  profileItemStyle,
  profileSectionStyle,
  projectCardStyle,
  projectDescriptionStyle,
  projectsWrapperStyle,
  projectTitleStyle,
  sectionStyle,
  skillsWrapperStyle,
  skillTagStyle,
} from './-styles';
import { formatPeriod } from './-utils';

export function ProfileSection({ profile }: { profile: Profile }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h1" asChild>
        <h1>{profile.name}</h1>
      </Typo>
      <div className={profileSectionStyle}>
        <Typo variant="body2" className={profileItemStyle}>
          <EmailIcon width={16} height={16} />
          <a href={`mailto:${profile.email}`} className={linkStyle}>
            {profile.email}
          </a>
        </Typo>
        <Typo variant="body2" className={profileItemStyle}>
          <PhoneIcon width={16} height={16} />
          <a href={`tel:${profile.phone}`} className={linkStyle}>
            {profile.phone}
          </a>
        </Typo>
        <Typo variant="body2" className={profileItemStyle}>
          <LinkIcon width={16} height={16} />
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

export function IntroductionSection({
  introduction,
}: {
  introduction: Introduction;
}) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>{introduction.title}</h2>
      </Typo>
      <div className={introSummaryWrapperStyle}>
        {introduction.summary.map((paragraph) => (
          <Typo key={paragraph} variant="body1" asChild>
            <p className={introSummaryStyle}>{paragraph}</p>
          </Typo>
        ))}
      </div>

      <div className={highlightsWrapperStyle}>
        {introduction.highlights.map((highlight) => (
          <div key={highlight.title} className={highlightCardStyle}>
            <Typo variant="h3" asChild>
              <h3>{highlight.title}</h3>
            </Typo>
            <Typo variant="body2" asChild>
              <p className={highlightDescriptionStyle}>
                {highlight.description}
              </p>
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

export function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>기술</h2>
      </Typo>
      <div className={skillsWrapperStyle}>
        {skills.map((skill) => (
          <Typo asChild variant="body2" key={skill}>
            <span className={skillTagStyle}>{skill}</span>
          </Typo>
        ))}
      </div>
    </section>
  );
}

export function EducationSection({ education }: { education: Education[] }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>학력</h2>
      </Typo>
      {education.map((edu) => (
        <div key={`${edu.school}-${edu.major}`} className={educationCardStyle}>
          <Typo variant="h3" asChild>
            <h3>{edu.school}</h3>
          </Typo>
          <Typo variant="body2" className={educationInfoStyle}>
            {edu.major}
          </Typo>
          <Typo variant="caption" className={periodStyle}>
            {edu.period.start} ~ {edu.period.end ?? '현재'}
            {edu.graduated && ' (졸업)'}
          </Typo>
        </div>
      ))}
    </section>
  );
}

export function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>자격증</h2>
      </Typo>
      {certifications.map((cert) => (
        <div key={cert.name} className={certificationCardStyle}>
          <Typo variant="h3" asChild>
            <h3>{cert.name}</h3>
          </Typo>
          <Typo variant="body2" className={certificationInfoStyle}>
            {cert.issuer} | {cert.date} (발급)
          </Typo>
        </div>
      ))}
    </section>
  );
}

export function OthersSection({ others }: { others: Other[] }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>기타</h2>
      </Typo>
      <div className={othersListStyle}>
        {others.map((item) => (
          <div key={item.title} className={othersItemStyle}>
            {item.url ? (
              <Typo variant="body2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  {item.title}
                </a>
              </Typo>
            ) : (
              <Typo variant="body2">{item.title}</Typo>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
