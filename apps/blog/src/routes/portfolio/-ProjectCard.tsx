import { Typo } from '@idevgon/design-system';
import { useState } from 'react';
import type { PortfolioProject } from '../../interfaces/portfolio';
import {
  dividerStyle,
  galleryImageStyle,
  galleryImageWrapperStyle,
  galleryPlaceholderStyle,
  highlightItemStyle,
  highlightListStyle,
  imageGalleryStyle,
  linkButtonStyle,
  linksRowStyle,
  metaGridStyle,
  metaLabelStyle,
  metaSectionStyle,
  projectContentStyle,
  projectDescStyle,
  projectHeaderStyle,
  projectItemStyle,
  projectPeriodStyle,
  projectSubtitleStyle,
  projectTitleStyle,
  roleStyle,
  techStackListStyle,
  techTagStyle,
  thumbnailPlaceholderStyle,
  thumbnailStyle,
  thumbnailWrapperStyle,
} from './-styles';

function formatPeriod(period: PortfolioProject['period']) {
  const end = period.end ?? '진행 중';
  return `${period.start} — ${end}`;
}

function ProjectThumbnail({ project }: { project: PortfolioProject }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={thumbnailWrapperStyle}>
        <div className={thumbnailPlaceholderStyle}>{project.title}</div>
      </div>
    );
  }

  return (
    <div className={thumbnailWrapperStyle}>
      <img
        src={project.thumbnail}
        alt={`${project.title} 스크린샷`}
        className={thumbnailStyle}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

function ImageGallery({ project }: { project: PortfolioProject }) {
  const [errorSet, setErrorSet] = useState<Set<number>>(new Set());

  if (project.images.length === 0) return null;

  const handleError = (index: number) => {
    setErrorSet((prev) => new Set(prev).add(index));
  };

  return (
    <div className={imageGalleryStyle}>
      {project.images.map((src, i) => (
        <div key={src} className={galleryImageWrapperStyle}>
          {errorSet.has(i) ? (
            <div className={galleryPlaceholderStyle}>Image {i + 1}</div>
          ) : (
            <img
              src={src}
              alt={`${project.title} 스크린샷 ${i + 1}`}
              className={galleryImageStyle}
              loading="lazy"
              onError={() => handleError(i)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className={projectItemStyle}>
      <ProjectThumbnail project={project} />

      <div className={projectContentStyle}>
        <div className={projectHeaderStyle}>
          <Typo variant="h2" asChild>
            <h2 className={projectTitleStyle}>{project.title}</h2>
          </Typo>
          <span className={projectSubtitleStyle}>{project.subtitle}</span>
          <span className={projectPeriodStyle}>
            {formatPeriod(project.period)} · <span className={roleStyle}>{project.role}</span>
          </span>
        </div>

        <Typo variant="body1" asChild>
          <p className={projectDescStyle}>{project.description}</p>
        </Typo>

        <div className={metaGridStyle}>
          <div className={metaSectionStyle}>
            <span className={metaLabelStyle}>Tech Stack</span>
            <div className={techStackListStyle}>
              {project.techStack.map((tech) => (
                <span key={tech} className={techTagStyle}>{tech}</span>
              ))}
            </div>
          </div>

          <div className={metaSectionStyle}>
            <span className={metaLabelStyle}>Highlights</span>
            <ul className={highlightListStyle}>
              {project.highlights.map((item) => (
                <li key={item} className={highlightItemStyle}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <ImageGallery project={project} />

        {project.links.length > 0 && (
          <div className={linksRowStyle}>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkButtonStyle}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <hr className={dividerStyle} />
    </article>
  );
}
