---
title: React Suspense와 스트리밍 SSR
author: DevGon
date: 2025-11-15
tags:
  - React
  - Suspense
  - SSR
---

React 18의 Suspense와 스트리밍 SSR은 서버 렌더링의 패러다임을 바꿨습니다.

## 기존 SSR의 문제

전통적인 SSR은 "전부 아니면 전무"였습니다. 모든 데이터가 준비될 때까지 사용자는 빈 화면을 봐야 했습니다.

## 스트리밍 SSR

Suspense를 사용하면 준비된 부분부터 점진적으로 스트리밍할 수 있습니다.

```tsx
<Suspense fallback={<HeaderSkeleton />}>
  <Header />
</Suspense>

<Suspense fallback={<ContentSkeleton />}>
  <SlowContent />  {/* 이 부분은 나중에 스트리밍 */}
</Suspense>

<Suspense fallback={<SidebarSkeleton />}>
  <Sidebar />
</Suspense>
```

## 선택적 하이드레이션

스트리밍된 HTML은 사용자가 인터랙션하는 영역부터 우선적으로 하이드레이션됩니다. 사용자가 사이드바를 클릭하면, 사이드바의 하이드레이션 우선순위가 올라갑니다.

이 접근법 덕분에 TTI(Time to Interactive)가 크게 개선됩니다.
