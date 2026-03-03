---
module: devops
path: .github/workflows
keywords: vite, build, deploy, github-pages, ci-cd, prerender, sitemap
---

# Build and Deploy (★★★)

#devops #config-vite #config-ci-cd #arch-ssg

## Purpose

프로젝트의 빌드 파이프라인, 커스텀 Vite 플러그인(프리렌더, 사이트맵), GitHub Pages 배포 워크플로우를 다룬다.

## Key Files

| File | Role |
|------|------|
| `apps/blog/vite.config.ts` | Vite 빌드 설정 (플러그인, alias, CSS) |
| `apps/blog/vite-plugin-prerender.ts` | SSG: 아티클별 정적 HTML 생성 |
| `apps/blog/vite-plugin-sitemap.ts` | 사이트맵 XML 생성 |
| `apps/blog/prerender-utils.ts` | 프리렌더 유틸 (마크다운→HTML, 메타태그) |
| `.github/workflows/deploy.yml` | GitHub Actions CI/CD |
| `biome.json` | Biome 린트/포맷 설정 |
| `tsconfig.json` | 루트 TypeScript project references |

## Build Chain

```text
pnpm build
  │
  ▼
pnpm --filter @idevgon/blog build
  │
  ▼
tsc -b                          ← TypeScript 타입 체크 (--noEmit)
  ├── 프로젝트 참조로 모든 패키지 체크
  └── 타입 에러 시 빌드 실패
  │
  ▼
vite build                      ← 번들링 + SSG
  │
  ├── [Plugin] TanStack Router
  │   └── routeTree.gen.ts 자동 생성
  │       └── autoCodeSplitting: true (라우트별 청크)
  │
  ├── [Plugin] React + Babel
  │   ├── JSX 변환
  │   └── babel-plugin-react-compiler (자동 메모이제이션)
  │
  ├── [Plugin] Panda CSS (PostCSS)
  │   └── styled-system/ 코드젠 → 정적 CSS 생성
  │
  ├── [Rolldown] 번들링 + 트리쉐이킹 + 코드 스플리팅
  │   └── CSS 미니파이: esbuild
  │
  ├── [closeBundle] Sitemap Plugin
  │   └── dist/sitemap.xml 생성
  │       ├── 정적 라우트 (/, /articles)
  │       └── 동적 라우트 (articles/*.md에서 추출)
  │
  └── [closeBundle] Prerender Plugin
      └── 각 아티클별 정적 HTML 생성
          ├── dist/index.html 템플릿 읽기
          ├── 메타 태그 주입 (OG, Twitter, canonical)
          ├── 마크다운 → HTML 변환 (프리렌더)
          └── dist/articles/detail/{id}/index.html 출력
```

## Prerender Plugin 상세

```text
Input:  src/articles/my-article.md
Output: dist/articles/detail/my-article/index.html

처리 과정:
1. dist/index.html (SPA 템플릿) 읽기
2. 기존 meta 태그 제거 (title, description, OG, Twitter)
3. 아티클 프론트매터에서 새 meta 태그 생성
4. <meta name="theme-color"> 뒤에 주입
5. 마크다운 → HTML 변환 (간단한 변환)
6. <article id="prerendered-article" aria-hidden="true" style="position:absolute;left:-9999px;">
     {변환된 HTML}
   </article>
7. <div id="root"></div> 앞에 삽입
8. dist/articles/detail/{id}/index.html로 저장
```

> [!important] 프리렌더링의 목적
> - **SEO**: 크롤러가 JS 없이도 아티클 메타 태그 + 본문 읽기 가능
> - **성능**: 브라우저가 JS 로드 전에 HTML 콘텐츠 표시
> - **접근성**: JS 비활성화 시에도 콘텐츠 접근 가능
> - React 하이드레이션 후 `#prerendered-article`은 제거됨

## Sitemap Plugin 상세

```text
Output: dist/sitemap.xml

URL 목록:
├── / (priority: 1.0, changefreq: weekly)
├── /articles (priority: 0.8, changefreq: monthly)
└── /articles/detail/{id} (priority: 0.9, changefreq: monthly)
    └── src/articles/*.md 에서 동적 추출
```

## GitHub Actions CI/CD

```text
Trigger: push to main branch (또는 수동 dispatch)
  │
  ▼
ubuntu-latest
  │
  ├── Checkout code
  ├── Install pnpm v10
  ├── Setup Node.js LTS (with pnpm cache)
  ├── pnpm install --frozen-lockfile
  ├── pnpm test              ← Vitest 실행
  ├── pnpm run build         ← tsc + vite build
  ├── cp index.html → 404.html  ← SPA 라우팅 지원
  ├── Upload artifact (dist/)
  └── Deploy to GitHub Pages
```

> [!tip] 404.html 전략
> GitHub Pages는 존재하지 않는 경로에 대해 `404.html`을 서빙한다.
> `index.html`을 `404.html`로 복사하면 모든 경로에서 SPA가 로드되고,
> TanStack Router가 클라이언트 사이드에서 올바른 라우트를 렌더링한다.

## Biome Configuration

| 설정 | 값 |
|------|-----|
| Indent | 2 spaces |
| Line width | 80 |
| Semicolons | always |
| Quotes (JS) | single |
| Quotes (JSX) | double |
| Trailing commas | all |
| Arrow parens | always |
| Line ending | LF |

주요 린트 규칙:
- `noUnusedVariables`: error
- `useExhaustiveDependencies`: error
- `useHookAtTopLevel`: error
- `noConsole` (except warn, error): error
- A11y: `useAltText`, `useAnchorContent`, `useHeadingContent` 등

## Vite Aliases

| Alias | Path |
|-------|------|
| `@/` | `apps/blog/src/` |
| `styled-system/` | `apps/blog/styled-system/` |

## Dependencies

| Direction | Module / Service | Via |
|-----------|-----------------|-----|
| **Uses** | GitHub Pages | 배포 타겟 |
| **Uses** | GitHub Actions | CI/CD 파이프라인 |
| **Uses** | Vite (Rolldown) | 빌드 도구 |
| **Uses** | Biome | 코드 품질 |

## Related Notes

- [[System Architecture]]
- [[Blog App]]
- [[Request Flow]]
- [[Data Flow]]
