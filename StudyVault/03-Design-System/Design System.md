---
module: design-system
path: packages/design-system
keywords: panda-css, components, preset, tokens, storybook
---

# Design System (★★★)

#module-design-system #pattern-cva #pattern-slot #config-panda-css

## Purpose

`@idevgon/design-system`은 블로그 전체에서 사용하는 공용 UI 컴포넌트와 Panda CSS 커스텀 프리셋을 제공한다. 일관된 디자인 언어, 다크/라이트 모드 시맨틱 토큰, 반응형 브레이크포인트를 정의한다.

## Key Files

| File | Role |
|------|------|
| `src/index.ts` | 컴포넌트 re-export |
| `src/preset.ts` | Panda CSS 커스텀 프리셋 (토큰, 시맨틱토큰, 글로벌CSS) |
| `src/components/index.ts` | 개별 컴포넌트 export |
| `src/components/Button.tsx` | 버튼 (variant: solid/outline/ghost) |
| `src/components/Card.tsx` | 카드 컨테이너 |
| `src/components/ColorModeSwitch.tsx` | 다크/라이트 토글 |
| `src/components/Container.tsx` | 반응형 max-width 래퍼 |
| `src/components/Flex.tsx` | Flexbox 레이아웃 헬퍼 |
| `src/components/Pagination.tsx` | 페이지네이션 컨트롤 |
| `src/components/SectionTitle.tsx` | 섹션 제목 |
| `src/components/Skeleton.tsx` | 로딩 스켈레톤 UI |
| `src/components/Slot.tsx` | Slot 패턴 (polymorphic 컴포넌트) |
| `src/components/Tag.tsx` | 태그/뱃지 |
| `src/components/Typo.tsx` | 타이포그래피 (variant: h1~h6, body1~2, caption) |
| `stories/*.stories.tsx` | Storybook 문서화 |
| `panda.config.ts` | 패키지 전용 Panda 설정 |

## Public Interface

| Export | Type | Description |
|--------|------|-------------|
| `Button` | Component | 버튼 (solid/outline/ghost, size: sm/md/lg) |
| `Card` | Component | 카드 컨테이너 (hover 효과) |
| `ColorModeSwitch` | Component | 컬러모드 토글 (system/light/dark) |
| `Container` | Component | 반응형 max-width wrapper |
| `Flex` | Component | Flexbox div |
| `Pagination` | Component | 페이지 네비게이션 |
| `SectionTitle` | Component | 섹션 헤딩 |
| `Skeleton` | Component | 로딩 플레이스홀더 |
| `Slot` | Component | Props 병합 유틸 (polymorphic) |
| `Tag` | Component | 태그 뱃지 |
| `Typo` | Component | 타이포그래피 (variant 기반) |
| `idevgonPreset` | Panda Preset | 디자인 토큰 + 글로벌 CSS |

## Internal Flow — Panda CSS Preset

```text
preset.ts (idevgonPreset)
  │
  ├── theme.extend.tokens
  │   ├── colors.brand (primary, secondary + 변형)
  │   ├── radii (sm, md, lg, xl, full)
  │   ├── fonts (sans: Pretendard, mono: JetBrains Mono)
  │   └── animations (wiggle, fadeIn, fadeInUp, slideIn, blink, shimmer)
  │
  ├── theme.extend.breakpoints
  │   ├── mobile: 0px
  │   ├── tablet: 768px
  │   └── desktop: 1024px
  │
  ├── theme.extend.semanticTokens.colors
  │   ├── background     { _light: '#F8F9FA', _dark: '#1A1D23' }
  │   ├── surface        { _light: '#FFFFFF', _dark: '#22252B' }
  │   ├── textPrimary    { _light: '#2D3436', _dark: '#E4E6EB' }
  │   ├── textSecondary  { _light: '#636E72', _dark: '#B0B3B8' }
  │   ├── textMuted      { _light: '#B2BEC3', _dark: '#6B7280' }
  │   ├── border         { _light: '#DFE6E9', _dark: '#2D3239' }
  │   ├── primary.*      (brand 기반, 모드별)
  │   ├── tag.*          (배경, 텍스트, 호버)
  │   └── codeBlock.*    (배경, 텍스트, 인라인)
  │
  ├── conditions
  │   ├── light: '[data-color-mode=light] &'
  │   ├── dark: '[data-color-mode=dark] &'
  │   └── print: '@media print'
  │
  └── globalCss
      ├── *, *::before, *::after: box-sizing border-box
      ├── html, body: fontSize 62.5% (10px = 1rem)
      ├── html: scrollBehavior smooth, antialiased
      ├── body: background, color, transition
      ├── a: color inherit, no underline
      ├── img: max-width 100%, display block
      ├── ::selection: brand 색상
      ├── @media print: 프린트 최적화
      └── prefers-reduced-motion: 애니메이션 제거
```

## Component Patterns

### CVA (Class Variance Authority) Pattern

Panda CSS의 `cva()`로 variant 기반 스타일링:

```text
cva({
  base: { ... },           ← 모든 variant에 공통
  variants: {
    variant: {
      solid: { ... },      ← variant="solid"
      outline: { ... },
      ghost: { ... },
    },
    size: {
      sm: { ... },
      md: { ... },
      lg: { ... },
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})
```

### Slot Pattern (Polymorphic Components)

```text
<Typo variant="h1">          → renders <span> (default)
<Typo variant="h1" asChild>
  <h1 className="custom">   → renders <h1> with Typo styles merged
</Typo>

Slot.tsx:
  cloneElement(child, mergedProps)
  ├── className: 공백으로 concat
  ├── style: 객체 merge
  ├── on* handlers: 체이닝
  └── ref: mergeRefs
```

> [!important] asChild 패턴
> `asChild` prop을 전달하면 컴포넌트가 자식 요소의 HTML 태그를 사용하되,
> 부모의 스타일과 이벤트 핸들러를 병합한다. Radix UI에서 영감받은 패턴.

## Dependencies

| Direction | Module / Service | Via |
|-----------|-----------------|-----|
| **Uses** | @idevgon/icons | 아이콘 (ColorModeSwitch 내부) |
| **Used by** | @idevgon/blog | UI 컴포넌트 소비 |
| **Used by** | @idevgon/timeline-chart | UI 컴포넌트 소비 |

## Configuration

| Config File | Purpose |
|------------|---------|
| `panda.config.ts` | Panda CSS (Storybook용 별도 설정) |
| `.storybook/main.ts` | Storybook 빌드 설정 |
| `.storybook/preview.ts` | Storybook 글로벌 데코레이터 |

## Testing

- Run: `pnpm storybook` (시각적 컴포넌트 문서)
- Framework: Storybook 8.6
- 별도 단위 테스트는 없음 (Storybook으로 시각적 검증)

## Related Notes

- [[System Architecture]]
- [[Blog App]]
- [[Icons]]
- [[Timeline Chart]]
- [[Build and Deploy]]
