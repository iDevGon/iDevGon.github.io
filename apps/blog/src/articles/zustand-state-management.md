---
title: Zustand로 간결한 상태 관리
author: DevGon
date: 2026-01-30
tags:
  - React
  - Zustand
  - 상태관리
---

Zustand는 최소한의 API로 강력한 상태 관리를 제공하는 라이브러리입니다. Redux의 복잡함 없이도 전역 상태를 깔끔하게 다룰 수 있습니다.

## 기본 사용법

```typescript
import { create } from 'zustand';

interface CounterStore {ㅈ
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

## 왜 Zustand인가?

- **보일러플레이트 최소화**: 액션, 리듀서, 디스패치 없이 함수 하나로 끝
- **TypeScript 친화적**: 타입 추론이 자연스럽게 동작
- **React 외부에서도 사용 가능**: `getState()`, `setState()`로 어디서든 접근

> Context API의 리렌더링 문제가 신경 쓰인다면 Zustand를 고려해보세요. 선택적 구독(selector)을 기본 지원합니다.
