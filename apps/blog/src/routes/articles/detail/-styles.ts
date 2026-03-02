import { css } from 'styled-system/css';

export const markdownStyles = css({
  maxWidth: '72rem',
  marginInline: 'auto',
  lineHeight: '1.9',
  fontSize: { base: '1.6rem', tablet: '1.7rem' },
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  color: 'textPrimary',
  letterSpacing: '-0.01em',

  '& h1, & h2, & h3': {
    scrollMarginTop: '7rem',
  },
  '& h1': {
    fontSize: { base: '2.4rem', tablet: '2.8rem' },
    fontWeight: 'bold',
    marginTop: '4.8rem',
    marginBottom: '1.6rem',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
  },
  '& h2': {
    fontSize: { base: '2rem', tablet: '2.2rem' },
    fontWeight: 'bold',
    marginTop: '4rem',
    marginBottom: '1.2rem',
    lineHeight: '1.3',
    letterSpacing: '-0.015em',
    borderBottom: '1px solid',
    borderColor: 'border',
    paddingBottom: '0.8rem',
  },
  '& h3': {
    fontSize: { base: '1.7rem', tablet: '1.9rem' },
    fontWeight: 'semibold',
    marginTop: '3.2rem',
    marginBottom: '1rem',
    lineHeight: '1.4',
  },
  '& p': {
    marginBottom: '1.6rem',
  },
  '& strong': {
    fontWeight: 'bold',
    color: 'textPrimary',
  },
  '& em': {
    fontStyle: 'italic',
  },
  '& a': {
    color: 'primary',
    textDecoration: 'underline',
    textUnderlineOffset: '0.3em',
    textDecorationThickness: '1px',
    textDecorationColor: 'primary.light',
    transition: 'text-decoration-color 0.2s',
    _hover: {
      color: 'primary.dark',
      textDecorationColor: 'primary.dark',
    },
  },
  '& ul, & ol': {
    marginBottom: '1.6rem',
    paddingLeft: { base: '2.4rem', tablet: '3rem' },
  },
  '& li': {
    marginBottom: '0.6rem',
    lineHeight: '1.8',

    '&::marker': {
      color: 'textMuted',
    },
  },
  '& li > ul, & li > ol': {
    marginTop: '0.6rem',
    marginBottom: '0',
  },
  '& blockquote': {
    borderLeft: '3px solid',
    borderColor: 'primary.light',
    paddingLeft: { base: '1.6rem', tablet: '2rem' },
    paddingBlock: '1.2rem',
    marginTop: '2.4rem',
    marginBottom: '2.4rem',
    marginInline: 0,
    color: 'textSecondary',
    backgroundColor: 'surfaceHover',
    borderRadius: '0 0.8rem 0.8rem 0',
    fontStyle: 'italic',
    lineHeight: '1.8',

    '& p': {
      marginBottom: '0.8rem',
      _last: { marginBottom: '0' },
    },
  },
  '& code': {
    background: 'codeBg',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.4rem',
    fontSize: '0.88em',
    fontFamily: '{fonts.mono}',
    wordBreak: 'break-all',
    letterSpacing: '0',
  },
  '& pre': {
    background: 'codeBlockBg',
    color: 'white',
    padding: { base: '1.6rem', tablet: '2rem' },
    borderRadius: '0.8rem',
    overflow: 'auto',
    marginTop: '2.4rem',
    marginBottom: '2.4rem',
    fontSize: { base: '1.3rem', tablet: '1.4rem' },
    lineHeight: 1.7,
    WebkitOverflowScrolling: 'touch',

    '& code': {
      background: 'transparent',
      padding: '0',
      fontSize: 'inherit',
      wordBreak: 'normal',
    },
  },
  '& hr': {
    border: 'none',
    borderTop: '1px solid',
    borderColor: 'border',
    marginTop: '3.2rem',
    marginBottom: '3.2rem',
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1.6rem',
    marginBottom: '2.4rem',
    display: 'block',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    fontSize: { base: '1.4rem', tablet: '1.5rem' },
  },
  '& th, & td': {
    border: '1px solid',
    borderColor: 'border',
    padding: { base: '0.8rem 1rem', tablet: '1rem 1.4rem' },
    textAlign: 'left',
  },
  '& th': {
    background: 'surfaceHover',
    fontWeight: 'semibold',
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '0.8rem',
    marginTop: '1.6rem',
    marginBottom: '1.6rem',
  },
  '& > *:first-child': {
    marginTop: '0',
  },
});
