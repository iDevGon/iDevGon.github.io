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

export const articleHeaderStyle = css({
  marginBottom: { base: '3.2rem', tablet: '4.8rem' },
  paddingBottom: '2.4rem',
  borderBottom: '1px solid',
  borderColor: 'border',
});
