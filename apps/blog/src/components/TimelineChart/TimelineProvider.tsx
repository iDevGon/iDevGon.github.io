import { createContext, use, useMemo } from 'react';
import { timelineContainerStyle } from './styles';
import type { TimelineChartProps, TimelineItem } from './types';
import { getMonthsDiff, parseDate } from './utils';

const DEFAULT_COLORS = ['#4F7CAC', '#C0E0DE', '#162521', '#3C474B', '#9EEFE5'];

const DEFAULT_BAR_HEIGHT = 40;
const BAR_GAP = 5;
const YEAR_MARKERS_HEIGHT = 30;
const CHART_PADDING_TOP = 20;
const CHART_PADDING_BOTTOM = 10;
const CHART_PADDING_LEFT = 16;
const CHART_PADDING_RIGHT = 16;

export interface TimelineContextValue {
  items: TimelineItem[];
  colors: string[];
  barHeight: number;
  now: Date;
  earliestStart: Date;
  totalMonths: number;
  years: number[];
  chartHeight: number;
  paddingLeft: number;
  paddingRight: number;
  onBarClick?: (item: TimelineItem) => void;
}

export { BAR_GAP, CHART_PADDING_TOP };

const TimelineContext = createContext<TimelineContextValue | null>(null);

export function useTimeline() {
  const ctx = use(TimelineContext);
  if (!ctx)
    throw new Error(
      'Timeline compound components must be used within <TimelineChart>',
    );
  return ctx;
}

export function TimelineProvider({
  items,
  colors = DEFAULT_COLORS,
  barHeight = DEFAULT_BAR_HEIGHT,
  className,
  children,
  onBarClick,
}: TimelineChartProps) {
  const now = useMemo(() => new Date(), []);

  const ctx = useMemo(() => {
    const allStartDates = items.map((item) => parseDate(item.startDate));
    const earliestStart = new Date(
      Math.min(...allStartDates.map((d) => d.getTime())),
    );
    const totalMonths = getMonthsDiff(earliestStart, now);

    const startYear = earliestStart.getFullYear();
    const endYear = now.getFullYear();
    const years: number[] = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }

    const chartHeight =
      CHART_PADDING_TOP +
      items.length * (barHeight + BAR_GAP) +
      YEAR_MARKERS_HEIGHT +
      CHART_PADDING_BOTTOM;

    return {
      items,
      colors,
      barHeight,
      now,
      earliestStart,
      totalMonths,
      years,
      chartHeight,
      paddingLeft: CHART_PADDING_LEFT,
      paddingRight: CHART_PADDING_RIGHT,
      onBarClick,
    };
  }, [items, colors, barHeight, now, onBarClick]);

  return (
    <TimelineContext value={ctx}>
      <div className={`${timelineContainerStyle} ${className ?? ''}`}>
        {children}
      </div>
    </TimelineContext>
  );
}
