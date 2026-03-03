---
module: blog
path: apps/blog
keywords: SPA, routing, articles, hooks, state-management
---

# Blog App (★★★)

#module-blog #arch-spa #api-routing

## Purpose

`@idevgon/blog`는 모노레포의 메인 애플리케이션으로, React 19 SPA 블로그를 구현한다. 파일 기반 라우팅(TanStack Router), 마크다운 아티클 렌더링, 검색/필터, 다크모드, SEO를 담당한다.

## Key Files

| File | Role |
|------|------|
| `src/main.tsx` | 앱 진입점: Router 생성 + React 렌더 |
| `src/routeTree.gen.ts` | TanStack Router 자동 생성 라우트 트리 |
| `src/routes/__root.tsx` | 루트 레이아웃: Header + Outlet + Footer + 컬러모드 |
| `src/routes/index.tsx` | 홈 페이지 (`/`) |
| `src/routes/articles/index.tsx` | 아티클 목록 (검색, 필터, 페이지네이션) |
| `src/routes/articles/detail/$articleId/index.tsx` | 아티클 상세 (마크다운, TOC, 댓글) |
| `src/routes/resume/index.tsx` | 이력서 페이지 |
| `src/routes/contact/index.tsx` | 연락처 페이지 |
| `src/utils/articleLoader.ts` | 아티클 glob import + 캐싱 + 유틸 |
| `src/utils/parseFrontmatter.ts` | 커스텀 YAML 프론트매터 파서 |
| `src/hooks/useArticleFilters.ts` | 검색, 태그 필터, 페이지네이션 로직 |
| `src/hooks/useSeo.ts` | 동적 SEO meta 태그 관리 |
| `src/hooks/useArticleSeo.ts` | 아티클 전용 SEO + JSON-LD |
| `src/hooks/useHashScroll.ts` | URL 해시 기반 스크롤 |
| `src/hooks/useJsonLd.ts` | JSON-LD 구조화 데이터 |
| `src/store/index.ts` | Zustand 컬러모드 스토어 |
| `src/components/Header.tsx` | 네비게이션 헤더 (반응형) |
| `src/components/Footer.tsx` | 푸터 |
| `src/articles/*.md` | 마크다운 아티클 콘텐츠 |
| `src/interfaces/article.ts` | Article, ArticleMeta 타입 정의 |

## Public Interface

| Export | Type | Description |
|--------|------|-------------|
| Routes (파일 기반) | TanStack Router | `/`, `/articles/`, `/articles/detail/:id/`, `/resume/`, `/contact/` |
| `getArticles()` | function | 전체 아티클 메타데이터 반환 (캐시) |
| `getArticle(id)` | function | 개별 아티클 전체 콘텐츠 반환 (캐시) |
| `getAllTags()` | function | 전체 태그 목록 (빈도순) |
| `useColorMode` | Zustand store | 컬러모드 상태 (system/light/dark) |

## Internal Flow

### Route Rendering

```text
main.tsx
  └── createRouter({ routeTree })
        └── <RouterProvider>
              └── __root.tsx
                    ├── useColorMode → DOM 속성 설정
                    ├── <Header>
                    │     ├── <Logo>
                    │     ├── <DesktopNav> (desktop)
                    │     └── <MobileMenuButton> + <MobileMenu> (mobile)
                    ├── <Outlet> ← 매칭된 라우트 컴포넌트
                    └── <Footer>
```

### Article Detail Rendering

```text
$articleId/index.tsx
  ├── getArticle(id)
  ├── useArticleSeo()
  ├── useHashScroll()
  └── Render:
        ├── Cover image
        ├── Header (title, date, tags)
        ├── Lazy <Markdown>
        │     ├── remarkGfm, remarkBreaks
        │     └── MARKDOWN_COMPONENTS
        │           ├── h2/h3 → auto-id (slugify)
        │           ├── code → <CodeBlock>
        │           └── pre → <Pre>
        ├── <TableOfContents>
        │     └── IntersectionObserver 활성 헤딩
        └── Lazy <Giscus> 댓글
```

## Custom Hooks 상세

### useArticleFilters

| 기능 | 설명 |
|------|------|
| 검색 | `title + plainText` 포함 여부 (case-insensitive) |
| 태그 필터 | `selectedTags` Set으로 any match |
| 페이지네이션 | 10개씩, URL search param `page` 동기화 |
| 키보드 단축키 | `/` = 검색 열기, `Esc` = 닫기 |

### useSeo

동적으로 `<head>` 내 메타 태그를 생성/수정:
- `<title>`, `<meta description>`, `<link canonical>`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:type`
- Twitter Card: `twitter:title`, `twitter:image`
- `robots` (noindex 옵션)

### useHashScroll

- URL 해시(`#heading-id`)가 있으면 해당 요소로 스크롤
- 마크다운 렌더링이 아직 안된 경우 `MutationObserver`로 대기 후 스크롤
- 레이스 컨디션 해결 패턴

## Dependencies

| Direction | Module / Service | Via |
|-----------|-----------------|-----|
| **Uses** | @idevgon/design-system | UI 컴포넌트 (Button, Card, Container...) |
| **Uses** | @idevgon/code-block | 마크다운 코드 하이라이팅 |
| **Uses** | @idevgon/icons | 아이콘 컴포넌트 |
| **Uses** | @idevgon/timeline-chart | 이력서 타임라인 |
| **Uses** | @tanstack/react-router | 라우팅 |
| **Uses** | react-markdown | 마크다운 렌더링 |
| **Uses** | zustand | 상태관리 |
| **Uses** | @giscus/react | 댓글 시스템 |
| **Uses** | dayjs | 날짜 포맷팅 |

## Configuration

| Config File | Purpose |
|------------|---------|
| `vite.config.ts` | Vite 빌드 + 플러그인 설정 |
| `panda.config.ts` | Panda CSS (design-system 프리셋 확장) |
| `tsconfig.app.json` | TypeScript strict, path aliases |
| `vitest.config.ts` | 테스트 설정 |
| `postcss.config.cjs` | PostCSS (Panda CSS 연동) |

## Testing

- Run: `pnpm test` (루트) 또는 `pnpm --filter @idevgon/blog test`
- Framework: Vitest
- 테스트 파일: `src/utils/__tests__/`, `__tests__/`

## Related Notes

- [[System Architecture]]
- [[Request Flow]]
- [[Data Flow]]
- [[Design System]]
- [[Code Block]]
- [[Build and Deploy]]
