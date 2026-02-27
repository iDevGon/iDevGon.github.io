---
title: Vite 빌드 최적화 가이드
author: DevGon
date: 2025-12-28
tags:
  - Vite
  - 빌드
  - 성능
---

Vite는 빠른 개발 서버로 유명하지만, 프로덕션 빌드 최적화에도 신경 쓸 부분이 많습니다.

## 번들 분석

```bash
npx vite-bundle-visualizer
```

빌드 결과물의 크기를 시각적으로 확인하고, 불필요하게 큰 의존성을 찾아냅니다.

## 코드 스플리팅

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
        },
      },
    },
  },
});
```

## 이미지 최적화

`vite-plugin-imagemin`이나 `@squoosh/lib`를 사용하여 이미지를 자동으로 최적화할 수 있습니다.

## 프리로딩 전략

중요한 청크는 `<link rel="modulepreload">`로 미리 로드하여 초기 로딩 속도를 개선합니다.
