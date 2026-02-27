---
title: 다크모드 제대로 구현하기
author: DevGon
date: 2025-12-10
tags:
  - CSS
  - 다크모드
  - UX
---

다크모드는 단순히 배경을 검게 만드는 것이 아닙니다. 색상 대비, 그림자, 이미지 처리까지 고려해야 자연스러운 다크모드를 구현할 수 있습니다.

## 시맨틱 토큰 전략

하드코딩된 색상 대신 의미 있는 이름의 토큰을 사용합니다.

```css
:root {
  --color-background: #F8F9FA;
  --color-text-primary: #2D3436;
  --color-surface: #FFFFFF;
}

[data-color-mode="dark"] {
  --color-background: #1A1D23;
  --color-text-primary: #E4E6EB;
  --color-surface: #242830;
}
```

## 흔한 실수들

### 1. 순수 검정/흰색 사용

`#000000`과 `#FFFFFF`는 너무 강한 대비를 만듭니다. 약간 부드러운 색상을 사용하세요.

### 2. 그림자 무시

다크모드에서 `box-shadow`는 거의 보이지 않습니다. 대신 미묘한 border나 배경색 차이로 깊이감을 표현하세요.

### 3. 이미지 처리

밝은 배경의 이미지는 다크모드에서 눈이 부실 수 있습니다. `filter: brightness(0.9)`로 약간 어둡게 처리하는 것도 방법입니다.

> 사용자의 시스템 설정을 존중하되, 수동 전환 옵션도 제공하세요. `prefers-color-scheme`과 수동 토글을 함께 구현하는 것이 이상적입니다.
