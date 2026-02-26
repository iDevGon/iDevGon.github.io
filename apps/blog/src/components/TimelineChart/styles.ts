import { css } from 'styled-system/css';

export const timelineContainerStyle = css({
  marginTop: '2rem',
  marginBottom: '3rem',
  _print: {
    marginTop: '1rem',
    marginBottom: '1.5rem',
    pageBreakInside: 'avoid',
    breakInside: 'avoid',
  },
});

export const timelineChartStyle = css({
  position: 'relative',
  backgroundColor: 'surfaceHover',
  borderRadius: '0.8rem',
  overflow: 'hidden',
  height: 'var(--chart-height)',
  _print: {
    backgroundColor: '#fafafa !important',
  },
});

export const timelineBarStyle = css({
  position: 'absolute',
  borderRadius: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'default',
  left: 'var(--bar-left)',
  width: 'var(--bar-width)',
  top: 'var(--bar-top)',
  height: 'var(--bar-height)',
  backgroundColor: 'var(--bar-color)',
  _hover: {
    transform: 'scaleY(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  _print: {
    fontSize: '9pt',
  },
});

export const timelineYearMarkersStyle = css({
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  height: '30px',
  display: 'flex',
  alignItems: 'flex-end',
  borderTop: '1px solid',
  borderColor: 'border',
});

export const yearMarkerStyle = css({
  position: 'absolute',
  fontSize: '1.1rem',
  color: 'textSecondary',
  transform: 'translateX(-50%)',
  fontVariantNumeric: 'tabular-nums',
  left: 'var(--marker-left)',
});

export const timelineTitleStyle = css({
  marginBottom: '1rem',
  color: 'textSecondary',
});

export const timelineLegendStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.6rem',
  marginTop: '1.2rem',
});

export const legendItemStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

export const legendColorStyle = css({
  width: '16px',
  height: '16px',
  borderRadius: '0.4rem',
  backgroundColor: 'var(--legend-color)',
});
