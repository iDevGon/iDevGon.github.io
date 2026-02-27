---
title: TanStack Router 파일 기반 라우팅 톺아보기
author: DevGon
date: 2026-01-05
tags:
  - React
  - TanStack Router
  - 라우팅
---

TanStack Router는 타입 안전한 라우팅을 제공하는 차세대 React 라우터입니다. 파일 기반 라우팅으로 직관적인 구조를 만들 수 있습니다.

## 파일 기반 라우팅

```
src/routes/
├── index.tsx          → /
├── about.tsx          → /about
├── articles/
│   ├── index.tsx      → /articles
│   └── $articleId.tsx → /articles/:articleId
```

## 타입 안전한 네비게이션

```tsx
// 존재하지 않는 경로는 컴파일 에러
<Link to="/articles/detail/$articleId" params={{ articleId: '123' }}>
  글 보기
</Link>
```

## Search Params 검증

```tsx
export const Route = createFileRoute('/articles/')({
  validateSearch: (search) => ({
    page: Number(search.page) || 1,
  }),
});
```

URL 쿼리 파라미터까지 타입 안전하게 관리할 수 있다는 점이 가장 큰 장점입니다.
