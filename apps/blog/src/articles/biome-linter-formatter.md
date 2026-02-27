---
title: Biome으로 ESLint + Prettier 대체하기
author: DevGon
date: 2025-12-20
tags:
  - Biome
  - 린터
  - DX
---

Biome는 Rust로 작성된 초고속 린터 겸 포매터입니다. ESLint와 Prettier를 하나의 도구로 대체할 수 있습니다.

## 왜 Biome인가?

- **속도**: ESLint 대비 10~30배 빠른 실행 속도
- **설정 간소화**: 하나의 설정 파일로 린팅과 포매팅 모두 관리
- **일관성**: 린터와 포매터 간 규칙 충돌 없음

## 기본 설정

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "rules": {
      "recommended": true,
      "complexity": {
        "noForEach": "warn"
      }
    }
  }
}
```

## 마이그레이션

기존 ESLint 규칙 대부분을 Biome가 지원합니다. `biome migrate` 명령으로 기존 설정을 변환할 수 있습니다.

> 아직 모든 ESLint 플러그인을 대체하지는 못하지만, 빠르게 발전하고 있어 주시할 가치가 있습니다.
