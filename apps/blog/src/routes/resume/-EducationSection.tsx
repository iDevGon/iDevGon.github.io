import { Typo } from '@idevgon/design-system';
import type { Education } from '../../interfaces/resume';
import {
  educationCardStyle,
  educationInfoStyle,
  sectionStyle,
} from './-styles';

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
            {edu.major} | {edu.period.start} ~ {edu.period.end ?? '현재'}
            {edu.graduated && ' (졸업)'}
          </Typo>
        </div>
      ))}
    </section>
  );
}
