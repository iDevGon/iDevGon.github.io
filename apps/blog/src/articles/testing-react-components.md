---
title: React 컴포넌트 테스트 전략
author: DevGon
date: 2026-01-25
tags:
  - React
  - 테스트
  - Vitest
---

좋은 테스트는 구현 세부사항이 아닌 사용자 행동을 검증합니다. Testing Library의 철학을 중심으로 효과적인 테스트 전략을 알아봅니다.

## 테스트 피라미드

1. **단위 테스트**: 유틸 함수, 커스텀 훅
2. **통합 테스트**: 컴포넌트 간 상호작용
3. **E2E 테스트**: 전체 사용자 플로우

## Testing Library 핵심 원칙

```tsx
// 나쁜 예: 구현에 의존
const { container } = render(<Button />);
container.querySelector('.btn-primary');

// 좋은 예: 사용자 관점
render(<Button>제출</Button>);
screen.getByRole('button', { name: '제출' });
```

### 비동기 테스트

```tsx
test('데이터 로딩 후 목록을 보여준다', async () => {
  render(<UserList />);

  expect(screen.getByText('로딩 중...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });
});
```

테스트는 리팩토링의 안전망입니다. 100% 커버리지보다 의미 있는 테스트가 중요합니다.
