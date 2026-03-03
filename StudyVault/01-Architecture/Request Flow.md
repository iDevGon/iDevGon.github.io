---
module: architecture
path: 01-Architecture
keywords: request-flow, routing, rendering, hydration, SPA
---

# Request Flow (★★★)

#arch-spa #api-routing #pattern-lazy-loading

## Purpose

사용자가 블로그에 접속했을 때 요청이 어떤 경로로 처리되는지 추적한다. 초기 로드, 아티클 목록, 아티클 상세 3가지 주요 흐름을 다룬다.

## 1. Initial Page Load

```text
Browser → GitHub Pages (index.html)
   │
   ▼
index.html
   ├── <link> CSS bundles (Panda CSS 생성물)
   ├── <link rel="preconnect"> CDN fonts
   └── <script type="module" src="main.tsx">
          │
          ▼
      main.tsx
          ├── import routeTree (자동 생성: routeTree.gen.ts)
          ├── createRouter({ routeTree, scrollRestoration: true })
          └── ReactDOM.createRoot(#root).render(<RouterProvider>)
                 │
                 ▼
            __root.tsx (RootLayout)
                 ├── useColorMode() → Zustand 스토어
                 │   ├── localStorage에서 'system'|'light'|'dark' 읽기
                 │   ├── 'system'이면 prefers-color-scheme 확인
                 │   └── document.documentElement.setAttribute('data-color-mode', resolved)
                 │
                 ├── <a href="#main-content"> (skip link, a11y)
                 ├── <Header />
                 ├── <main id="main-content">
                 │       └── <Outlet /> ← TanStack Router가 매칭된 라우트 렌더
                 └── <Footer />
```

## 2. Articles List Page (`/articles/`)

```text
TanStack Router matches /articles/
   │
   ▼
articles/index.tsx
   │
   ├── URL Search Params 유효성 검사
   │   ├── page: number (default: 1)
   │   └── tag: string (optional)
   │
   ├── useArticleFilters({ page, tag })
   │   ├── getArticles() ← articleLoader.ts
   │   │   └── import.meta.glob → parseFrontmatter → 캐시 → 정렬
   │   │
   │   ├── getAllTags() → 태그 빈도 정렬
   │   │
   │   ├── useMemo: 검색 + 태그 필터링
   │   │   ├── searchQuery → title + plainText 매칭
   │   │   └── selectedTags → any match 필터
   │   │
   │   ├── 페이지네이션: slice(start, start + 10)
   │   │
   │   └── Keyboard: "/" = 검색 열기, "Esc" = 닫기
   │
   ├── useSeo() → meta 태그 설정
   │
   └── Render
       ├── <ArticleSearch /> (조건부)
       │   └── <ArticleFilters /> (태그 목록)
       ├── ArticleCard[] (최대 10개)
       └── <Pagination /> (totalPages > 1일 때)
```

## 3. Article Detail Page (`/articles/detail/:id/`)

```text
TanStack Router matches /articles/detail/$articleId
   │
   ▼
articles/detail/$articleId/index.tsx
   │
   ├── articleId = Route.useParams()
   │
   ├── getArticle(articleId) ← articleLoader.ts
   │   ├── articleCache.has(id)? → 캐시 반환
   │   └── miss: articleFiles[path] → parse → 캐시 저장
   │
   ├── useArticleSeo(article, articleId, coverImageUrl)
   │   ├── useSeo() → OG + Twitter 메타 태그
   │   └── useBlogPostingJsonLd() → schema.org 구조화 데이터
   │
   ├── useHashScroll()
   │   ├── URL 해시 → document.getElementById
   │   └── 없으면 MutationObserver로 대기 후 스크롤
   │
   └── Render
       ├── Cover Image (있으면)
       ├── Article Header (title, author, date, tags)
       │
       ├── Suspense → Lazy <Markdown>
       │   ├── remarkGfm + remarkBreaks
       │   └── MARKDOWN_COMPONENTS
       │       ├── h2/h3 → slugify → id 생성
       │       ├── code → <CodeBlock /> (Shiki)
       │       └── pre → <Pre /> (pass-through)
       │
       ├── <TableOfContents /> (오른쪽 사이드바)
       │   ├── extractHeadings(content) → h2, h3 파싱
       │   └── IntersectionObserver → 활성 헤딩 추적
       │
       ├── Suspense → Lazy <Giscus /> (댓글)
       │
       └── useEffect: #prerendered-article 제거 (SSG 아티팩트)
```

> [!important] SSG와 SPA의 만남
> 아티클 상세 페이지는 **빌드 시 프리렌더링**된 HTML로 서빙된다.
> `dist/articles/detail/{id}/index.html`에 메타 태그 + 본문 HTML이 이미 포함되어 있어
> 크롤러는 JS 없이도 콘텐츠를 읽을 수 있다. JS 로드 후 React가 하이드레이션하고,
> 프리렌더된 `#prerendered-article`은 제거된다.

## Route Structure

| Path | File | Lazy Load |
|------|------|-----------|
| `/` | `routes/index.tsx` | Yes (auto code split) |
| `/articles/` | `routes/articles/index.tsx` | Yes |
| `/articles/detail/:id/` | `routes/articles/detail/$articleId/index.tsx` | Yes |
| `/resume/` | `routes/resume/index.tsx` | Yes |
| `/contact/` | `routes/contact/index.tsx` | Yes |

> [!tip] TanStack Router의 autoCodeSplitting
> 각 라우트 파일이 자동으로 별도 청크로 분리된다.
> 사용자가 해당 라우트에 접근할 때만 JS를 로드하므로 초기 번들 크기를 최소화한다.

## Related Notes

- [[System Architecture]]
- [[Data Flow]]
- [[Blog App]]
- [[Build and Deploy]]
