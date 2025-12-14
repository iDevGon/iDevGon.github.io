import { Typo } from '../Typo';
import {
  legendColorStyle,
  legendItemStyle,
  timelineBarStyle,
  timelineChartStyle,
  timelineContainerStyle,
  timelineLegendStyle,
  timelineYearMarkersStyle,
  yearMarkerStyle,
} from './styles';
import type { TimelineChartProps, TimelineItem } from './types';

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const DEFAULT_BAR_HEIGHT = 40;
const BAR_GAP = 5;
const YEAR_MARKERS_HEIGHT = 30;
const CHART_PADDING_TOP = 20;

function parseDate(dateStr: string): Date {
  const [year, month] = dateStr.split('.').map(Number);
  return new Date(year, (month || 1) - 1);
}

function getMonthsDiff(start: Date, end: Date): number {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
}

function formatDuration(months: number): string {
  const years = (months / 12).toFixed(1);
  return `${years}년`;
}

function formatPeriod(startDate: string, endDate?: string | null): string {
  return `${startDate} ~ ${endDate ?? '현재'}`;
}

export function TimelineChart({
  items,
  title,
  colors = DEFAULT_COLORS,
  showLegend = true,
  showYearMarkers = true,
  barHeight = DEFAULT_BAR_HEIGHT,
  className,
}: TimelineChartProps) {
  const now = new Date();

  // 전체 기간 계산
  const allStartDates = items.map((item) => parseDate(item.startDate));
  const earliestStart = new Date(
    Math.min(...allStartDates.map((d) => d.getTime())),
  );
  const totalMonths = getMonthsDiff(earliestStart, now);

  // 연도 마커 생성
  const startYear = earliestStart.getFullYear();
  const endYear = now.getFullYear();
  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
  }

  // 차트 높이 계산
  const chartHeight =
    CHART_PADDING_TOP +
    items.length * (barHeight + BAR_GAP) +
    YEAR_MARKERS_HEIGHT;

  return (
    <div className={`${timelineContainerStyle} ${className ?? ''}`}>
      {title && (
        <Typo variant="body2" asChild>
          <p style={{ marginBottom: '1rem', color: 'gray' }}>{title}</p>
        </Typo>
      )}

      <div
        className={timelineChartStyle}
        style={{ height: `${chartHeight}px` }}
      >
        {/* Timeline Bars */}
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
              style={{
                left: `${leftPercent}%`,
                width: `${Math.max(widthPercent, 5)}%`,
                top: `${CHART_PADDING_TOP + idx * (barHeight + BAR_GAP)}px`,
                height: `${barHeight}px`,
                backgroundColor: colors[idx % colors.length],
              }}
              title={`${item.label}: ${formatPeriod(item.startDate, item.endDate)} (${formatDuration(duration)})`}
            >
              {widthPercent > 15 && <span>{item.label}</span>}
            </div>
          );
        })}

        {/* Year Markers */}
        {showYearMarkers && (
          <div className={timelineYearMarkersStyle}>
            {years.map((year) => {
              const yearStart = new Date(year, 0);
              const offset = getMonthsDiff(earliestStart, yearStart);
              const leftPercent = (offset / totalMonths) * 100;

              return (
                <span
                  key={year}
                  className={yearMarkerStyle}
                  style={{ left: `${Math.max(leftPercent, 2)}%` }}
                >
                  {year}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className={timelineLegendStyle}>
          {items.map((item, idx) => {
            const startDate = parseDate(item.startDate);
            const endDate = item.endDate ? parseDate(item.endDate) : now;
            const duration = getMonthsDiff(startDate, endDate);

            return (
              <div key={item.id} className={legendItemStyle}>
                <span
                  className={legendColorStyle}
                  style={{
                    backgroundColor: colors[idx % colors.length],
                  }}
                />
                <Typo variant="caption">
                  {item.label} ({formatDuration(duration)})
                </Typo>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export type { TimelineChartProps, TimelineItem };
