---
module: timeline-chart
path: packages/timeline-chart
keywords: compound-component, context-provider, visualization, timeline
---

# Timeline Chart (★★)

#module-timeline-chart #pattern-compound-component #pattern-context-provider

## Purpose

`@idevgon/timeline-chart`는 경력/경험을 시각적 타임라인 바 차트로 표현하는 컴파운드 컴포넌트를 제공한다. 이력서 페이지에서 사용된다.

## Key Files

| File | Role |
|------|------|
| `src/index.ts` | 컴파운드 컴포넌트 조합 + export |
| `src/types.ts` | `TimelineChartProps`, `TimelineItem`, `TimelineContextValue` 타입 |
| `src/TimelineProvider.tsx` | Context Provider + 차원 계산 |
| `src/Chart.tsx` | 메인 차트 래퍼 (`--chart-height` CSS 변수) |
| `src/Bars.tsx` | 타임라인 바 렌더링 (위치, 너비 계산) |
| `src/Legend.tsx` | 범례 컴포넌트 |
| `src/Title.tsx` | 타이틀 컴포넌트 |
| `src/YearMarkers.tsx` | 연도 표시 (x축 레이블) |
| `src/styles.ts` | Panda CSS 스타일 |
| `src/utils.ts` | 날짜 계산 유틸리티 (getMonthsDiff, parseDate) |
| `src/__tests__/utils.test.ts` | 유틸리티 테스트 |

## Public Interface

| Export | Type | Description |
|--------|------|-------------|
| `TimelineChart` | Compound Component | 네임스페이스 객체 |
| `TimelineChart.Root` | Provider | Context + 차원 계산 |
| `TimelineChart.Chart` | Component | SVG 차트 래퍼 |
| `TimelineChart.Bars` | Component | 타임라인 바 |
| `TimelineChart.YearMarkers` | Component | 연도 레이블 |
| `TimelineChart.Legend` | Component | 범례 |
| `TimelineChart.Title` | Component | 타이틀 |

## Internal Flow

```text
<TimelineChart.Root items={[...]} colors={[...]} barHeight={40}>
  │
  ├── useMemo: 차원 계산
  │   ├── now = new Date()
  │   ├── earliestStart = min(items.startDate)
  │   ├── totalMonths = getMonthsDiff(earliest, now)
  │   ├── years = [earliest.year ... now.year]
  │   └── chartHeight = PADDING_TOP + items * (barHeight + gap) + MARKERS + PADDING_BOTTOM
  │
  └── <TimelineContext value={ctx}>
        └── children (sub-components)
              │
              ├── <TimelineChart.Title>  → 단순 텍스트 렌더
              │
              ├── <TimelineChart.Chart>  → CSS 변수 --chart-height 설정
              │     │
              │     ├── <TimelineChart.Bars>
              │     │   └── items.map(item =>
              │     │         ├── x = getMonthsDiff(earliest, item.start) / totalMonths * 100%
              │     │         ├── width = getMonthsDiff(item.start, item.end ?? now) / totalMonths * 100%
              │     │         ├── y = index * (barHeight + gap)
              │     │         └── render bar + label
              │     │       )
              │     │
              │     └── <TimelineChart.YearMarkers>
              │         └── years.map(year =>
              │               x = getMonthsDiff(earliest, Jan 1 of year) / totalMonths * 100%
              │             )
              │
              └── <TimelineChart.Legend>  → colors + labels 매핑
```

### Compound Component 패턴

```text
// index.ts에서 네임스페이스 조합
const TimelineChart = {
  Root: TimelineProvider,
  Chart: Chart,
  Bars: Bars,
  YearMarkers: YearMarkers,
  Legend: Legend,
  Title: Title,
};

// 사용 예:
<TimelineChart.Root items={experiences}>
  <TimelineChart.Title>경력</TimelineChart.Title>
  <TimelineChart.Chart>
    <TimelineChart.Bars />
    <TimelineChart.YearMarkers />
  </TimelineChart.Chart>
  <TimelineChart.Legend />
</TimelineChart.Root>
```

> [!important] Context 기반 상태 공유
> Provider가 계산한 치수(차원, 연도 범위 등)를 Context로 공유한다.
> 각 sub-component는 `useTimeline()` 훅으로 Context를 소비한다.
> 이로써 props drilling 없이 유연한 조합이 가능하다.

## Dependencies

| Direction | Module / Service | Via |
|-----------|-----------------|-----|
| **Uses** | @idevgon/design-system | Typo 컴포넌트 |
| **Used by** | @idevgon/blog | 이력서 페이지 |

## Configuration

| Config File | Purpose |
|------------|---------|
| `panda.config.ts` | Panda CSS (design-system 프리셋 확장) |
| `tsconfig.json` | TypeScript 설정 |

## Testing

- Run: `vitest` (패키지 내부)
- 테스트: `src/__tests__/utils.test.ts` (날짜 유틸리티)

## Related Notes

- [[Design System]]
- [[Blog App]]
- [[System Architecture]]
