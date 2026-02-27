---
title: CSS Container Queries 실전 활용
author: DevGon
date: 2026-02-15
tags:
  - CSS
  - 반응형
  - Container Queries
---

미디어 쿼리가 뷰포트 기준이라면, 컨테이너 쿼리는 부모 요소의 크기를 기준으로 스타일을 적용할 수 있습니다.

## 기본 사용법

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## 왜 필요한가?

컴포넌트 기반 개발에서 같은 카드 컴포넌트가 사이드바에도, 메인 콘텐츠 영역에도 들어갈 수 있습니다. 미디어 쿼리로는 이 두 상황을 구분할 수 없지만, 컨테이너 쿼리는 가능합니다.

### 브라우저 지원

2024년 기준으로 모든 주요 브라우저에서 지원됩니다. 프로덕션에서 안심하고 사용할 수 있는 수준입니다.
