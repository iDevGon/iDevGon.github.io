import { css } from 'styled-system/css';

export const pageStyle = css({
  width: '100%',
  maxWidth: '90rem',
  marginInline: 'auto',
  paddingInline: { base: '1.6rem', tablet: '2.4rem' },
  paddingBlock: { base: '4.8rem 6.4rem', tablet: '6.4rem 8rem' },
});

export const titleStyle = css({
  fontSize: 'clamp(3.6rem, 6vw, 6rem)',
  fontWeight: 750,
  lineHeight: 1.15,
  color: 'textPrimary',
  letterSpacing: '-0.055em',
  textWrap: 'balance',
});

export const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2.4rem',
});

export const searchToggleStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.4rem',
  height: '4.4rem',
  borderRadius: '0.6rem',
  border: '1px solid',
  borderColor: 'border',
  background: 'transparent',
  color: 'textMuted',
  cursor: 'pointer',
  touchAction: 'manipulation',
  transition: 'color 0.15s, background 0.15s',
  _hover: {
    color: 'textPrimary',
    background: 'surfaceHover',
  },
  '&[data-active="true"]': {
    background: 'surfaceHover',
    color: 'primary',
  },
});

export const searchPanelStyle = css({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: 'grid-template-rows 0.2s ease',
  '& > div': {
    overflow: 'hidden',
  },
  '&[data-open="true"]': {
    gridTemplateRows: '1fr',
  },
});

export const searchPanelInnerStyle = css({
  paddingBottom: '2rem',
});

export const searchInputStyle = css({
  width: '100%',
  padding: {
    base: '1rem 4.8rem 1rem 3.6rem',
    tablet: '1.2rem 5.2rem 1.2rem 4rem',
  },
  fontSize: { base: '1.4rem', tablet: '1.6rem' },
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0.8rem',
  background: 'surface',
  color: 'textPrimary',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  _focus: {
    borderColor: 'primary',
    boxShadow:
      '0 0 0 3px color-mix(in srgb, token(colors.primary) 12%, transparent)',
  },
  _placeholder: {
    color: 'textMuted',
  },
});

export const searchIconStyle = css({
  position: 'absolute',
  left: { base: '1.2rem', tablet: '1.4rem' },
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'textMuted',
  pointerEvents: 'none',
});

export const searchSubmitStyle = css({
  position: 'absolute',
  right: { base: '0.8rem', tablet: '1rem' },
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '0.6rem',
  border: 'none',
  background: 'primary',
  color: 'background',
  cursor: 'pointer',
  touchAction: 'manipulation',
  transition: 'background 0.15s',
  _hover: {
    background: 'primary.dark',
  },
});

export const tagFilterStyle = css({
  marginTop: '1.2rem',
  gap: '0.6rem',
  flexWrap: 'wrap',
});

export const tagButtonStyle = css({
  padding: '0.4rem 1rem',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'border',
  background: 'surface',
  color: 'textSecondary',
  fontSize: '1.3rem',
  cursor: 'pointer',
  touchAction: 'manipulation',
  transition: 'border-color 0.2s, background 0.2s, color 0.2s',
  whiteSpace: 'nowrap',
  _hover: {
    borderColor: 'primary',
    color: 'primary',
  },
  '&[data-selected="true"]': {
    borderColor: 'primary',
    background: 'primary',
    color: 'background',
    _hover: {
      background: 'primary.dark',
      color: 'background',
    },
  },
});

export const noResultStyle = css({
  padding: { base: '4rem 0', tablet: '6rem 0' },
  textAlign: 'center',
  color: 'textMuted',
});

export const searchResultCountStyle = css({
  fontSize: '1.3rem',
  color: 'textMuted',
  fontFamily: '{fonts.mono}',
  marginBottom: '1.6rem',
});

export const emptyStateStyle = css({
  padding: '16',
  textAlign: 'center',
  color: 'textSecondary',
});

export const emptySubtextStyle = css({
  marginTop: '0.75rem',
  color: 'textSecondary',
});

export const articleListStyle = css({
  borderTop: '1px solid var(--colors-border)',
});

export const searchInputWrapperStyle = css({
  position: 'relative',
});
