---
title: Panda CSS로 디자인 시스템 구축하기
author: DevGon
date: 2026-01-20
tags:
  - CSS
  - Panda CSS
  - 디자인시스템
---

Panda CSS는 빌드 타임에 CSS를 생성하는 제로 런타임 CSS-in-JS 솔루션입니다. 타입 안전한 스타일링과 디자인 토큰을 제공합니다.

## 핵심 개념

### 토큰 기반 스타일링

```typescript
const preset = definePreset({
  tokens: {
    colors: {
      primary: { value: '#4F7CAC' },
      secondary: { value: '#C0E0DE' },
    },
  },
});
```

### 시맨틱 토큰

디자인 의도를 담은 시맨틱 토큰으로 다크모드를 자연스럽게 지원합니다.

```typescript
semanticTokens: {
  colors: {
    background: {
      value: { _light: '#F8F9FA', _dark: '#1A1D23' },
    },
  },
}
```

## Panda CSS의 장점

- **제로 런타임**: 빌드 시 CSS 생성, 런타임 오버헤드 없음
- **타입 안전**: 잘못된 속성이나 값을 컴파일 타임에 잡아냄
- **조건부 스타일**: `_hover`, `_dark` 같은 조건 수식어 기본 제공

> styled-components나 Emotion에서 마이그레이션을 고려한다면, Panda CSS의 `css()` 함수가 가장 자연스러운 전환 경로입니다.
