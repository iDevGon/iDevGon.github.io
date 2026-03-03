import type { CSSProperties, ReactNode } from 'react';
import { Bars } from './Bars';
import { timelineChartStyle } from './styles';
import { useTimeline } from './TimelineProvider';
import { YearMarkers } from './YearMarkers';

export function Chart({ children }: { children?: ReactNode }) {
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
