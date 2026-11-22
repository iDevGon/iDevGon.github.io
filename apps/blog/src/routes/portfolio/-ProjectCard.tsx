import { useRef, useState } from 'react';
import type { PortfolioProject } from '../../interfaces/portfolio';
import {
  cardStyle,
  closeButton,
  descriptionStyle,
  detailsStyle,
  dialogStyle,
  galleryActions,
  galleryCaption,
  galleryFrame,
  galleryImage,
  linkStyle,
  pairedPreview,
  pairedPreviews,
  previewButton,
  previewHint,
  projectHeading,
  projectSubtitle,
  statusStyle,
  tagList,
} from './-styles';

export function ProjectCard({
  project,
  featured = false,
}: {
  project: PortfolioProject;
  featured?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [cover] = project.images;
  const currentImage = project.images[index];
  const [width, height] = currentImage.dimensions ?? [1440, 900];
  const hasPairedPreviews = project.images.some((image) => image.previewLabel);

  function openGallery(imageIndex: number) {
    setIndex(imageIndex);
    dialog.current?.showModal();
  }

  return (
    <article className={cardStyle} data-project={project.id}>
      {hasPairedPreviews ? (
        <div className={pairedPreviews}>
          {project.images.map((image, imageIndex) => {
            if (!image.previewLabel) return null;
            const [previewWidth, previewHeight] = image.dimensions ?? [
              1440, 900,
            ];
            return (
              <button
                key={image.src}
                type="button"
                className={pairedPreview}
                onClick={() => openGallery(imageIndex)}
                aria-label={`${project.title} ${image.previewLabel} 화면 확대`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={previewWidth}
                  height={previewHeight}
                  loading="lazy"
                  decoding="async"
                />
                <span aria-hidden="true">
                  {image.previewLabel} <span>↗</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <button
          type="button"
          className={previewButton}
          onClick={() => openGallery(0)}
          aria-label={`${project.title} 스크린샷 ${project.images.length}장 보기`}
        >
          <img
            src={cover.src}
            alt={cover.alt}
            width={1440}
            height={900}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className={previewHint} aria-hidden="true">
            화면 보기 <span>↗</span>
          </span>
        </button>
      )}

      <div>
        <span className={statusStyle} data-live={featured || undefined}>
          {project.status}
        </span>
        <h3 className={projectHeading}>{project.title}</h3>
        <p className={projectSubtitle}>{project.subtitle}</p>
        <p className={descriptionStyle}>{project.description}</p>
      </div>

      <ul className={tagList} aria-label="기술 스택">
        {project.techStack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {project.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyle}
          data-primary={featured || undefined}
          aria-label={`${project.title} ${link.label} (새 탭)`}
        >
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}

      <details className={detailsStyle}>
        <summary>어떻게 만들었는지 보기</summary>
        <p>
          {project.role} · {project.period.start}
          {project.period.end && `–${project.period.end}`}
        </p>
        <ul>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <dialog
        ref={dialog}
        className={dialogStyle}
        data-portrait={height > width || undefined}
        aria-label={`${project.title} 스크린샷`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' && index > 0) {
            event.preventDefault();
            setIndex(index - 1);
          }
          if (event.key === 'ArrowRight' && index < project.images.length - 1) {
            event.preventDefault();
            setIndex(index + 1);
          }
        }}
      >
        <div className={galleryFrame}>
          <button
            type="button"
            className={closeButton}
            onClick={() => dialog.current?.close()}
            aria-label="스크린샷 닫기"
          >
            ×
          </button>
          <img
            className={galleryImage}
            src={currentImage.src}
            alt={currentImage.alt}
            width={width}
            height={height}
            loading="lazy"
          />
          <div className={galleryCaption}>
            <p aria-live="polite">
              {currentImage.alt}{' '}
              <span>
                {index + 1} / {project.images.length}
              </span>
            </p>
            {project.images.length > 1 && (
              <div className={galleryActions}>
                <button
                  type="button"
                  onClick={() => setIndex(index - 1)}
                  disabled={index === 0}
                  aria-label="이전 스크린샷"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(index + 1)}
                  disabled={index === project.images.length - 1}
                  aria-label="다음 스크린샷"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </article>
  );
}
