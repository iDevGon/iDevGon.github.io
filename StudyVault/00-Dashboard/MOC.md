---
module: dashboard
path: 00-Dashboard
keywords: MOC, onboarding, architecture, idevgon-blog
---

# iDevGon Blog — Onboarding Map

#dashboard #onboarding

## Architecture Overview

- **Pattern**: Monorepo SPA + SSG (JAMstack)
- **Tech stack**: React 19, TypeScript, TanStack Router, Panda CSS, Vite (Rolldown), Zustand
- → [[System Architecture]]
- → [[Request Flow]]
- → [[Data Flow]]

## Module Map

| Module | Purpose | Key Entry Point | Notes |
|--------|---------|-----------------|-------|
| Blog App | 메인 블로그 SPA (라우트, 아티클, UI) | `apps/blog/src/main.tsx` | [[Blog App]] |
| Design System | 공용 UI 컴포넌트 + Panda CSS 프리셋 | `packages/design-system/src/index.ts` | [[Design System]] |
| Code Block | Shiki 기반 코드 구문 하이라이팅 | `packages/code-block/src/index.ts` | [[Code Block]] |
| Icons | SVG 아이콘 컴포넌트 | `packages/icons/src/index.ts` | [[Icons]] |
| Timeline Chart | 타임라인 시각화 (Compound Component) | `packages/timeline-chart/src/index.ts` | [[Timeline Chart]] |

## API Surface

| Feature | Type | Module | Notes |
|---------|------|--------|-------|
| `/` | Route | Blog App | 홈 페이지 |
| `/articles/` | Route | Blog App | 아티클 목록 (검색, 필터, 페이지네이션) |
| `/articles/detail/:id/` | Route | Blog App | 아티클 상세 (TOC, Giscus 댓글) |
| `/resume/` | Route | Blog App | 이력서 페이지 |
| `/contact/` | Route | Blog App | 연락처 페이지 |
| `getArticles()` | Util | Blog App | 아티클 메타데이터 로드 + 캐싱 |
| `getArticle(id)` | Util | Blog App | 개별 아티클 전체 로드 |
| `parseFrontmatter()` | Util | Blog App | 마크다운 YAML 프론트매터 파싱 |
| `useColorMode` | Store | Blog App | 컬러모드 상태관리 (Zustand) |

## Getting Started

1. **Prerequisites**: Node.js LTS, pnpm v10
2. **Install**: `pnpm install`
3. **Run dev**: `pnpm dev`
4. **Test**: `pnpm test`
5. **Build**: `pnpm build`
6. **Preview**: `pnpm preview`
7. **Storybook**: `pnpm storybook`
8. **Lint**: `pnpm lint` / `pnpm fix`

## Tag Index

| Tag | Description | Rule |
|-----|-------------|------|
| `#arch-*` | 아키텍처 패턴 | 시스템 레벨 개념에 사용 |
| `#module-*` | 모듈별 태그 | 패키지/앱 단위로 1개씩 |
| `#pattern-*` | 코드 패턴 | 디자인 패턴, 컴포넌트 패턴 |
| `#config-*` | 설정 관련 | 빌드, 린트, 스타일 설정 |
| `#api-*` | 기능/인터페이스 | 라우팅, SEO, 데이터 로딩 등 |
| `#dashboard` | 대시보드 노트 | MOC, Quick Reference |
| `#onboarding` | 온보딩 관련 | Getting Started, Exercises |
| `#practice` | 연습 문제 | Exercises 폴더 전용 |
| `#devops` | 빌드/배포 | CI/CD, GitHub Pages |
| `#quick-reference` | 빠른 참고 | 커맨드, 파일 위치 |

**규칙**: English, lowercase, kebab-case. 레지스트리 외 태그 사용 불가. 하위 태그 사용 시 상위 카테고리 태그 함께 부착.

## Onboarding Path

> 신규 개발자를 위한 추천 학습 순서:

1. [[System Architecture]] — 전체 구조 이해
2. [[Request Flow]] — 요청 흐름 추적
3. [[Data Flow]] — 데이터 흐름 이해
4. [[Blog App]] — 메인 앱 심층 분석
5. [[Design System]] — 공용 컴포넌트 이해
6. [[Code Block]] → [[Icons]] → [[Timeline Chart]] — 패키지 분석
7. [[Build and Deploy]] — 빌드/배포 파이프라인
8. [[Blog App Exercises]] → [[Design System Exercises]] → [[DevOps Exercises]] — 실습
