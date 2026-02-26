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
  color: 'primary',
  textDecoration: 'underline',
  _hover: { color: 'primary.dark' },
});

export const githubListStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

export const highlightCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'surfaceHover',
  marginBottom: '1.2rem',
  _print: {
    backgroundColor: '#f3f4f6 !important',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
});

export const experienceCardStyle = css({
  borderLeft: '3px solid',
  borderColor: 'primary',
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
  backgroundColor: 'surface',
  marginBottom: '1.6rem',
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
  backgroundColor: 'tagBg',
  color: 'tagText',
  fontSize: '1.4rem',
  marginRight: '0.8rem',
  marginBottom: '0.8rem',
  _print: {
    backgroundColor: '#dbeafe !important',
    color: '#1e40af !important',
    fontSize: '9pt',
    padding: '0.2rem 0.8rem',
  },
});

export const periodStyle = css({
  color: 'textSecondary',
  fontSize: '1.4rem',
});

export const dividerStyle = css({
  border: 'none',
  borderTop: '1px solid',
  borderColor: 'border',
  margin: '3rem 0',
  _print: {
    margin: '1.5rem 0',
    borderColor: '#e5e7eb !important',
  },
});

export const introSummaryStyle = css({
  marginTop: '1.6rem',
  lineHeight: '1.8',
});

export const highlightsWrapperStyle = css({
  marginTop: '2.4rem',
});

export const highlightDescriptionStyle = css({
  marginTop: '0.8rem',
});

export const experienceCardWrapperStyle = css({
  marginTop: '2.4rem',
});

export const descriptionStyle = css({
  marginTop: '0.8rem',
  color: 'textSecondary',
});

export const projectsWrapperStyle = css({
  marginTop: '2rem',
});

export const projectTitleStyle = css({
  fontWeight: 'bold',
});

export const projectDescriptionStyle = css({
  marginTop: '0.8rem',
});

export const skillsWrapperStyle = css({
  marginTop: '1.6rem',
});

