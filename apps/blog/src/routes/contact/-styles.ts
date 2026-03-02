import { css } from 'styled-system/css';

export const pageStyle = css({
  animation: 'fadeInUp 0.6s ease-out',
});

export const titleStyle = css({
  fontSize: { base: '2.4rem', tablet: '2.8rem' },
  fontWeight: 700,
  color: 'textPrimary',
  marginBottom: '1.2rem',
  textWrap: 'balance',
  letterSpacing: '-0.02em',
});

export const subtitleStyle = css({
  fontSize: '1.6rem',
  color: 'textSecondary',
  marginBottom: '4rem',
  lineHeight: 1.6,
});

export const contactListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const contactItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: { base: '1.2rem', tablet: '1.6rem' },
  padding: { base: '1.6rem', tablet: '2rem' },
  borderRadius: '1.2rem',
  backgroundColor: 'cardBg',
  border: '1px solid',
  borderColor: 'border',
  touchAction: 'manipulation',
  transition: 'border-color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    borderColor: 'borderHover',
    transform: { base: 'none', tablet: 'translateX(4px)' },
  },
});

export const iconStyle = css({
  width: '4.4rem',
  height: '4.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1rem',
  backgroundColor: 'surfaceHover',
  flexShrink: 0,
});

export const contactInfoStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

export const contactLabelStyle = css({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: 'textMuted',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const contactLinkStyle = css({
  fontSize: '1.6rem',
  color: 'primary',
  fontWeight: 500,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});
