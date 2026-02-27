import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const sectionTitleStyle = css({
  fontSize: { base: '2rem', tablet: '2.4rem' },
  fontWeight: 700,
  color: 'textPrimary',
  marginBottom: '2.4rem',
  position: 'relative',
  paddingBottom: '1.2rem',
  letterSpacing: '-0.02em',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '4rem',
    height: '3px',
    borderRadius: '2px',
    backgroundColor: 'primary',
  },
});

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={`${sectionTitleStyle} ${className ?? ''}`}>
      {children}
    </h2>
  );
}
