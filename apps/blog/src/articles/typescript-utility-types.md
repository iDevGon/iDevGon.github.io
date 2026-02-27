---
title: TypeScript 유틸리티 타입 마스터하기
author: DevGon
date: 2026-02-20
tags:
  - TypeScript
  - 타입시스템
---

TypeScript의 내장 유틸리티 타입을 잘 활용하면 반복적인 타입 정의를 줄이고 더 안전한 코드를 작성할 수 있습니다.

## 자주 쓰는 유틸리티 타입

### Partial과 Required

```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

// 모든 필드가 선택적
type UpdateUser = Partial<User>;

// 모든 필드가 필수
type StrictUser = Required<User>;
```

### Pick과 Omit

특정 필드만 선택하거나 제외할 때 사용합니다.

```typescript
type UserPreview = Pick<User, 'name' | 'email'>;
type UserWithoutAge = Omit<User, 'age'>;
```

### Record

키-값 쌍의 타입을 정의할 때 유용합니다.

```typescript
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
```

> 유틸리티 타입은 조합해서 사용할 때 진정한 위력을 발휘합니다. `Partial<Pick<User, 'name' | 'email'>>` 같은 조합도 가능합니다.
