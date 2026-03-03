---
module: exercises
path: 08-Exercises
keywords: practice, onboarding, blog-app, routing, articles
---

# Blog App — Onboarding Exercises

#practice #onboarding #module-blog

## Related Modules

- [[Blog App]]
- [[Request Flow]]
- [[Data Flow]]

---

## Exercise 1 — Code Reading [trace]

> 사용자가 `/articles/` 페이지에 처음 접속했을 때, 아티클 목록이 화면에 표시되기까지의 전체 흐름을 추적하세요. 관련 파일과 함수를 순서대로 나열하세요.

> [!answer]- 정답 보기
> 1. `src/main.tsx` → `createRouter({ routeTree })` — 라우터 인스턴스 생성
> 2. `src/routeTree.gen.ts` — TanStack Router가 `/articles/` 매칭
> 3. `src/routes/__root.tsx` — `RootLayout` 렌더링 (Header + Outlet + Footer)
> 4. `src/routes/articles/index.tsx` — `Outlet`에서 아티클 목록 컴포넌트 렌더
> 5. `src/hooks/useArticleFilters.ts` → `getArticles()` 호출
> 6. `src/utils/articleLoader.ts` → `getArticles()`:
>    - `import.meta.glob`으로 `articleFiles` Map 접근
>    - 각 파일에 `parseFrontmatter()` 실행
>    - `extractPlainText()`로 검색용 텍스트 추출
>    - `cachedArticles`에 캐시, 날짜 내림차순 정렬
> 7. `useArticleFilters` → `useMemo`로 필터링 → 페이지네이션 slice
> 8. `useSeo()` → 메타 태그 설정
> 9. `ArticleCard[]` 렌더링 (최대 10개)

---

## Exercise 2 — Code Reading [trace]

> 마크다운 아티클에서 코드 블록(` ```typescript `)이 구문 하이라이팅되어 표시되기까지의 경로를 추적하세요.

> [!answer]- 정답 보기
> 1. `src/routes/articles/detail/$articleId/index.tsx` → `getArticle(id)` 호출
> 2. `articleLoader.ts` → `Article` 반환 (content 포함)
> 3. `<Markdown>` 컴포넌트에 `article.content` 전달
> 4. `react-markdown`이 마크다운 AST 파싱 → `code` 노드 발견
> 5. `MARKDOWN_COMPONENTS.code` → `<CodeBlock>` 컴포넌트로 위임
> 6. `packages/code-block/src/CodeBlock.tsx`:
>    - `className="language-typescript"` → `language = 'typescript'`
>    - `useHighlighter()` → `getOrCreateHighlighter()` (싱글톤)
>    - Shiki `codeToHtml(code, { lang: 'typescript', theme: 'github-dark' })`
>    - `dangerouslySetInnerHTML={{ __html: html }}` 렌더링

---

## Exercise 3 — Configuration [config]

> 블로그에 새로운 프로그래밍 언어(예: Rust)의 코드 하이라이팅을 추가하려면 어떤 파일을 수정해야 하나요?

> [!answer]- 정답 보기
> - File: `packages/code-block/src/CodeBlock.tsx`
> - Change: `getOrCreateHighlighter()` 함수 내 `langs` 배열에 추가:
>   ```typescript
>   import('shiki/langs/rust.mjs'),
>   ```
> - 다른 파일 변경 불필요 (마크다운에서 ` ```rust `로 작성하면 자동 인식)

---

## Exercise 4 — Configuration [config]

> 아티클 목록의 페이지당 표시 개수를 10개에서 20개로 변경하려면 어떻게 하나요?

> [!answer]- 정답 보기
> - File: `apps/blog/src/hooks/useArticleFilters.ts`
> - Change: `ITEMS_PER_PAGE` 상수를 `10`에서 `20`으로 변경
> - 관련: 페이지네이션 계산 (`totalPages`, `startIndex`)이 자동으로 조정됨

---

## Exercise 5 — Debugging [debug]

> 새로 추가한 아티클이 목록에 표시되지 않습니다. 어디를 확인해야 하나요?

> [!answer]- 정답 보기
> 1. `src/articles/` 디렉토리에 `.md` 파일이 있는지 확인
> 2. 프론트매터 형식 검증:
>    ```markdown
>    ---
>    title: 제목
>    author: 작성자
>    date: 2026-01-15
>    tags:
>      - tag1
>    ---
>    ```
> 3. `parseFrontmatter.ts`의 정규식 `FRONTMATTER_RE`와 매칭되는지 확인
>    - `---` 앞뒤에 공백이 있으면 안 됨
>    - `date` 형식이 올바른지 (`YYYY-MM-DD`)
> 4. 개발 서버 재시작 (`pnpm dev`) — `import.meta.glob`은 파일 변경 시 HMR 지원하지만, 새 파일 추가 시 재시작 필요할 수 있음
> 5. `articleLoader.ts`의 `cachedArticles` 캐시 — 새로고침 시 초기화됨

---

## Exercise 6 — Debugging [debug]

> 다크모드로 전환했는데 일부 컴포넌트의 색상이 바뀌지 않습니다. 원인을 진단하세요.

> [!answer]- 정답 보기
> 1. 해당 컴포넌트가 Panda CSS 시맨틱 토큰을 사용하는지 확인
>    - `color: 'textPrimary'` (O) vs `color: '#333'` (X, 하드코딩)
> 2. `packages/design-system/src/preset.ts` → `semanticTokens`에 해당 토큰이 `_dark` 값을 갖는지 확인
> 3. `__root.tsx`에서 `data-color-mode` 속성이 올바르게 설정되는지 DevTools로 확인
>    - `document.documentElement.getAttribute('data-color-mode')` → 'dark'여야 함
> 4. Panda CSS 조건: `[data-color-mode=dark] &` 선택자가 CSS에 생성되었는지 확인
> 5. `panda.config.ts`의 `conditions`에 `dark` 조건이 정의되어 있는지 확인

---

## Exercise 7 — Extension [extend]

> `/about/` 경로에 자기소개 페이지를 추가하려면 어떤 작업이 필요한가요?

> [!answer]- 정답 보기
> 1. `src/routes/about/index.tsx` 생성 — TanStack Router가 파일 기반으로 자동 라우트 등록
>    ```tsx
>    import { createFileRoute } from '@tanstack/react-router';
>
>    export const Route = createFileRoute('/about/')({
>      component: AboutPage,
>    });
>
>    function AboutPage() {
>      return <Container>...</Container>;
>    }
>    ```
> 2. `routeTree.gen.ts`가 자동 업데이트됨 (dev 서버 실행 중이면)
> 3. `src/components/Header.tsx` (또는 `DesktopNav.tsx`) 수정 — 네비게이션에 About 링크 추가
> 4. (선택) `vite-plugin-sitemap.ts`에 `/about` 경로 추가
> 5. (선택) `useSeo()` 훅으로 About 페이지 메타 태그 설정

---

## Exercise 8 — Extension [extend]

> 아티클에 "좋아요" 기능을 추가하려고 합니다. 아키텍처적 접근 방식을 설명하세요.

> [!answer]- 정답 보기
> 현재 아키텍처는 **정적 사이트(JAMstack)**이므로 서버 사이드 상태 저장이 불가능하다.
> 가능한 접근:
>
> **Option A: localStorage 기반 (서버리스)**
> 1. `src/store/index.ts`에 좋아요 Zustand 스토어 추가 (persist middleware)
> 2. 아티클 상세 페이지에 좋아요 버튼 컴포넌트 추가
> 3. 한계: 사용자 디바이스별 로컬, 공유 카운트 불가
>
> **Option B: Firebase 등 BaaS 활용**
> 1. Firebase Realtime Database 또는 Firestore 연동
> 2. 아티클 ID를 키로 좋아요 카운트 저장
> 3. React 훅으로 실시간 카운트 구독
> 4. 인증 없이는 중복 방지가 어려움 → 익명 인증 또는 IP 기반 제한
>
> **Option C: GitHub Discussions (Giscus 활용)**
> 1. Giscus가 이미 통합되어 있으므로, 리액션(thumbsup) 기능을 UI로 노출
> 2. 추가 인프라 불필요, GitHub 계정으로 인증

---

> [!summary]- 학습 포인트 요약
> | Topic | Key Takeaway |
> |-------|-------------|
> | 라우팅 | TanStack Router 파일 기반 → `src/routes/` 폴더 구조가 곧 URL 구조 |
> | 아티클 로딩 | `import.meta.glob` 컴파일타임 → 인메모리 캐시 → 클라이언트 검색 |
> | 코드 하이라이팅 | Shiki 싱글톤 + lazy loading → 필요 시에만 로드 |
> | 컬러모드 | Zustand + localStorage + `data-color-mode` 속성 + Panda CSS 시맨틱 토큰 |
> | 페이지 추가 | 파일 생성만으로 라우트 자동 등록 (Convention over Configuration) |
