---
title: Turborepo로 모노레포 구축하기
author: DevGon
date: 2026-02-10
tags:
  - 모노레포
  - Turborepo
  - DX
---

프로젝트가 커지면 여러 패키지를 하나의 저장소에서 관리하는 모노레포 전략이 효과적입니다. Turborepo는 이를 쉽게 만들어줍니다.

## Turborepo의 핵심 기능

### 캐싱

Turborepo는 빌드 결과를 캐싱합니다. 코드가 변경되지 않은 패키지는 다시 빌드하지 않아 CI/CD 시간을 크게 단축할 수 있습니다.

### 병렬 실행

의존 관계를 분석하여 독립적인 태스크를 병렬로 실행합니다.

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### 리모트 캐싱

팀원 간에 빌드 캐시를 공유할 수 있어, 로컬에서도 CI 수준의 빌드 속도를 경험할 수 있습니다.

> 모노레포는 은탄환이 아닙니다. 프로젝트 규모와 팀 구성에 맞는 선택이 중요합니다.
