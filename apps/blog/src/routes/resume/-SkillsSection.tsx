import { Typo } from '@idevgon/design-system';
import { sectionStyle, skillsWrapperStyle, skillTagStyle } from './-styles';

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
