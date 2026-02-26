import type { ReactNode } from 'react';

export interface TimelineItem {
  id: string;
  label: string;
  startDate: string; // "YYYY.MM" 형식
  endDate?: string | null; // null이면 현재
}

export interface TimelineChartProps {
  items: TimelineItem[];
  colors?: string[];
  barHeight?: number;
  className?: string;
  children?: ReactNode;
}
