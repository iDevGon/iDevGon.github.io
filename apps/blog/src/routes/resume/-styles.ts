import { css } from 'styled-system/css';

export const printPageStyle = css({
  maxWidth: { tablet: '76.8rem', desktop: '96rem' },
  paddingBlock: { base: '4.8rem 6.4rem', tablet: '6.4rem 8rem' },
  '& h1': {
    fontSize: 'clamp(3.6rem, 6vw, 6rem)',
    letterSpacing: '-0.055em',
  },
  _print: {
    width: 'auto',
    maxWidth: 'none',
    padding: 0,
    fontSize: '10pt',
    lineHeight: 1.45,
    '& h1': { fontSize: '21pt', marginBottom: '2mm' },
    '& h2': { fontSize: '15pt', marginBottom: '2mm' },
    '& h3': { fontSize: '11.5pt' },
    '& h4': { fontSize: '10.5pt' },
    '& p, & li span': { fontSize: '10pt', lineHeight: 1.45 },
  },
});

export const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  _print: {
    display: 'block',
  },
});

export const profileSectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  _print: {
    marginBottom: '2mm',
    gap: '1mm',
    breakInside: 'avoid',
  },
});

export const profileItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

export const linkStyle = css({
  color: 'primary',
  textDecoration: 'underline',
  textUnderlineOffset: '0.2em',
  _hover: { color: 'primary.dark' },
});

export const githubListStyle = css({
  display: 'flex',
  gap: '1.2rem',
  flexWrap: 'wrap',
});

export const highlightCardStyle = css({
  padding: { base: '1.2rem', tablet: '1.6rem' },
  borderRadius: '0.8rem',
  backgroundColor: 'surfaceHover',
  marginBottom: '1.2rem',
  _print: {
    padding: '2.5mm 3mm',
    marginBottom: '2mm',
    backgroundColor: 'surfaceHover',
    breakInside: 'avoid',
  },
});

export const experienceCardStyle = css({
  marginBottom: { base: '2rem', tablet: '3rem' },
  _print: {
    marginBottom: '4mm',
  },
});

export const projectCardStyle = css({
  paddingBlock: { base: '1.2rem', tablet: '1.6rem' },
  borderTop: '1px solid var(--colors-border)',
  overflowWrap: 'anywhere',
  _print: {
    paddingBlock: '2.5mm',
    breakInside: 'avoid',
  },
});

export const achievementListStyle = css({
  listStyleType: 'disc',
  paddingLeft: '2rem',
  marginTop: '0.8rem',
});

export const periodStyle = css({
  color: 'textSecondary',
  fontSize: '1.4rem',
  _print: { fontSize: '9pt' },
});

export const dividerStyle = css({
  border: 'none',
  borderTop: '1px solid var(--colors-border)',
  marginBlock: { base: '3.2rem', tablet: '4.8rem' },
  _print: { marginBlock: '4mm' },
});

export const introSummaryWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginTop: '1.6rem',
  _print: { marginTop: 0, gap: '2mm' },
});

export const introSummaryStyle = css({
  lineHeight: '1.8',
});

export const highlightsWrapperStyle = css({
  marginTop: '1.2rem',
  _print: { marginTop: '3mm' },
});

export const highlightDescriptionStyle = css({
  marginTop: '0.8rem',
});

export const experienceCardWrapperStyle = css({
  marginTop: '2.4rem',
  scrollMarginTop: '8rem',
  _print: { marginTop: '4mm' },
});

export const descriptionStyle = css({
  marginTop: '0.8rem',
  color: 'textSecondary',
});

export const projectsWrapperStyle = css({
  marginTop: '2rem',
  _print: { marginTop: '3mm' },
});

export const projectTitleStyle = css({
  fontWeight: 'bold',
});

export const projectDescriptionStyle = css({
  marginTop: '0.8rem',
});

export const skillsWrapperStyle = css({
  marginTop: '1.6rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
  _print: { breakInside: 'avoid', marginTop: 0 },
});

export const educationCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'surfaceHover',
  marginBottom: '1.2rem',
  _print: {
    padding: '2.5mm 3mm',
    marginBottom: '2mm',
    backgroundColor: 'surfaceHover',
    breakInside: 'avoid',
  },
});

export const educationInfoStyle = css({
  marginTop: '0.4rem',
  color: 'textSecondary',
});

export const certificationCardStyle = css({
  padding: '1.6rem',
  borderRadius: '0.8rem',
  backgroundColor: 'surfaceHover',
  marginBottom: '1.2rem',
  _print: {
    padding: '2.5mm 3mm',
    marginBottom: '2mm',
    backgroundColor: 'surfaceHover',
    breakInside: 'avoid',
  },
});

export const certificationInfoStyle = css({
  marginTop: '0.4rem',
  color: 'textSecondary',
});

export const othersListStyle = css({
  marginTop: '1.6rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const othersItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});
