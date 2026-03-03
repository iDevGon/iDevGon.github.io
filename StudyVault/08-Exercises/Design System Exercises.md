---
module: exercises
path: 08-Exercises
keywords: practice, onboarding, design-system, panda-css, components
---

# Design System — Onboarding Exercises

#practice #onboarding #module-design-system

## Related Modules

- [[Design System]]
- [[Blog App]]
- [[System Architecture]]

---

## Exercise 1 — Code Reading [trace]

> `<Typo variant="h1" asChild><h1>제목</h1></Typo>`가 렌더링될 때, 최종 DOM에 어떤 HTML과 스타일이 적용되는지 추적하세요.

> [!answer]- 정답 보기
> 1. `Typo.tsx` → `asChild`가 true이므로 `Component = Slot`
> 2. `typoStyle({ variant: 'h1' })` → Panda CSS `cva` 실행
>    - base: `letterSpacing: '-0.01em'`
>    - variant h1: `fontSize: '2.6rem' (mobile) / '3.2rem' (tablet+)`, `fontWeight: 'bold'`
>    - 최종 className: `css-abc123` (atomic CSS 클래스 조합)
> 3. `Slot.tsx` → `cloneElement(child, mergedProps)`
>    - 자식 `<h1>` 요소에 Typo의 className 병합
>    - 자식의 기존 className과 공백으로 concat
> 4. 최종 DOM: `<h1 class="css-abc123">제목</h1>`
>    - `<span>` 대신 `<h1>` 태그 사용됨 (asChild 덕분)
>    - Typo의 스타일이 적용됨

---

## Exercise 2 — Code Reading [trace]

> 다크모드 전환 시 CSS가 어떻게 업데이트되는지, Panda CSS 프리셋부터 DOM 반영까지 추적하세요.

> [!answer]- 정답 보기
> 1. `ColorModeSwitch` 클릭 → `setColorMode('dark')` (Zustand)
> 2. Zustand persist middleware → `localStorage.setItem('color-mode', '{"state":{"colorMode":"dark"}}')`
> 3. `__root.tsx` useEffect 재실행:
>    - `document.documentElement.setAttribute('data-color-mode', 'dark')`
>    - `document.documentElement.style.colorScheme = 'dark'`
> 4. Panda CSS가 빌드 시 생성한 CSS가 적용:
>    ```css
>    /* base (light) */
>    .css-xyz { background-color: #F8F9FA; color: #2D3436; }
>    /* dark override */
>    [data-color-mode=dark] .css-xyz { background-color: #1A1D23; color: #E4E6EB; }
>    ```
> 5. `data-color-mode=dark` 속성이 `<html>`에 설정되어 dark override 규칙 활성화
> 6. `transition: background-color 0.3s ease, color 0.3s ease` → 부드러운 전환

---

## Exercise 3 — Configuration [config]

> 새로운 시맨틱 토큰 `success`(성공 상태 색상)을 추가하려면 어떻게 하나요?

> [!answer]- 정답 보기
> - File: `packages/design-system/src/preset.ts`
> - Change: `semanticTokens.colors`에 추가:
>   ```typescript
>   success: {
>     value: {
>       base: '#27AE60',
>       _light: '#27AE60',
>       _dark: '#2ECC71',
>     },
>   },
>   ```
> - 사용법: `css({ color: 'success' })` → Panda CSS가 자동으로 dark/light 분기
> - 추가 작업: `pnpm dev` 재시작 (Panda CSS codegen)

---

## Exercise 4 — Configuration [config]

> 디자인 시스템에 `tablet` 브레이크포인트를 `768px`에서 `800px`로 변경하려면?

> [!answer]- 정답 보기
> - File: `packages/design-system/src/preset.ts`
> - Change: `breakpoints.tablet` 값 수정:
>   ```typescript
>   breakpoints: {
>     mobile: '0px',
>     tablet: '800px',   // 768px → 800px
>     desktop: '1024px',
>   },
>   ```
> - 영향 범위: 모든 반응형 스타일 (`{ base: '...', tablet: '...' }`)이 800px 기준으로 변경
> - 주의: Blog App의 `panda.config.ts`가 이 프리셋을 확장하므로, 변경 시 전체 앱에 영향

---

## Exercise 5 — Debugging [debug]

> 새로 만든 컴포넌트에 Panda CSS 스타일이 적용되지 않습니다. 원인을 진단하세요.

> [!answer]- 정답 보기
> 1. 컴포넌트 파일 경로가 `panda.config.ts`의 `include`에 포함되는지 확인:
>    ```typescript
>    include: [
>      './src/**/*.{js,jsx,ts,tsx}',
>      '../../packages/design-system/src/**/*.{js,jsx,ts,tsx}',
>      '../../packages/timeline-chart/src/**/*.{js,jsx,ts,tsx}',
>    ],
>    ```
>    새 패키지를 만들었다면 경로 추가 필요
> 2. `styled-system/` 디렉토리가 최신인지 확인 → `pnpm dev` 재시작
> 3. `css()`, `cva()` 등 Panda CSS 함수를 올바르게 import하는지 확인:
>    - `import { css } from 'styled-system/css'` (O)
>    - `import { css } from '@pandacss/dev'` (X, 빌드 타임 전용)

---

## Exercise 6 — Extension [extend]

> 디자인 시스템에 `Badge` 컴포넌트를 추가하는 전체 과정을 설명하세요.

> [!answer]- 정답 보기
> 1. **컴포넌트 생성**: `packages/design-system/src/components/Badge.tsx`
>    ```tsx
>    import { cva } from 'styled-system/css';
>
>    const badgeStyle = cva({
>      base: { display: 'inline-flex', alignItems: 'center', borderRadius: 'full' },
>      variants: {
>        variant: {
>          success: { bg: 'success', color: 'white' },
>          warning: { bg: 'warning', color: 'white' },
>          error: { bg: 'error', color: 'white' },
>        },
>        size: {
>          sm: { px: '0.8rem', py: '0.2rem', fontSize: '1.2rem' },
>          md: { px: '1.2rem', py: '0.4rem', fontSize: '1.4rem' },
>        },
>      },
>      defaultVariants: { variant: 'success', size: 'sm' },
>    });
>    ```
> 2. **Export 추가**: `src/components/index.ts`에 `export { Badge } from './Badge';`
> 3. **Storybook**: `stories/Badge.stories.tsx` 생성
> 4. **사용**: Blog App에서 `import { Badge } from '@idevgon/design-system';`

---

## Exercise 7 — Code Reading [trace]

> `<Container>` 컴포넌트가 모바일/태블릿/데스크톱에서 각각 어떤 스타일로 렌더링되는지 추적하세요.

> [!answer]- 정답 보기
> `Container.tsx`의 `containerStyle` → `cva`:
>
> | Breakpoint | max-width | paddingInline |
> |------------|-----------|---------------|
> | mobile (0px+) | 100% | 1.6rem |
> | tablet (768px+) | 768px | 2.4rem |
> | desktop (1024px+) | 1200px | 3.2rem |
>
> - `marginInline: auto` → 가운데 정렬
> - `paddingBlock: 3.2rem` → 모든 크기에서 동일한 상하 패딩
> - `styled('div', containerStyle)` → Panda CSS `styled` API 사용

---

> [!summary]- 학습 포인트 요약
> | Topic | Key Takeaway |
> |-------|-------------|
> | CVA 패턴 | `cva()`로 base + variants 조합, TypeScript 자동완성 |
> | Slot/asChild | 자식 요소의 태그를 유지하면서 부모 스타일 병합 |
> | 시맨틱 토큰 | `_light` / `_dark` 값으로 자동 컬러모드 전환 |
> | Panda include | `panda.config.ts`의 `include`에 경로가 없으면 스타일 미생성 |
> | 프리셋 확장 | Design System 프리셋을 Blog App이 확장하는 구조 |
