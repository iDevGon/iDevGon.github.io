import { Bars } from './Bars';
import { Chart } from './Chart';
import { Legend } from './Legend';
import { Title } from './Title';
import { TimelineProvider } from './TimelineProvider';
import { YearMarkers } from './YearMarkers';

export const TimelineChart = Object.assign(TimelineProvider, {
  Title,
  Chart,
  Bars,
  YearMarkers,
  Legend,
});

export type { TimelineChartProps, TimelineItem } from './types';
