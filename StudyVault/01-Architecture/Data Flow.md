---
module: architecture
path: 01-Architecture
keywords: data-flow, article-loader, frontmatter, caching, zustand
---

# Data Flow (★★★)

#arch-jamstack #api-article-loader #api-color-mode

## Purpose

데이터가 시스템에 어떻게 진입하고, 변환되고, 캐싱되고, 렌더링되는지 추적한다. 아티클 데이터 흐름과 컬러모드 상태 흐름을 다룬다.

## 1. Article Data Pipeline

```text
[소스]                   [로딩]              [캐시]            [소비]
src/articles/*.md   →  import.meta.glob  →  articleFiles  →  getArticles()
                       (Vite 컴파일타임)     (raw Map)        (ArticleMeta[])
                                                                   │
                                                              ┌────┴────┐
                                                              ▼         ▼
                                                        목록 페이지  상세 페이지
                                                        (Meta만)    getArticle(id)
                                                                    (full content)
```

### 1.1 Glob Import (컴파일타임)

```typescript
// articleLoader.ts
const articleFiles = import.meta.glob('/src/articles/*.md', {
  eager: true,   // 빌드 시 즉시 로드 (lazy가 아님)
  query: '?raw', // 마크다운 원본 텍스트로 가져옴
  import: 'default',
}) as Record<string, string>;
```

> [!important]
> `eager: true`이므로 모든 `.md` 파일이 **빌드 번들에 포함**된다.
> 아티클 수가 매우 많아지면 번들 크기에 영향을 줄 수 있다.

### 1.2 Frontmatter Parsing

```text
---                         parseFrontmatter(raw)
title: Article Title    →      ├── FRONTMATTER_RE 정규식으로 분리
author: DevGon                 ├── parseYaml(yamlBlock)
date: 2026-01-15               │   ├── 라인별 key: value 파싱
tags:                          │   └── - value 배열 항목 처리
  - react                      │
  - typescript                 └── { data: ArticleFrontmatter, content: string }
---
# Content...
```

> [!warning] 커스텀 YAML 파서
> `gray-matter` 대신 직접 구현한 YAML 파서를 사용한다.
> 이유: `gray-matter`가 Node.js `Buffer`에 의존하여 브라우저에서 동작하지 않기 때문.
> 단순 key-value + 배열만 지원하며, 중첩 객체는 지원하지 않는다.

### 1.3 Two-Level Caching

```text
Level 1: Metadata Cache (전체 아티클 목록)
┌─────────────────────────────────────────────────┐
│ let cachedArticles: ArticleMeta[] | null = null │
│                                                  │
│ getArticles():                                   │
│   if (cachedArticles) return cachedArticles      │
│   cachedArticles = articleFiles                   │
│     .map(parse + extractPlainText)               │
│     .sort(byDateDesc)                            │
│   return cachedArticles                          │
└─────────────────────────────────────────────────┘

Level 2: Individual Article Cache (상세 콘텐츠)
┌─────────────────────────────────────────────────┐
│ const articleCache = new Map<string, Article>()  │
│                                                  │
│ getArticle(id):                                  │
│   if (articleCache.has(id)) return cache hit     │
│   article = { ...meta, content: rawMarkdown }    │
│   articleCache.set(id, article)                  │
│   return article                                 │
└─────────────────────────────────────────────────┘
```

> [!tip] 캐시 전략의 이유
> - Level 1: 목록 페이지에서 매번 파싱하지 않도록 메타데이터 전체 캐시
> - Level 2: 상세 페이지는 접근한 아티클만 캐시 (메모리 절약)
> - 모든 캐시는 **인메모리** (새로고침 시 초기화)

### 1.4 Plain Text Extraction

```typescript
// extractPlainText(markdown): string
// 마크다운 문법을 제거하여 순수 텍스트 추출 (검색용)
// - 헤딩 `#` 제거
// - 링크 `[text](url)` → text
// - 코드 블록, 인라인 코드 제거
// - 이미지, HTML 태그 제거
// → excerpt: 앞 150자 (목록 페이지 미리보기)
// → plainText: 전체 (검색 매칭)
```

### 1.5 Article Types

```typescript
interface ArticleFrontmatter {
  title: string;
  author: string;
  date: string;
  tags: string[];
  description?: string;
  coverImage?: string;
}

interface ArticleMeta extends ArticleFrontmatter {
  id: string;        // 파일명에서 추출 (e.g., "my-article")
  excerpt: string;   // plainText 앞 150자
  plainText: string; // 검색용 전체 텍스트
}

interface Article extends ArticleMeta {
  content: string;   // 원본 마크다운 (프론트매터 제외)
}
```

## 2. Color Mode State Flow

```text
[초기화]
  App mount → useColorMode (Zustand)
                 │
                 ├── localStorage 'color-mode' 읽기
                 │   └── 없으면 default: 'system'
                 │
                 ▼
[해석]
  colorMode === 'system'?
    ├── Yes → matchMedia('(prefers-color-scheme: dark)')
    │         └── true → 'dark', false → 'light'
    └── No → colorMode 그대로 사용
                 │
                 ▼
[적용] useEffect in __root.tsx
  ├── document.documentElement.setAttribute('data-color-mode', resolved)
  ├── document.documentElement.style.colorScheme = resolved
  └── <meta name="theme-color"> 업데이트
                 │
                 ▼
[스타일 반영]
  Panda CSS 조건부 스타일:
    [data-color-mode=light] → 라이트 시맨틱 토큰
    [data-color-mode=dark]  → 다크 시맨틱 토큰
    transition: background-color 0.3s, color 0.3s
```

```text
[사용자 토글]
  ColorModeSwitch click
    → setColorMode('dark'|'light'|'system')
    → Zustand 상태 업데이트
    → persist middleware → localStorage 저장
    → useEffect 재실행 → DOM 속성 업데이트
    → CSS 전환 애니메이션
```

## 3. Client-Side Search & Filter

```text
[입력]                    [처리]                  [출력]
searchQuery ──────────→ useMemo
                         ├── title.includes(q)
selectedTags ─────────→ │   plainText.includes(q)
                         ├── tags.some(has)
allArticles ──────────→ └── filteredArticles
                                │
                                ▼
                         pagination slice
                         (page - 1) * 10 ~ page * 10
                                │
                                ▼
                         ArticleCard[]
```

> [!tip] 검색은 완전히 클라이언트 사이드
> 모든 아티클의 `plainText`가 메모리에 있으므로 별도 검색 서버가 불필요하다.
> 아티클 규모가 커지면 Fuse.js 같은 퍼지 검색 라이브러리를 고려할 수 있다.

## Related Notes

- [[System Architecture]]
- [[Request Flow]]
- [[Blog App]]
