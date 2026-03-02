import { Tag, Typo } from '@idevgon/design-system';
import { sectionStyle, skillsWrapperStyle } from './-styles';

export function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h2" asChild>
        <h2>기술</h2>
      </Typo>
      <div className={skillsWrapperStyle}>
        {skills.map((skill) => (
          <Typo asChild variant="body2" key={skill}>
            <Tag>{skill}</Tag>
          </Typo>
        ))}
      </div>
    </section>
  );
}
