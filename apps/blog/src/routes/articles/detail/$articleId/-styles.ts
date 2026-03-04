import { css } from 'styled-system/css';

export const articleLayoutStyle = css({
  maxWidth: '72rem',
  marginInline: 'auto',
});

export const containerPaddingStyle = css({
  padding: '4',
  animation: 'fadeInUp 0.6s ease-out',
});

export const notFoundTitleStyle = css({
  fontSize: '2.4rem',
  fontWeight: 'bold',
});

export const notFoundBodyStyle = css({
  marginTop: '4',
  color: 'textSecondary',
});

export const notFoundLinkStyle = css({
  display: 'inline-block',
  marginTop: '4',
  color: 'primary',
  _hover: { textDecoration: 'underline' },
});

export const giscusWrapperStyle = css({
  maxWidth: '72rem',
  marginInline: 'auto',
  marginTop: '4.8rem',
  paddingTop: '3.2rem',
  borderTop: '1px solid',
  borderColor: 'border',
});

export const backLinkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginBottom: '2.4rem',
  color: 'textMuted',
  fontSize: '1.4rem',
  fontFamily: '{fonts.mono}',
  transition: 'color 0.2s',
  _hover: { color: 'primary' },
});

export const articleTitleStyle = css({
  fontSize: { base: '2.6rem', tablet: '3.4rem' },
  fontWeight: 'bold',
  lineHeight: '1.25',
  marginBottom: '2rem',
  textWrap: 'balance',
  letterSpacing: '-0.03em',
  wordBreak: 'keep-all',
});

export const metaStyle = css({
  gap: { base: '0.8rem', tablet: '1.6rem' },
  color: 'textMuted',
  fontSize: { base: '1.3rem', tablet: '1.4rem' },
  fontFamily: '{fonts.mono}',
  letterSpacing: '0.01em',
});

export const coverImageWrapperStyle = css({
  marginBottom: '2.8rem',
  borderRadius: '{radii.lg}',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: 'border',
  aspectRatio: '2 / 1',
  animation: 'fadeIn 0.8s ease-out',
});

export const coverImageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

export const articleHeaderStyle = css({
  marginBottom: { base: '3.2rem', tablet: '4.8rem' },
  paddingBottom: '2.4rem',
  borderBottom: '1px solid',
  borderColor: 'border',
});

/* ── Page layout ── */

export const articlePageStyle = css({
  tablet: {
    display: 'flex',
    flexDirection: 'column',
  },
  desktop: {
    flexDirection: 'row',
    gap: '2rem',
    maxWidth: '1440px',
    marginInline: 'auto',
  },
});

export const contentAreaStyle = css({
  desktop: {
    flex: 1,
    minWidth: 0,
  },
});

/* ── Article Navigation ── */

export const articleNavStyle = css({
  display: 'flex',
  flexDirection: { base: 'column', tablet: 'row' },
  gap: '1.6rem',
  maxWidth: '72rem',
  marginInline: 'auto',
  marginTop: '4.8rem',
});

export const articleNavLinkStyle = css({
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  padding: '2rem',
  borderRadius: '{radii.lg}',
  border: '1px solid',
  borderColor: 'border',
  overflow: 'hidden',
  textDecoration: 'none',
  transition: 'border-color 0.2s, background-color 0.2s',
  _hover: {
    borderColor: 'primary',
    backgroundColor: 'surfaceHover',
    '& > [data-cover-bg]': { opacity: 0.18 },
  },
});

export const articleNavCoverBgStyle = css({
  position: 'absolute',
  inset: 0,
  backgroundImage: 'var(--cover-image)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  maskImage: 'linear-gradient(to right, transparent 20%, black 80%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 20%, black 80%)',
  opacity: 0.1,
  transition: 'opacity 0.3s ease',
  pointerEvents: 'none',
});

export const articleNavContentStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const articleNavLabelStyle = css({
  fontSize: '1.2rem',
  fontFamily: '{fonts.mono}',
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const articleNavTitleStyle = css({
  fontSize: '1.5rem',
  fontWeight: 'semibold',
  color: 'textPrimary',
  lineHeight: '1.4',
  wordBreak: 'keep-all',
});

export const articleNavExcerptStyle = css({
  fontSize: '1.3rem',
  color: 'textMuted',
  lineHeight: '1.5',
  lineClamp: 2,
});

/* ── Table of Contents ── */

export const tocAsideStyle = css({
  display: 'none',
  tablet: {
    display: 'block',
    order: -1,
    maxWidth: '768px',
    width: '100%',
    marginInline: 'auto',
    paddingInline: '2.4rem',
    paddingBlock: '2.4rem',
    borderBottom: '1px solid',
    borderColor: 'border',
  },
  desktop: {
    order: 0,
    maxWidth: 'unset',
    marginInline: 0,
    paddingInline: 0,
    paddingBlock: 0,
    paddingTop: '3.2rem',
    borderBottom: 'none',
    position: 'sticky',
    top: '10rem',
    width: '16rem',
    flexShrink: 0,
    alignSelf: 'flex-start',
    maxHeight: 'calc(100vh - 14rem)',
    overflowY: 'auto',
  },
});

export const tocTitleStyle = css({
  fontSize: '1.3rem',
  fontWeight: 'semibold',
  color: 'textMuted',
  marginBottom: '1rem',
  fontFamily: '{fonts.mono}',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const tocListStyle = css({
  listStyle: 'none',
  padding: '0',
  margin: '0',
});

export const tocItemStyle = css({
  marginBottom: '0.2rem',
});

export const tocItemIndentedStyle = css({
  marginBottom: '0.2rem',
  paddingLeft: '1.2rem',
});

export const tocLinkStyle = css({
  display: 'block',
  fontSize: '1.4rem',
  lineHeight: '1.5',
  padding: '0.4rem 0',
  paddingLeft: '0.8rem',
  color: 'textMuted',
  textDecoration: 'none',
  borderLeft: '2px solid transparent',
  transition: 'color 0.2s, border-color 0.2s',
  _hover: {
    color: 'textPrimary',
  },
});

export const tocActiveLinkStyle = css({
  display: 'block',
  fontSize: '1.4rem',
  lineHeight: '1.5',
  padding: '0.4rem 0',
  paddingLeft: '0.8rem',
  color: 'primary',
  textDecoration: 'none',
  fontWeight: 'medium',
  borderLeft: '2px solid',
  borderColor: 'primary',
  transition: 'color 0.2s, border-color 0.2s',
});
