import { Typo } from '@idevgon/design-system';
import {
  type CSSProperties,
  createContext,
  type ReactNode,
  use,
  useMemo,
} from 'react';
import {
  legendColorStyle,
  legendItemStyle,
  timelineBarStyle,
  timelineChartStyle,
  timelineContainerStyle,
  timelineLegendStyle,
  timelineTitleStyle,
  timelineYearMarkersStyle,
  yearMarkerStyle,
} from './styles';
import type { TimelineChartProps, TimelineItem } from './types';
import {
  formatDuration,
  formatPeriod,
  getContrastTextColor,
  getMonthsDiff,
  parseDate,
} from './utils';

const DEFAULT_COLORS = ['#4F7CAC', '#C0E0DE', '#162521', '#3C474B', '#9EEFE5'];

const DEFAULT_BAR_HEIGHT = 40;
const BAR_GAP = 5;
const YEAR_MARKERS_HEIGHT = 30;
const CHART_PADDING_TOP = 20;
const CHART_PADDING_BOTTOM = 10;
const CHART_PADDING_LEFT = 16;
const CHART_PADDING_RIGHT = 16;

interface TimelineContextValue {
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
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimeline() {
  const ctx = use(TimelineContext);
  if (!ctx)
    throw new Error(
      'Timeline compound components must be used within <TimelineChart>',
    );
  return ctx;
}

// --- Compound Components ---

function Title({ children }: { children: ReactNode }) {
  return (
    <Typo variant="body2" asChild>
      <p className={timelineTitleStyle}>{children}</p>
    </Typo>
  );
}

function Bars() {
  const {
    items,
    colors,
    barHeight,
    now,
    earliestStart,
    totalMonths,
    paddingLeft,
    paddingRight,
  } = useTimeline();

  return (
    <>
      {items.map((item, idx) => {
        const startDate = parseDate(item.startDate);
        const endDate = item.endDate ? parseDate(item.endDate) : now;

        const startOffset = getMonthsDiff(earliestStart, startDate);
        const duration = getMonthsDiff(startDate, endDate);

        const leftPercent = (startOffset / totalMonths) * 100;
        const widthPercent = (duration / totalMonths) * 100;

        return (
          <div
            key={item.id}
            className={timelineBarStyle}
            style={
              {
                '--bar-left': `calc(${paddingLeft}px + ${leftPercent} * (100% - ${paddingLeft + paddingRight}px) / 100)`,
                '--bar-width': `calc(${Math.max(widthPercent, 5)} * (100% - ${paddingLeft + paddingRight}px) / 100)`,
                '--bar-top': `${CHART_PADDING_TOP + idx * (barHeight + BAR_GAP)}px`,
                '--bar-height': `${barHeight}px`,
                '--bar-color': colors[idx % colors.length],
                '--bar-text-color': getContrastTextColor(
                  colors[idx % colors.length],
                ),
              } as CSSProperties
            }
            title={`${item.label}: ${formatPeriod(item.startDate, item.endDate)} (${formatDuration(duration)})`}
          >
            {widthPercent > 15 && (
              <Typo asChild variant="caption">
                <span>{item.label}</span>
              </Typo>
            )}
          </div>
        );
      })}
    </>
  );
}

function YearMarkers() {
  const { years, earliestStart, totalMonths, paddingLeft, paddingRight } =
    useTimeline();

  return (
    <div className={timelineYearMarkersStyle}>
      {years.map((year) => {
        const yearStart = new Date(year, 0);
        const offset = getMonthsDiff(earliestStart, yearStart);
        const leftPercent = (offset / totalMonths) * 100;

        return (
          <Typo asChild variant="caption" key={year}>
            <span
              className={yearMarkerStyle}
              style={
                {
                  '--marker-left': `calc(${paddingLeft}px + ${Math.max(leftPercent, 2)} * (100% - ${paddingLeft + paddingRight}px) / 100)`,
                } as CSSProperties
              }
            >
              {year}
            </span>
          </Typo>
        );
      })}
    </div>
  );
}

function Legend() {
  const { items, colors, now } = useTimeline();

  return (
    <div className={timelineLegendStyle}>
      {items.map((item, idx) => {
        const startDate = parseDate(item.startDate);
        const endDate = item.endDate ? parseDate(item.endDate) : now;
        const duration = getMonthsDiff(startDate, endDate);

        return (
          <div key={item.id} className={legendItemStyle}>
            <span
              className={legendColorStyle}
              style={
                {
                  '--legend-color': colors[idx % colors.length],
                } as CSSProperties
              }
            />
            <Typo variant="caption">
              {item.label} ({formatDuration(duration)})
            </Typo>
          </div>
        );
      })}
    </div>
  );
}

// --- Root Component ---

function TimelineChartRoot({
  items,
  colors = DEFAULT_COLORS,
  barHeight = DEFAULT_BAR_HEIGHT,
  className,
  children,
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
    };
  }, [items, colors, barHeight, now]);

  return (
    <TimelineContext value={ctx}>
      <div className={`${timelineContainerStyle} ${className ?? ''}`}>
        {children}
      </div>
    </TimelineContext>
  );
}

function Chart({ children }: { children?: ReactNode }) {
  const { chartHeight } = useTimeline();

  return (
    <div
      className={timelineChartStyle}
      style={{ '--chart-height': `${chartHeight}px` } as CSSProperties}
    >
      {children ?? (
        <>
          <Bars />
          <YearMarkers />
        </>
      )}
    </div>
  );
}

// --- Export as compound component ---

export const TimelineChart = Object.assign(TimelineChartRoot, {
  Title,
  Chart,
  Bars,
  YearMarkers,
  Legend,
});

export type { TimelineChartProps, TimelineItem };
