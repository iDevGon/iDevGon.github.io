import { Typo } from '@idevgon/design-system';
import { EmailIcon, LinkIcon, PhoneIcon } from '@idevgon/icons';
import type { Profile } from '../../interfaces/resume';
import {
  githubListStyle,
  linkStyle,
  profileItemStyle,
  profileSectionStyle,
  sectionStyle,
} from './-styles';

export function ProfileSection({ profile }: { profile: Profile }) {
  return (
    <section className={sectionStyle}>
      <Typo variant="h1" asChild>
        <h1>{profile.name}</h1>
      </Typo>
      <div className={profileSectionStyle}>
        <Typo variant="body2" className={profileItemStyle}>
          <EmailIcon width={16} height={16} aria-hidden="true" />
          <a href={`mailto:${profile.email}`} className={linkStyle}>
            {profile.email}
          </a>
        </Typo>
        <Typo variant="body2" className={profileItemStyle}>
          <PhoneIcon width={16} height={16} aria-hidden="true" />
          <a href={`tel:${profile.phone}`} className={linkStyle}>
            {profile.phone}
          </a>
        </Typo>
        <Typo variant="body2" className={profileItemStyle}>
          <LinkIcon width={16} height={16} aria-hidden="true" />
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
