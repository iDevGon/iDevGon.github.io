import { Typo } from '@idevgon/design-system';
import type { Certification } from '../../interfaces/resume';
import {
  certificationCardStyle,
  certificationInfoStyle,
  sectionStyle,
} from './-styles';

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
