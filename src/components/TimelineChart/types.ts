export interface TimelineItem {
  id: string;
  label: string;
  startDate: string; // "YYYY.MM" 형식
  endDate?: string | null; // null이면 현재
}

export interface TimelineChartProps {
  items: TimelineItem[];
  title?: string;
  colors?: string[];
  showLegend?: boolean;
  showYearMarkers?: boolean;
  barHeight?: number;
  className?: string;
}
