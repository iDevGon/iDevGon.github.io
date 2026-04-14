import { Typo } from '@idevgon/design-system';
import { useCallback, useEffect, useState } from 'react';
import type { PortfolioProject } from '../../interfaces/portfolio';
import {
  dividerStyle,
  galleryImageStyle,
  galleryImageWrapperStyle,
  galleryPlaceholderStyle,
  highlightItemStyle,
  highlightListStyle,
  imageGalleryStyle,
  lightboxCloseStyle,
  lightboxCounterStyle,
  lightboxImageStyle,
  lightboxNavStyle,
  lightboxOverlayStyle,
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
  statusBadgeStyle,
  statusDotStyle,
  techStackListStyle,
  techTagStyle,
  thumbnailPlaceholderStyle,
  thumbnailStyle,
  thumbnailWrapperStyle,
} from './-styles';

function formatPeriod(period: PortfolioProject['period'], hasStatus: boolean) {
  if (!period.end && hasStatus) return period.start;
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

function Lightbox({
  images,
  index,
  alt,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && index < images.length - 1)
        onNavigate(index + 1);
      if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1);
    },
    [onClose, onNavigate, index, images.length],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      role="dialog"
      className={lightboxOverlayStyle}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <button type="button" className={lightboxCloseStyle} onClick={onClose}>
        ×
      </button>

      {index > 0 && (
        <button
          type="button"
          className={lightboxNavStyle}
          style={{ left: '1.6rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index - 1);
          }}
        >
          ‹
        </button>
      )}

      <img
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        className={lightboxImageStyle}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      />

      {index < images.length - 1 && (
        <button
          type="button"
          className={lightboxNavStyle}
          style={{ right: '1.6rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index + 1);
          }}
        >
          ›
        </button>
      )}

      <span className={lightboxCounterStyle}>
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

function ImageGallery({ project }: { project: PortfolioProject }) {
  const [errorSet, setErrorSet] = useState<Set<number>>(new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (project.images.length === 0) return null;

  const handleError = (index: number) => {
    setErrorSet((prev) => new Set(prev).add(index));
  };

  const validImages = project.images.filter((_, i) => !errorSet.has(i));

  return (
    <>
      <div className={imageGalleryStyle}>
        {project.images.map((src, i) => (
          <button
            type="button"
            key={src}
            className={galleryImageWrapperStyle}
            onClick={() => !errorSet.has(i) && setLightboxIndex(i)}
          >
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
          </button>
        ))}
      </div>

      {lightboxIndex !== null && validImages.length > 0 && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          alt={`${project.title} 스크린샷`}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className={projectItemStyle}>
      <ProjectThumbnail project={project} />

      <div className={projectContentStyle}>
        <div className={projectHeaderStyle}>
          <Typo variant="h2" asChild>
            <h2 className={projectTitleStyle}>
              {project.links.length > 0 ? (
                <a
                  href={project.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h2>
          </Typo>
          <span className={projectSubtitleStyle}>{project.subtitle}</span>
          <span className={projectPeriodStyle}>
            {formatPeriod(project.period, !!project.status)} ·{' '}
            <span className={roleStyle}>{project.role}</span>
            {project.status && (
              <>
                {' · '}
                <span
                  className={statusBadgeStyle}
                  data-status={project.status}
                >
                  <span className={statusDotStyle} />
                  {project.status}
                </span>
              </>
            )}
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
                <span key={tech} className={techTagStyle}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={metaSectionStyle}>
            <span className={metaLabelStyle}>Highlights</span>
            <ul className={highlightListStyle}>
              {project.highlights.map((item) => (
                <li key={item} className={highlightItemStyle}>
                  {item}
                </li>
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
