import { Typo } from '@idevgon/design-system';
import type { CSSProperties } from 'react';
import { timelineYearMarkersStyle, yearMarkerStyle } from './styles';
import { useTimeline } from './TimelineProvider';
import { getMonthsDiff } from './utils';

export function YearMarkers() {
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
