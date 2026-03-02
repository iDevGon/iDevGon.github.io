import { Typo } from '@idevgon/design-system';
import type { CSSProperties } from 'react';
import { timelineBarStyle } from './styles';
import { BAR_GAP, CHART_PADDING_TOP, useTimeline } from './TimelineProvider';
import {
  formatDuration,
  formatPeriod,
  getContrastTextColor,
  getMonthsDiff,
  parseDate,
} from './utils';

export function Bars() {
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
