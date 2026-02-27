---
title: 모던 반응형 디자인 패턴
author: DevGon
date: 2025-10-18
tags:
  - CSS
  - 반응형
  - 레이아웃
---

미디어 쿼리만으로 반응형을 구현하던 시대는 지나갔습니다. CSS의 내재적 디자인 기법으로 더 유연한 레이아웃을 만들 수 있습니다.

## 내재적 디자인 (Intrinsic Design)

### clamp()

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

최소값, 선호값, 최대값을 한 줄로 지정합니다. 별도 미디어 쿼리 없이도 반응형 타이포그래피가 완성됩니다.

### Grid auto-fill / auto-fit

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
```

아이템 수에 관계없이 자동으로 열 수가 조정됩니다.

### Flex와 min()

```css
.container {
  width: min(90%, 1200px);
  margin-inline: auto;
}
```

`max-width` + `width` 조합을 한 줄로 대체합니다.

## 미디어 쿼리는 언제?

내재적 디자인으로 해결되지 않는 레이아웃의 구조적 변경에만 미디어 쿼리를 사용하세요. 예: 1단 → 2단 레이아웃 전환.
