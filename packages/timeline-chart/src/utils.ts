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

export function formatPeriod(
  startDate: string,
  endDate?: string | null,
): string {
  return `${startDate} ~ ${endDate ?? '현재'}`;
}

/**
 * 배경색의 밝기에 따라 적절한 글자색을 반환합니다.
 * WCAG 상대 휘도 공식을 사용하여 밝은 배경에는 어두운 글자,
 * 어두운 배경에는 흰 글자를 반환합니다.
 */
export function getContrastTextColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255;

  // sRGB -> linear RGB
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return luminance > 0.4 ? '#1a1a1a' : '#ffffff';
}
