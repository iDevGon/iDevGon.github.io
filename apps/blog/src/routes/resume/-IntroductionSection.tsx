import { Typo } from '@idevgon/design-system';
import type { Introduction } from '../../interfaces/resume';
import {
  highlightCardStyle,
  highlightDescriptionStyle,
  highlightsWrapperStyle,
  introSummaryStyle,
  introSummaryWrapperStyle,
  sectionStyle,
} from './-styles';

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
