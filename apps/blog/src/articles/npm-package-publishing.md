---
title: npm 패키지 배포 A to Z
author: DevGon
date: 2025-11-08
tags:
  - npm
  - 패키지
  - 오픈소스
---

자체 라이브러리를 npm에 배포하는 전체 과정을 정리합니다. package.json 설정부터 배포 자동화까지 다룹니다.

## package.json 핵심 필드

```json
{
  "name": "@scope/my-lib",
  "version": "1.0.0",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"]
}
```

## 버전 관리

Semantic Versioning을 따릅니다.

- `MAJOR`: 호환되지 않는 API 변경
- `MINOR`: 하위 호환되는 기능 추가
- `PATCH`: 하위 호환되는 버그 수정

## 배포 자동화

GitHub Actions로 태그 기반 자동 배포를 구성하면, `git tag v1.0.0 && git push --tags`만으로 npm에 배포할 수 있습니다.

> `npm pack`으로 배포 전에 패키지 내용을 미리 확인하세요. 의도하지 않은 파일이 포함되는 것을 방지할 수 있습니다.
