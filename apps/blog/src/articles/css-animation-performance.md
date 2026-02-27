---
title: CSS 애니메이션 성능 최적화
author: DevGon
date: 2025-11-20
tags:
  - CSS
  - 애니메이션
  - 성능
---

부드러운 60fps 애니메이션을 위해 알아야 할 CSS 렌더링 파이프라인과 최적화 기법을 살펴봅니다.

## 렌더링 파이프라인

1. **Style** → 2. **Layout** → 3. **Paint** → 4. **Composite**

애니메이션이 Layout이나 Paint를 트리거하면 성능이 저하됩니다.

## 최적화 원칙

### Composite만 사용하는 속성

`transform`과 `opacity`만 변경하면 GPU 가속을 받아 부드럽게 동작합니다.

```css
/* 나쁨: Layout 트리거 */
.box { animation: move 1s; }
@keyframes move { to { left: 100px; } }

/* 좋음: Composite만 */
.box { animation: move 1s; }
@keyframes move { to { transform: translateX(100px); } }
```

### will-change

```css
.animated-element {
  will-change: transform;
}
```

브라우저에 미리 힌트를 주어 최적화를 준비하게 합니다. 단, 남용하면 오히려 메모리를 낭비합니다.

### 애니메이션 끄기

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

모션에 민감한 사용자를 위한 배려입니다.
