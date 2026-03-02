import { css } from 'styled-system/css';

export const pageStyle = css({
  animation: 'fadeIn 0.8s ease',
});

export const titleStyle = css({
  fontSize: { base: '2.4rem', tablet: '2.8rem' },
  fontWeight: 700,
  color: 'textPrimary',
  letterSpacing: '-0.02em',
  textWrap: 'balance',
});

export const headerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3.2rem',
});

export const searchToggleStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '50%',
  border: 'none',
  background: 'transparent',
  color: 'textMuted',
  cursor: 'pointer',
  transition: 'color 0.15s, background 0.15s',
  _hover: {
    color: 'textPrimary',
    background: 'backgroundAlt',
  },
  '&[data-active="true"]': {
    background: 'backgroundAlt',
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
  color: 'white',
  cursor: 'pointer',
  transition: 'background 0.15s',
  _hover: {
    background: 'color-mix(in srgb, token(colors.primary) 85%, black)',
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
    color: 'white',
    _hover: {
      background: 'color-mix(in srgb, token(colors.primary) 85%, black)',
      color: 'white',
    },
  },
});

export const noResultStyle = css({
  padding: { base: '4rem 0', tablet: '6rem 0' },
  textAlign: 'center',
  color: 'textMuted',
});

export const containerPaddingStyle = css({
  padding: '4',
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
  gap: '1.6rem',
});

export const searchInputWrapperStyle = css({
  position: 'relative',
});
