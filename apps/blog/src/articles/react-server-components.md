---
title: React Server Components 깊이 이해하기
author: DevGon
date: 2026-02-25
tags:
  - React
  - RSC
  - 서버컴포넌트
---

React Server Components(RSC)는 서버에서만 실행되는 컴포넌트로, 클라이언트 번들 크기를 줄이면서도 풍부한 인터랙션을 제공할 수 있게 해줍니다.

## RSC의 핵심 개념

서버 컴포넌트는 데이터베이스나 파일 시스템에 직접 접근할 수 있으며, 그 결과를 클라이언트에 스트리밍 방식으로 전달합니다.

### 장점

- **번들 크기 감소**: 서버에서만 실행되므로 클라이언트 JS에 포함되지 않음
- **직접 데이터 접근**: API 레이어 없이 DB에 직접 쿼리 가능
- **자동 코드 스플리팅**: 클라이언트 컴포넌트를 자동으로 lazy load

### 주의할 점

> 서버 컴포넌트에서는 `useState`, `useEffect` 같은 클라이언트 훅을 사용할 수 없습니다. 인터랙티브한 부분은 반드시 `'use client'` 지시문을 사용해야 합니다.

```tsx
// 서버 컴포넌트 (기본)
async function PostList() {
  const posts = await db.posts.findMany();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

RSC는 아직 발전 중인 패러다임이지만, 웹 개발의 미래를 이끌어 갈 중요한 기술입니다.
