import { css } from 'styled-system/css';

export const titleStyle = css({
  fontSize: { base: '2.4rem', tablet: '2.8rem' },
  fontWeight: 700,
  color: 'textPrimary',
  letterSpacing: '-0.02em',
  textWrap: 'balance',
});

export const pageStyle = css({
  animation: 'fadeInUp 0.6s ease-out',
});

export const heroStyle = css({
  marginBottom: { base: '4rem', tablet: '6rem' },
});

export const heroTitleStyle = css({
  fontSize: { base: '3.2rem', tablet: '4.8rem' },
  fontWeight: 800,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  color: 'textPrimary',
});

export const heroDescStyle = css({
  marginTop: '1.2rem',
  color: 'textSecondary',
  fontSize: { base: '1.5rem', tablet: '1.7rem' },
  lineHeight: 1.6,
  maxWidth: '56rem',
});

export const projectListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: { base: '6rem', tablet: '8rem' },
});

export const projectItemStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: { base: '2.4rem', tablet: '3.2rem' },
});

export const thumbnailWrapperStyle = css({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: '1.2rem',
  overflow: 'hidden',
  backgroundColor: 'surface',
  border: '1px solid',
  borderColor: 'border',
});

export const thumbnailStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  _hover: {
    transform: 'scale(1.03)',
  },
});

export const thumbnailPlaceholderStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'textMuted',
  fontSize: '1.4rem',
});

export const projectContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const projectHeaderStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const projectTitleStyle = css({
  fontSize: { base: '2.4rem', tablet: '3.2rem' },
  fontWeight: 700,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  color: 'textPrimary',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    _hover: {
      color: 'primary',
    },
  },
});

export const projectSubtitleStyle = css({
  fontSize: { base: '1.5rem', tablet: '1.7rem' },
  color: 'primary',
  fontWeight: 600,
});

export const projectPeriodStyle = css({
  fontSize: '1.3rem',
  color: 'textMuted',
  fontWeight: 500,
});

export const projectDescStyle = css({
  fontSize: { base: '1.5rem', tablet: '1.6rem' },
  lineHeight: 1.8,
  color: 'textSecondary',
  whiteSpace: 'pre-line',
});

export const metaGridStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', tablet: '1fr 1fr' },
  gap: { base: '2.4rem', tablet: '3.2rem' },
});

export const metaSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const metaLabelStyle = css({
  fontSize: '1.2rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'textMuted',
});

export const techStackListStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.6rem',
});

export const techTagStyle = css({
  fontSize: '1.3rem',
  fontWeight: 500,
  padding: '0.4rem 1rem',
  borderRadius: '0.5rem',
  backgroundColor: 'tagBg',
  color: 'tagText',
  lineHeight: 1.4,
});

export const highlightListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  listStyleType: 'none',
  padding: 0,
});

export const highlightItemStyle = css({
  fontSize: { base: '1.4rem', tablet: '1.5rem' },
  lineHeight: 1.7,
  color: 'textSecondary',
  paddingLeft: '1.6rem',
  position: 'relative',
  _before: {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '0.7em',
    width: '0.6rem',
    height: '0.6rem',
    borderRadius: '50%',
    backgroundColor: 'primary',
  },
});

export const linksRowStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

export const linkButtonStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontSize: '1.4rem',
  fontWeight: 600,
  padding: '0.8rem 1.8rem',
  borderRadius: '0.8rem',
  border: '1px solid',
  borderColor: 'primary',
  color: 'primary',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  _hover: {
    backgroundColor: 'primary',
    color: 'white',
  },
});

export const roleStyle = css({
  fontSize: '1.3rem',
  fontWeight: 500,
  color: 'textMuted',
  fontStyle: 'italic',
});

export const imageGalleryStyle = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', tablet: 'repeat(3, 1fr)' },
  gap: '1.2rem',
  marginTop: '0.8rem',
});

export const galleryImageWrapperStyle = css({
  position: 'relative',
  aspectRatio: '16 / 9',
  borderRadius: '0.8rem',
  overflow: 'hidden',
  backgroundColor: 'surface',
  border: '1px solid',
  borderColor: 'border',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  _hover: {
    borderColor: 'primary',
  },
});

export const galleryImageStyle = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const galleryPlaceholderStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'textMuted',
  fontSize: '1.2rem',
});

export const dividerStyle = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'border',
  margin: 0,
});

export const lightboxOverlayStyle = css({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(8px)',
  cursor: 'zoom-out',
  animation: 'fadeIn 0.2s ease-out',
});

export const lightboxImageStyle = css({
  maxWidth: '90vw',
  maxHeight: '90vh',
  objectFit: 'contain',
  borderRadius: '0.8rem',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4)',
});

export const lightboxCloseStyle = css({
  position: 'fixed',
  top: '2rem',
  right: '2rem',
  zIndex: 1001,
  width: '4rem',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '50%',
  color: 'white',
  fontSize: '2rem',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  _hover: {
    background: 'rgba(255, 255, 255, 0.3)',
  },
});

export const lightboxNavStyle = css({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1001,
  width: '4.4rem',
  height: '4.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '50%',
  color: 'white',
  fontSize: '2rem',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  _hover: {
    background: 'rgba(255, 255, 255, 0.3)',
  },
});

export const lightboxCounterStyle = css({
  position: 'fixed',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1001,
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '1.3rem',
  fontWeight: 500,
});
