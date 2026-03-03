---
module: dashboard
path: 00-Dashboard
keywords: quick-reference, commands, setup, debugging
---

# Quick Reference

#dashboard #quick-reference

## Key Commands

| Action | Command | Notes |
|--------|---------|-------|
| Install deps | `pnpm install` | 모노레포 전체 |
| Run dev | `pnpm dev` | → [[Blog App]] |
| Run tests | `pnpm test` | Vitest |
| Build | `pnpm build` | `tsc -b && vite build` |
| Preview | `pnpm preview` | 빌드 결과 로컬 확인 |
| Lint | `pnpm lint` | Biome lint |
| Format | `pnpm format:fix` | Biome format |
| Check all | `pnpm fix` | lint + format 자동 수정 |
| Storybook | `pnpm storybook` | → [[Design System]] |
| New article | `pnpm new-article` | 새 아티클 생성 스크립트 |

## Environment Setup

1. Node.js LTS 설치 (`nvm use --lts`)
2. pnpm v10 설치 (`npm install -g pnpm@10`)
3. `pnpm install` (모노레포 전체 의존성)
4. `pnpm dev` (개발 서버 시작, http://localhost:5173)

## Important File Locations

| File / Dir | Purpose | → Note |
|------------|---------|--------|
| `apps/blog/src/main.tsx` | 앱 진입점 | [[Blog App]] |
| `apps/blog/src/routes/` | 파일 기반 라우트 | [[Blog App]] |
| `apps/blog/src/articles/` | 마크다운 아티클 | [[Data Flow]] |
| `apps/blog/src/utils/articleLoader.ts` | 아티클 로딩/캐싱 | [[Data Flow]] |
| `apps/blog/src/utils/parseFrontmatter.ts` | YAML 프론트매터 파서 | [[Data Flow]] |
| `apps/blog/src/hooks/` | 커스텀 훅 | [[Blog App]] |
| `apps/blog/src/store/index.ts` | Zustand 컬러모드 스토어 | [[Blog App]] |
| `apps/blog/vite.config.ts` | Vite 빌드 설정 | [[Build and Deploy]] |
| `apps/blog/panda.config.ts` | Panda CSS 설정 | [[Design System]] |
| `apps/blog/vite-plugin-prerender.ts` | SSG 프리렌더 플러그인 | [[Build and Deploy]] |
| `apps/blog/vite-plugin-sitemap.ts` | 사이트맵 생성 | [[Build and Deploy]] |
| `packages/design-system/src/preset.ts` | Panda CSS 커스텀 프리셋 | [[Design System]] |
| `packages/design-system/src/components/` | 공용 UI 컴포넌트 | [[Design System]] |
| `.github/workflows/deploy.yml` | GitHub Pages CI/CD | [[Build and Deploy]] |
| `biome.json` | Biome 린트/포맷 설정 | [[Build and Deploy]] |
| `pnpm-workspace.yaml` | 모노레포 워크스페이스 | [[System Architecture]] |

## Common Debugging

| Symptom | Where to Look | → Note |
|---------|---------------|--------|
| 라우트가 동작하지 않음 | `src/routeTree.gen.ts` 자동생성 확인 → `src/routes/` 파일 구조 | [[Blog App]] |
| 스타일이 적용되지 않음 | `panda.config.ts`의 `include` 경로 → `styled-system/` 생성 확인 | [[Design System]] |
| 아티클이 표시되지 않음 | `src/articles/*.md` 프론트매터 형식 → `articleLoader.ts` 로딩 로직 | [[Data Flow]] |
| 다크모드 전환 안됨 | `store/index.ts` → `__root.tsx` useEffect → `data-color-mode` 속성 확인 | [[Blog App]] |
| 빌드 실패 | `tsc -b` 타입 에러 → 각 패키지 `tsconfig.json` project references | [[Build and Deploy]] |
| 코드 하이라이팅 안됨 | `CodeBlock.tsx` → Shiki 언어 등록 여부 확인 | [[Code Block]] |
| Storybook 오류 | `packages/design-system/.storybook/` 설정 확인 | [[Design System]] |
| 프리렌더 실패 | `vite-plugin-prerender.ts` → `parseFrontmatter` import 경로 | [[Build and Deploy]] |
