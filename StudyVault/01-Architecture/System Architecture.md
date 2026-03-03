---
module: architecture
path: 01-Architecture
keywords: monorepo, SPA, SSG, JAMstack, pnpm
---

# System Architecture (★★★)

#arch-monorepo #arch-spa #arch-ssg #arch-jamstack

## Purpose

iDevGon Blog는 **pnpm 모노레포** 기반의 개인 기술 블로그다. React 19 SPA에 SSG(정적 사이트 생성)를 결합한 JAMstack 아키텍처로, GitHub Pages에 정적 파일로 배포된다.

## Monorepo Structure

```text
@idevgon/root (private workspace)
│
├── apps/
│   └── blog/            ← 메인 블로그 SPA
│
├── packages/
│   ├── design-system/   ← 공용 UI + Panda CSS 프리셋
│   ├── code-block/      ← Shiki 코드 하이라이팅
│   ├── icons/           ← SVG 아이콘 컴포넌트
│   └── timeline-chart/  ← 타임라인 시각화
│
└── styled-system/       ← Panda CSS 생성 출력 (루트)
```

## Package Dependency Graph

```text
┌──────────────────┐
│    Blog App      │  ← 최상위 소비자
│  @idevgon/blog   │
└──┬──┬──┬──┬──────┘
   │  │  │  │
   │  │  │  └─────────────────────┐
   │  │  │                        │
   │  │  └──────────────┐         │
   │  │                 │         │
   │  ▼                 ▼         ▼
   │ ┌─────────────┐ ┌────────┐ ┌──────────────┐
   │ │Design System│ │  Code  │ │  Timeline    │
   │ │             │ │  Block │ │  Chart       │
   │ └──────┬──────┘ └────────┘ └──────┬───────┘
   │        │         (shiki)          │
   │        │                          │
   │        ▼                          │
   │ ┌──────────┐                      │
   └→│  Icons   │←─────────────────────┘
     └──────────┘
      (leaf node)
```

> [!important]
> - `Icons`는 의존성이 없는 **leaf 패키지**
> - `Design System`은 `Icons`만 의존
> - `Timeline Chart`는 `Design System`(+ 간접적으로 `Icons`) 의존
> - `Code Block`은 외부 라이브러리 `shiki`만 의존
> - `Blog App`은 모든 내부 패키지 + 외부 라이브러리 소비

## Tech Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | React 19 + React Compiler | UI 렌더링 + 자동 메모이제이션 |
| Routing | TanStack Router | 파일 기반 라우팅, 자동 코드 스플리팅 |
| State | Zustand | 컬러모드 상태관리 (localStorage persist) |
| Styling | Panda CSS | Zero-runtime CSS-in-JS, 시맨틱 토큰 |
| Markdown | react-markdown + remark-gfm | 아티클 렌더링 |
| Syntax | Shiki | 코드 하이라이팅 (github-dark 테마) |
| Build | Vite (Rolldown) | 번들링 + 커스텀 플러그인 (prerender, sitemap) |
| Testing | Vitest | 단위 테스트 |
| Lint | Biome | 린트 + 포맷팅 통합 |
| Deploy | GitHub Pages + Actions | 정적 사이트 배포 |
| Comments | Giscus | GitHub Discussions 기반 댓글 |

## Key Architectural Decisions

> [!tip] 왜 모노레포인가?
> - Design System, Icons 등을 **독립 패키지**로 분리하여 재사용성 확보
> - `workspace:*` 프로토콜로 로컬 링킹 (별도 publish 불필요)
> - 단일 `pnpm install`로 전체 의존성 관리

> [!tip] 왜 SPA + SSG 하이브리드인가?
> - SPA: 빠른 페이지 전환, 클라이언트 사이드 검색/필터
> - SSG: 아티클별 프리렌더링으로 SEO 최적화 (meta 태그 + HTML)
> - GitHub Pages의 404.html 전략으로 SPA 라우팅 지원

> [!tip] 왜 Panda CSS인가?
> - **Zero-runtime**: 빌드 타임에 CSS 생성, 런타임 오버헤드 없음
> - **타입 안전**: TypeScript로 스타일 정의, 자동완성 지원
> - **시맨틱 토큰**: 다크/라이트 모드를 토큰 레벨에서 관리

## Related Notes

- [[Request Flow]]
- [[Data Flow]]
- [[Blog App]]
- [[Design System]]
- [[Build and Deploy]]
