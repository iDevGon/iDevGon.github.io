---
module: code-block
path: packages/code-block
keywords: shiki, syntax-highlighting, lazy-loading, singleton
---

# Code Block (★★)

#module-code-block #pattern-lazy-loading

## Purpose

`@idevgon/code-block`은 Shiki 기반의 코드 구문 하이라이팅 컴포넌트를 제공한다. 마크다운 아티클 내 코드 블록을 `github-dark` 테마로 렌더링한다.

## Key Files

| File | Role |
|------|------|
| `src/index.ts` | `CodeBlock`, `Pre` export |
| `src/CodeBlock.tsx` | Shiki 하이라이터 로딩 + 코드 렌더링 |

## Public Interface

| Export | Type | Description |
|--------|------|-------------|
| `CodeBlock` | Component | 코드 구문 하이라이팅 (Shiki) |
| `Pre` | Component | `<pre>` 래퍼 (pass-through) |

## Internal Flow

```text
<CodeBlock className="language-typescript" children="const x = 1;">
  │
  ├── language = className.replace('language-', '')
  │   → 'typescript'
  │
  ├── useHighlighter()
  │   └── getOrCreateHighlighter()  ← Singleton Promise
  │       ├── 첫 호출: import('shiki/core') + 언어/테마 동적 import
  │       └── 이후: 동일 Promise 반환 (재생성 없음)
  │
  ├── useMemo: highlighter.codeToHtml(code, { lang, theme })
  │   └── Shiki가 HTML 문자열 생성
  │
  └── Render:
      ├── language 없음 → <code> (인라인 코드)
      ├── html 있음 → dangerouslySetInnerHTML (하이라이트 적용)
      └── html 없음 → <pre><code> (fallback, 로딩 중)
```

### Supported Languages

| Language | Import |
|----------|--------|
| TypeScript | `shiki/langs/typescript.mjs` |
| TSX | `shiki/langs/tsx.mjs` |
| JavaScript | `shiki/langs/javascript.mjs` |
| JSX | `shiki/langs/jsx.mjs` |
| CSS | `shiki/langs/css.mjs` |
| HTML | `shiki/langs/html.mjs` |
| JSON | `shiki/langs/json.mjs` |
| Bash | `shiki/langs/bash.mjs` |
| YAML | `shiki/langs/yaml.mjs` |
| Markdown | `shiki/langs/markdown.mjs` |
| Python | `shiki/langs/python.mjs` |
| SQL | `shiki/langs/sql.mjs` |
| Diff | `shiki/langs/diff.mjs` |

> [!important] Singleton 패턴
> `highlighterPromise` 모듈 레벨 변수로 Shiki 인스턴스를 싱글톤으로 관리한다.
> 여러 `<CodeBlock>`이 렌더링되어도 Shiki는 **한 번만** 로드된다.

> [!tip] Lazy Loading 전략
> Shiki와 각 언어 문법은 **동적 import**로 로드된다.
> 코드 블록이 없는 페이지에서는 Shiki 번들이 전혀 로드되지 않는다.

## Dependencies

| Direction | Module / Service | Via |
|-----------|-----------------|-----|
| **Uses** | shiki (v4.0.1) | 구문 하이라이팅 엔진 |
| **Used by** | @idevgon/blog | 마크다운 코드 블록 렌더링 |

## Configuration

- Theme: `github-dark` (고정)
- Engine: `createJavaScriptRegexEngine()` (WASM 대신 JS 엔진 사용, 번들 크기 최적화)

## Testing

- 별도 단위 테스트 없음
- 아티클 상세 페이지에서 시각적 검증

## Related Notes

- [[Blog App]]
- [[Request Flow]]
- [[Data Flow]]
