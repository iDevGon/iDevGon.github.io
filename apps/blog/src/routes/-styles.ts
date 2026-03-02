import { css } from 'styled-system/css';

export const pageStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: '-6rem',
});

export const heroStyle = css({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  animation: 'fadeInUp 0.6s ease-out',
});

export const heroInnerStyle = css({
  display: 'flex',
  flexDirection: { base: 'column', desktop: 'row' },
  alignItems: { base: 'flex-start', desktop: 'center' },
  gap: { base: '0', desktop: '2rem' },
});

export const heroTextStyle = css({
  flex: { base: 1, desktop: 'none' },
  display: 'flex',
  flexDirection: 'column',
});

export const avatarStyle = css({
  width: { base: '16rem', tablet: '20rem' },
  height: { base: '16rem', tablet: '20rem' },
  borderRadius: '50%',
  marginBottom: { base: '2rem', desktop: '0' },
  objectFit: 'cover',
  border: '3px solid',
  borderColor: 'border',
  flexShrink: 0,
  order: { base: 0, desktop: 1 },
});

export const terminalPromptStyle = css({
  fontSize: { base: '1.3rem', tablet: '1.4rem' },
  color: 'textMuted',
  fontFamily: '{fonts.mono}',
  marginBottom: '1.6rem',
  letterSpacing: '0.02em',
});

export const greetingStyle = css({
  fontSize: { base: '2rem', tablet: '3rem' },
  color: 'primary',
  fontWeight: 600,
  marginBottom: '1.2rem',
  letterSpacing: '0.02em',
});

export const nameStyle = css({
  fontSize: { base: '3.2rem', tablet: '4.8rem' },
  fontWeight: 800,
  lineHeight: 1.1,
  color: 'textPrimary',
  marginBottom: '1.6rem',
  textWrap: 'balance',
  letterSpacing: '-0.03em',
  wordBreak: 'auto-phrase',
});

export const nameHighlight = css({
  color: 'primary',
});

export const descriptionStyle = css({
  fontSize: { base: '1.5rem', tablet: '1.8rem' },
  color: 'textSecondary',
  lineHeight: 1.7,
  maxWidth: '56rem',
  marginBottom: '3.2rem',
});

export const cursorStyle = css({
  display: 'inline-block',
  width: '2px',
  height: '1em',
  backgroundColor: 'primary',
  marginLeft: '0.2rem',
  verticalAlign: 'text-bottom',
  animation: 'blink 1s step-end infinite',
});

export const buttonGroupStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});
