import { css } from 'styled-system/css';

export const heroStyle = css({
  flex: 1,
  display: 'grid',
  alignItems: 'center',
  paddingBlock: { base: '5.6rem 6.4rem', tablet: '7.2rem 9.6rem' },
});

export const heroInnerStyle = css({
  display: 'grid',
  gridTemplateColumns: { tablet: 'minmax(0, 1fr) auto' },
  alignItems: 'center',
  gap: { base: '3.2rem', tablet: '4rem', desktop: '8rem' },
  width: '100%',
  maxWidth: '96rem',
  marginInline: 'auto',
});

export const avatarStyle = css({
  display: 'block',
  width: { base: '10.4rem', tablet: '21.6rem', desktop: '28rem' },
  height: 'auto',
  aspectRatio: '1',
  borderRadius: { base: '0.6rem', tablet: '0.8rem' },
  border: '1px solid',
  borderColor: 'border',
  objectFit: 'cover',
  gridRow: { base: 1, tablet: 'auto' },
});

export const careerStyle = css({
  color: 'primary',
  fontSize: { base: '1.5rem', tablet: '1.7rem' },
  fontWeight: 650,
  marginBottom: '1.6rem',
});

export const nameStyle = css({
  fontSize: 'clamp(3.8rem, 6.6vw, 7.6rem)',
  fontWeight: 700,
  fontFamily: '"Gowun Batang", Batang, "AppleMyungjo", serif',
  lineHeight: 1.14,
  letterSpacing: '-0.055em',
  color: 'textPrimary',
  marginBottom: '2rem',
  wordBreak: 'keep-all',
});

export const descriptionStyle = css({
  fontSize: { base: '1.7rem', tablet: '1.9rem' },
  color: 'textSecondary',
  lineHeight: 1.7,
  maxWidth: '34ch',
  wordBreak: 'keep-all',
});

export const quickLinksStyle = css({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.4rem 2.4rem',
  marginTop: '3.2rem',
  paddingTop: '1.2rem',
  borderTop: '1px solid var(--colors-border)',
  width: 'fit-content',
  '& a': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    minHeight: '4.4rem',
    fontSize: '1.5rem',
    fontWeight: 650,
    _hover: { textDecoration: 'underline', textUnderlineOffset: '0.3em' },
  },
  '& a:first-child': { color: 'primary' },
});
