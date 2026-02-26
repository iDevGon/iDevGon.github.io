import { css } from 'styled-system/css';

export const markdownStyles = css({
  lineHeight: '1.8',
  fontSize: '1.6rem',

  '& h1': {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    marginTop: '8',
    marginBottom: '4',
    lineHeight: '1.3',
  },
  '& h2': {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginTop: '6',
    marginBottom: '3',
    lineHeight: '1.3',
    borderBottom: '1px solid',
    borderColor: 'border',
    paddingBottom: '2',
  },
  '& h3': {
    fontSize: '1.8rem',
    fontWeight: 'semibold',
    marginTop: '5',
    marginBottom: '2',
    lineHeight: '1.4',
  },
  '& p': {
    marginBottom: '4',
  },
  '& a': {
    color: 'primary',
    textDecoration: 'underline',
    _hover: { color: 'primary.dark' },
  },
  '& ul, & ol': {
    marginBottom: '4',
    paddingLeft: '6',
  },
  '& li': {
    marginBottom: '2',
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'primary',
    paddingLeft: '4',
    paddingBlock: '2',
    marginBottom: '4',
    color: 'textSecondary',
    backgroundColor: 'surfaceHover',
    fontStyle: 'italic',
  },
  '& code': {
    background: 'codeBg',
    padding: '0.5 1',
    borderRadius: 'sm',
    fontSize: '0.9em',
    fontFamily: 'monospace',
  },
  '& pre': {
    background: 'codeBlockBg',
    color: 'white',
    padding: '4',
    borderRadius: 'md',
    overflow: 'auto',
    marginBottom: '4',

    '& code': {
      background: 'transparent',
      padding: '0',
    },
  },
  '& hr': {
    border: 'none',
    borderTop: '1px solid',
    borderColor: 'border',
    marginTop: '6',
    marginBottom: '6',
  },
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '4',
  },
  '& th, & td': {
    border: '1px solid',
    borderColor: 'border',
    padding: '2 3',
    textAlign: 'left',
  },
  '& th': {
    background: 'surfaceHover',
    fontWeight: 'semibold',
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 'md',
    marginBottom: '4',
  },
});
