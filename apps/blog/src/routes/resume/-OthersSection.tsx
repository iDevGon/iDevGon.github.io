import { Typo } from '@idevgon/design-system';
import type { Other } from '../../interfaces/resume';
import { linkStyle, othersItemStyle, othersListStyle, sectionStyle } from './-styles';

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
