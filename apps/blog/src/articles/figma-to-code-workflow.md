---
title: Figma 디자인을 코드로 옮기는 워크플로우
author: DevGon
date: 2025-11-01
tags:
  - Figma
  - 디자인
  - 워크플로우
---

디자이너가 준 시안을 코드로 정확하게 구현하는 것은 프론트엔드 개발의 핵심 역량입니다. 효율적인 워크플로우를 공유합니다.

## 디자인 분석 순서

1. **레이아웃 구조 파악**: Flex/Grid 구조 결정
2. **반복 패턴 식별**: 재사용 컴포넌트 후보 추출
3. **토큰 매핑**: 색상, 타이포그래피, 간격을 디자인 토큰에 매핑
4. **인터랙션 확인**: 호버, 포커스, 로딩, 에러 상태

## 실수를 줄이는 팁

### 절대값보다 시스템

```css
/* 피하기 */
padding: 13px;
font-size: 15px;

/* 권장 */
padding: var(--spacing-3);
font-size: var(--font-size-md);
```

### Auto Layout = Flexbox

Figma의 Auto Layout 설정은 CSS Flexbox와 거의 1:1 대응됩니다. gap, padding, alignment를 주의 깊게 확인하세요.

> 디자인과 1px 차이에 집착하기보다, 디자인 시스템의 일관성을 유지하는 것이 장기적으로 더 중요합니다.
