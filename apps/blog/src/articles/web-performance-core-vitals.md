---
title: Core Web Vitals 최적화 전략
author: DevGon
date: 2026-02-05
tags:
  - 성능
  - Core Web Vitals
  - UX
---

Google의 Core Web Vitals는 사용자 경험을 측정하는 핵심 지표입니다. SEO에도 직접적인 영향을 미치므로 반드시 챙겨야 합니다.

## 세 가지 핵심 지표

### LCP (Largest Contentful Paint)

가장 큰 콘텐츠가 화면에 렌더링되는 시간입니다. 2.5초 이내가 좋음 기준입니다.

- 이미지 최적화 (WebP/AVIF 포맷)
- 폰트 프리로드
- 서버 응답 시간 단축

### INP (Interaction to Next Paint)

사용자 인터랙션 후 다음 화면이 그려지기까지의 시간입니다.

- 긴 태스크 분할
- `requestIdleCallback` 활용
- 불필요한 리렌더링 방지

### CLS (Cumulative Layout Shift)

레이아웃이 얼마나 불안정하게 변하는지를 측정합니다.

- 이미지/비디오에 명시적 크기 지정
- 동적 콘텐츠 삽입 시 공간 예약
- 웹폰트 로딩 전략 (font-display: swap)
