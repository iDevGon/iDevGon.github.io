import type { TimelineItem } from '../../components/TimelineChart';
import type { ResumeData } from '../../interfaces/resume';

export function formatPeriod(period: { start: string; end: string | null }) {
  return `${period.start} ~ ${period.end ?? '현재'}`;
}

export function experiencesToTimelineItems(
  experiences: ResumeData['experiences'],
): TimelineItem[] {
  return experiences.map((exp) => ({
    id: exp.company,
    label: exp.company,
    startDate: exp.period.start,
    endDate: exp.period.end,
  }));
}
