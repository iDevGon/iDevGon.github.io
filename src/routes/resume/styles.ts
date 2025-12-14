import { css } from 'styled-system/css';

// 인쇄용 페이지 래퍼 스타일
export const printPageStyle = css({
  _print: {
    width: '100%',
    maxWidth: 'none',
    padding: 0,
    margin: 0,
    fontSize: '10pt',
    lineHeight: 1.5,
  },
});

export const sectionStyle = css({
  marginBottom: '4rem',
  _print: {
    marginBottom: '2rem',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
});

export const profileSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginBottom: '2rem',
});

export const linkStyle = css({
  color: 'blue.500',
  textDecoration: 'underline',
  _hover: { color: 'blue.700' },
});

export const githubListStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

export const highlightCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'gray.100',
  marginBottom: '1.2rem',
  _dark: { backgroundColor: 'gray.800' },
  _print: {
    backgroundColor: '#f3f4f6 !important',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
});

export const experienceCardStyle = css({
  borderLeft: '3px solid',
  borderColor: 'blue.500',
  paddingLeft: '2rem',
  marginBottom: '3rem',
  _print: {
    borderColor: '#3182ce !important',
    marginBottom: '1.5rem',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
});

export const projectCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'gray.50',
  marginBottom: '1.6rem',
  _dark: { backgroundColor: 'gray.900' },
  _print: {
    backgroundColor: '#fafafa !important',
    marginBottom: '1rem',
    padding: '1rem',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
});

export const achievementListStyle = css({
  listStyleType: 'disc',
  paddingLeft: '2rem',
  marginTop: '0.8rem',
});

export const skillTagStyle = css({
  display: 'inline-block',
  padding: '0.4rem 1.2rem',
  borderRadius: '2rem',
  backgroundColor: 'blue.100',
  color: 'blue.800',
  fontSize: '1.4rem',
  marginRight: '0.8rem',
  marginBottom: '0.8rem',
  _dark: { backgroundColor: 'blue.900', color: 'blue.100' },
  _print: {
    backgroundColor: '#dbeafe !important',
    color: '#1e40af !important',
    fontSize: '9pt',
    padding: '0.2rem 0.8rem',
  },
});

export const periodStyle = css({
  color: 'gray.500',
  fontSize: '1.4rem',
});

export const dividerStyle = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'gray.200',
  margin: '3rem 0',
  _dark: { borderColor: 'gray.700' },
  _print: {
    margin: '1.5rem 0',
    borderColor: '#e5e7eb !important',
  },
});
