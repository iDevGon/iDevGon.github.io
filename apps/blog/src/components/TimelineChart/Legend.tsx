import { Typo } from '@idevgon/design-system';
import type { CSSProperties } from 'react';
import { legendColorStyle, legendItemStyle, timelineLegendStyle } from './styles';
import { useTimeline } from './TimelineProvider';
import { formatDuration, getMonthsDiff, parseDate } from './utils';

export function Legend() {
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
