---
title: React Error Boundary 활용 패턴
author: DevGon
date: 2025-12-05
tags:
  - React
  - 에러처리
  - UX
---

Error Boundary는 하위 컴포넌트 트리에서 발생한 에러를 잡아 폴백 UI를 보여주는 React의 에러 처리 메커니즘입니다.

## 기본 구현

```tsx
class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

## 전략적 배치

Error Boundary는 한 곳에 두는 것이 아니라, 계층적으로 배치해야 합니다.

- **앱 루트**: 최후의 방어선, 전체 앱 크래시 방지
- **페이지 단위**: 한 페이지의 에러가 다른 페이지에 영향 없도록
- **위젯 단위**: 사이드바 위젯 에러가 메인 콘텐츠를 죽이지 않도록

> 비동기 에러(Promise rejection)는 Error Boundary가 잡지 못합니다. `useErrorBoundary` 훅이나 전역 에러 핸들러를 함께 사용하세요.
