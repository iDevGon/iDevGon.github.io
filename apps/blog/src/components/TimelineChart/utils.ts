export function parseDate(dateStr: string): Date {
  const [year, month] = dateStr.split('.').map(Number);
  return new Date(year, (month || 1) - 1);
}

export function getMonthsDiff(start: Date, end: Date): number {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  );
}

export function formatDuration(months: number): string {
  const years = (months / 12).toFixed(1);
  return `${years}년`;
}

export function formatPeriod(startDate: string, endDate?: string | null): string {
  return `${startDate} ~ ${endDate ?? '현재'}`;
}
