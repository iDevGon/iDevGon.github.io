import { describe, expect, it } from 'vitest';
import {
  formatDuration,
  formatPeriod,
  getContrastTextColor,
  getMonthsDiff,
  parseDate,
} from '../utils';

describe('parseDate', () => {
  it('"2024.03"을 Date(2024, 2)로 파싱한다', () => {
    const date = parseDate('2024.03');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(2); // 0-indexed
  });

  it('월이 없는 경우 1월을 기본값으로 사용한다', () => {
    const date = parseDate('2024');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0);
  });
});

describe('getMonthsDiff', () => {
  it('같은 달이면 0을 반환한다', () => {
    const d = new Date(2024, 0);
    expect(getMonthsDiff(d, d)).toBe(0);
  });

  it('1년 차이는 12개월을 반환한다', () => {
    const start = new Date(2023, 0);
    const end = new Date(2024, 0);
    expect(getMonthsDiff(start, end)).toBe(12);
  });

  it('연도와 월 차이를 올바르게 계산한다', () => {
    const start = new Date(2023, 2); // March
    const end = new Date(2024, 5); // June
    expect(getMonthsDiff(start, end)).toBe(15);
  });
});

describe('formatDuration', () => {
  it('12개월을 "1.0년"으로 포맷한다', () => {
    expect(formatDuration(12)).toBe('1.0년');
  });

  it('18개월을 "1.5년"으로 포맷한다', () => {
    expect(formatDuration(18)).toBe('1.5년');
  });

  it('6개월을 "0.5년"으로 포맷한다', () => {
    expect(formatDuration(6)).toBe('0.5년');
  });
});

describe('formatPeriod', () => {
  it('endDate가 있으면 기간을 표시한다', () => {
    expect(formatPeriod('2023.01', '2024.06')).toBe('2023.01 ~ 2024.06');
  });

  it('endDate가 없으면 "현재"를 표시한다', () => {
    expect(formatPeriod('2023.01')).toBe('2023.01 ~ 현재');
  });

  it('endDate가 null이면 "현재"를 표시한다', () => {
    expect(formatPeriod('2023.01', null)).toBe('2023.01 ~ 현재');
  });
});

describe('getContrastTextColor', () => {
  it('흰색 배경에는 어두운 글자색을 반환한다', () => {
    expect(getContrastTextColor('#ffffff')).toBe('#1a1a1a');
  });

  it('검정 배경에는 흰 글자색을 반환한다', () => {
    expect(getContrastTextColor('#000000')).toBe('#ffffff');
  });

  it('밝은 색에는 어두운 글자색을 반환한다', () => {
    expect(getContrastTextColor('#ffff00')).toBe('#1a1a1a');
  });

  it('어두운 색에는 흰 글자색을 반환한다', () => {
    expect(getContrastTextColor('#003366')).toBe('#ffffff');
  });
});
