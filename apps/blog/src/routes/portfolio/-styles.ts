import { css } from 'styled-system/css';

export const pageStyle = css({
  paddingTop: { base: '4.8rem', tablet: '6.4rem' },
  paddingBottom: { base: '6.4rem', tablet: '9.6rem' },
});

export const heroStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'end',
  columnGap: '3.2rem',
  rowGap: '2.4rem',
  marginBottom: { base: '4.8rem', tablet: '6.4rem' },
});

export const heroHeading = css({
  fontSize: 'clamp(4.2rem, 8vw, 9rem)',
  fontWeight: 800,
  letterSpacing: '-0.055em',
  lineHeight: 1,
  color: 'textPrimary',
  '& span': { color: 'primary', marginInlineStart: '0.03em' },
});

export const heroDescription = css({
  marginTop: '1.6rem',
  color: 'textSecondary',
  fontSize: { base: '1.5rem', tablet: '1.7rem' },
  lineHeight: 1.65,
  wordBreak: 'keep-all',
});

export const heroNavigation = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem 2.4rem',
  '& a': {
    display: 'inline-flex',
    gap: '0.8rem',
    alignItems: 'center',
    minHeight: '4.4rem',
    color: 'textPrimary',
    fontSize: '1.4rem',
    fontWeight: 600,
    _hover: { textDecoration: 'underline' },
  },
  '& span': { color: 'primary' },
});

export const sectionStyle = css({
  scrollMarginTop: 'calc(7.2rem + env(safe-area-inset-top, 0px))',
  '& + &': { marginTop: { base: '5.6rem', tablet: '8.8rem' } },
});

export const sectionHeading = css({
  paddingTop: '1.6rem',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'border',
  marginBottom: '2.4rem',
  fontSize: { base: '2rem', tablet: '2.4rem' },
  fontWeight: 750,
  letterSpacing: '-0.045em',
});

export const projectGrid = css({
  display: 'grid',
  gridTemplateColumns: {
    base: 'minmax(0, 1fr)',
    tablet: 'repeat(2, minmax(0, 1fr))',
  },
  columnGap: { tablet: '2.4rem', desktop: '3.2rem' },
  rowGap: { base: '4rem', tablet: '6.4rem' },
  '&[data-featured]': {
    gridTemplateColumns: {
      base: 'minmax(0, 1fr)',
      tablet: 'repeat(2, minmax(0, 1fr))',
      desktop: 'minmax(0, 1.16fr) minmax(0, 1fr)',
    },
  },
});

export const cardStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '1.2rem',
  minWidth: 0,
  '--project-mat': 'var(--colors-surface)',
  '&[data-project="chessi"]': { '--project-mat': '#2d3c34' },
  '&[data-project="forest-restaurant"]': { '--project-mat': '#e8d6b5' },
  '&[data-project="wagle"]': { '--project-mat': '#e2d5ef' },
  '&[data-project="pixelroom"]': { '--project-mat': '#3a3b4a' },
  '&[data-project="last-access"]': { '--project-mat': '#34344b' },
  '&[data-project="clocktower"]': { '--project-mat': '#423449' },
  '--project-frame':
    'color-mix(in srgb, var(--project-mat) 54%, var(--colors-surface))',
});

export const previewButton = css({
  display: 'block',
  position: 'relative',
  width: '100%',
  aspectRatio: '8 / 5',
  cursor: 'zoom-in',
  isolation: 'isolate',
  background: 'var(--project-frame)',
  borderRadius: '0.8rem',
  padding: { base: '1.2rem', tablet: '1.6rem', desktop: '2rem' },
  marginBottom: '0.8rem',
  overflow: 'hidden',
  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '0.4rem',
    transition: 'transform 240ms ease-out',
    _motionReduce: { transition: 'none' },
  },
  '@media (hover: hover) and (prefers-reduced-motion: no-preference)': {
    '&:hover img': { transform: 'scale(1.025)' },
  },
});

export const previewHint = css({
  position: 'absolute',
  right: '0.8rem',
  bottom: '0.8rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.5rem 0.9rem',
  background: '#1b1c23',
  color: '#faf9fc',
  border: '1px solid #50505b',
  borderRadius: '0.4rem',
  fontSize: '1.2rem',
  fontWeight: 650,
});

export const pairedPreviews = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 28%)',
  aspectRatio: '8 / 5',
  width: '100%',
  gap: { base: '0.8rem', desktop: '1.2rem' },
  padding: { base: '0.8rem', desktop: '1.2rem' },
  marginBottom: '0.8rem',
  background: 'var(--project-frame)',
  borderRadius: '0.8rem',
});

export const pairedPreview = css({
  display: 'grid',
  gridTemplateRows: 'minmax(0, 1fr) auto',
  minHeight: 0,
  minWidth: 0,
  gap: '0.4rem',
  padding: '0.4rem',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0.4rem',
  background: 'surface',
  color: 'textPrimary',
  cursor: 'zoom-in',
  _hover: { borderColor: 'textMuted' },
  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    minHeight: 0,
    objectFit: 'contain',
    background: '#1b1c23',
  },
  '& > span': {
    fontSize: '1.2rem',
    lineHeight: 1.4,
    fontWeight: 650,
    paddingBlock: '0.3rem',
    overflowWrap: 'anywhere',
    '& > span': { display: { base: 'none', desktop: 'inline' } },
  },
});

export const statusStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: 'textSecondary',
  '&[data-live]': {
    color: 'primary',
    _before: {
      content: '""',
      width: '0.6rem',
      height: '0.6rem',
      borderRadius: '50%',
      background: 'currentColor',
    },
  },
});

export const projectHeading = css({
  fontSize: { base: '2.7rem', tablet: '3.3rem', desktop: '3.8rem' },
  lineHeight: 1.15,
  fontWeight: 800,
  letterSpacing: '-0.055em',
  marginBlock: '0.4rem 0.8rem',
});

export const projectSubtitle = css({
  fontSize: '1.6rem',
  fontWeight: 680,
  wordBreak: 'keep-all',
});

export const descriptionStyle = css({
  color: 'textSecondary',
  fontSize: '1.5rem',
  lineHeight: 1.65,
  maxWidth: '52rem',
  marginTop: '0.6rem',
  wordBreak: 'keep-all',
});

export const tagList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.6rem',
  listStyle: 'none',
  '& li': {
    padding: '0.3rem 0.8rem',
    backgroundColor: 'tagBg',
    color: 'tagText',
    borderRadius: '0.4rem',
    fontSize: '1.2rem',
    fontWeight: 600,
  },
});

export const linkStyle = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.2rem',
  minHeight: '4.4rem',
  paddingInline: '1.2rem',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0.5rem',
  color: 'textPrimary',
  textDecoration: 'none',
  fontSize: '1.4rem',
  fontWeight: 700,
  _hover: { textDecoration: 'underline' },
  '&[data-primary]': {
    backgroundColor: 'textPrimary',
    color: 'background',
    borderColor: 'textPrimary',
  },
});

export const detailsStyle = css({
  width: '100%',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'border',
  color: 'textSecondary',
  fontSize: '1.4rem',
  lineHeight: 1.65,
  '& summary': {
    cursor: 'pointer',
    color: 'textPrimary',
    fontWeight: 600,
    paddingBlock: '1.05rem',
    width: 'fit-content',
    minHeight: '4.4rem',
    _hover: { textDecoration: 'underline' },
  },
  '& ul': {
    listStyle: 'disc',
    paddingInlineStart: '2rem',
    marginTop: '0.6rem',
  },
});

export const dialogStyle = css({
  position: 'fixed',
  inset: 0,
  margin: 'auto',
  width: 'min(110rem, calc(100% - 2.4rem))',
  maxHeight: 'calc(100dvh - 2.4rem)',
  overflow: 'auto',
  overscrollBehavior: 'contain',
  border: '1px solid',
  borderColor: 'border',
  borderRadius: '0.8rem',
  color: 'textPrimary',
  background: 'background',
  '&[data-portrait]': {
    width: 'min(48rem, calc(100% - 2.4rem))',
  },
  '&::backdrop': { background: 'rgba(13, 14, 19, 0.86)' },
});

export const galleryFrame = css({
  position: 'relative',
  display: 'grid',
  justifyItems: 'center',
  background: '#1b1c23',
});

export const galleryImage = css({
  display: 'block',
  width: '100%',
  height: 'auto',
  maxHeight: 'calc(100dvh - 12rem)',
  objectFit: 'contain',
});

export const closeButton = css({
  position: 'absolute',
  top: '0.8rem',
  right: '0.8rem',
  width: '4.4rem',
  height: '4.4rem',
  borderRadius: '0.5rem',
  background: '#1b1c23',
  color: '#faf9fc',
  border: '1px solid #777784',
  cursor: 'pointer',
  fontSize: '2.4rem',
});

export const galleryCaption = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.8rem',
  width: '100%',
  background: 'background',
  padding: '0.8rem 1.6rem',
  color: 'textPrimary',
  fontSize: '1.4rem',
  '& span': {
    color: 'textSecondary',
    fontSize: '1.2rem',
    marginInlineStart: '0.6rem',
    whiteSpace: 'nowrap',
  },
});

export const galleryActions = css({
  display: 'flex',
  gap: '0.4rem',
  '& button': {
    width: '4.4rem',
    height: '4.4rem',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.8rem',
    _hover: { backgroundColor: 'tagBg' },
    _disabled: { opacity: 0.45, cursor: 'default' },
  },
});
