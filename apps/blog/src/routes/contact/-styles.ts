import { css } from 'styled-system/css';

export const pageStyle = css({
  maxWidth: '72rem',
  marginInline: 'auto',
  paddingBlock: { base: '1.6rem 3.2rem', tablet: '3.2rem 4.8rem' },
});

export const titleStyle = css({
  fontSize: 'clamp(3.6rem, 6vw, 6rem)',
  fontWeight: 750,
  lineHeight: 1.15,
  color: 'textPrimary',
  marginBottom: '1.2rem',
  textWrap: 'balance',
  letterSpacing: '-0.055em',
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
  borderTop: '1px solid var(--colors-border)',
});

export const contactItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: { base: '1.2rem', tablet: '1.6rem' },
  paddingBlock: '1.6rem',
  borderBottom: '1px solid var(--colors-border)',
  touchAction: 'manipulation',
  _hover: {
    '& [data-contact-address]': {
      color: 'primary',
      textDecoration: 'underline',
      textUnderlineOffset: '0.25em',
    },
  },
});

export const iconStyle = css({
  width: '4.4rem',
  height: '4.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '0.5rem',
  backgroundColor: 'surfaceHover',
  color: 'primary',
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
  color: 'textPrimary',
  fontWeight: 600,
  overflowWrap: 'anywhere',
});
