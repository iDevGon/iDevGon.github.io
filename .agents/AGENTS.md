# AGENTS.md

이 저장소에서 작업하는 AI 에이전트를 위한 가이드입니다.

## 프로젝트 개요

pnpm 모노레포 기반 개인 기술 블로그입니다. `apps/blog`에 블로그 앱, `packages/`에 공용 패키지가 있습니다.

## 워크스페이스 구조

- `apps/blog` (`@idevgon/blog`) - 블로그 SPA 앱
- `packages/design-system` (`@idevgon/design-system`) - Panda CSS 프리셋 + 공용 컴포넌트
- `packages/icons` (`@idevgon/icons`) - SVG 아이콘 React 컴포넌트

## 빌드 & 실행

```bash
pnpm install                      # 의존성 설치
pnpm dev                          # 블로그 개발 서버
pnpm build                        # 프로덕션 빌드
pnpm storybook                    # Storybook 실행
pnpm check                        # Biome lint + format 검사
pnpm fix                          # 자동 수정
```

블로그 앱은 빌드 전 `panda codegen`을 실행하여 `styled-system/` 디렉토리를 생성합니다.

## 기술 스택 & 컨벤션

### 언어 & 프레임워크

- **React 19** + **TypeScript** (strict 모드)
- **Vite** (rolldown-vite로 override됨)
- React Compiler가 활성화되어 있어 수동 `useMemo`/`useCallback`이 불필요

### 라우팅

- **TanStack Router** - 파일 기반 라우팅
- 라우트 파일: `apps/blog/src/routes/`
- `routeTree.gen.ts`는 자동 생성 파일이므로 직접 수정 금지
- 자동 코드 스플리팅 활성화

### 스타일링

- **Panda CSS** (zero-runtime CSS-in-JS)
- 디자인 토큰은 `packages/design-system/src/preset.ts`에서 관리
- 블로그 앱의 `styled-system/`은 codegen 산출물이므로 직접 수정 금지
- 컬러 모드: `[data-color-mode=light]` / `[data-color-mode=dark]` 조건 사용
- 반응형 브레이크포인트: `mobile` (0px), `tablet` (768px), `desktop` (1024px)

### 상태 관리

- **Zustand** - 컬러 모드 등 클라이언트 상태 관리
- 스토어: `apps/blog/src/store/`

### 콘텐츠

- 블로그 글은 `apps/blog/src/articles/` 디렉토리에 마크다운 파일로 관리
- frontmatter 파싱: `apps/blog/src/utils/parseFrontmatter.ts`

### 린팅 & 포매팅

- **Biome** 사용 (ESLint/Prettier 아님)
- 설정: 루트 `biome.json`
- 주요 규칙:
  - indent: space 2
  - quote: single (`'`)
  - JSX quote: double (`"`)
  - trailing comma: all
  - semicolons: always
  - 미사용 변수: error
  - console: warn (warn/error만 허용)
  - a11y 규칙 활성화

### 경로 별칭

- `@/*` → `apps/blog/src/*`
- `styled-system/*` → `apps/blog/styled-system/*`

### 패키지 참조

- 워크스페이스 패키지는 `workspace:*`로 참조
- design-system 컴포넌트: `import { Button } from '@idevgon/design-system'`
- design-system 프리셋: `import { idevgonPreset } from '@idevgon/design-system/preset'`
- 아이콘: `import { SunIcon } from '@idevgon/icons'`

## 주의사항

- `routeTree.gen.ts`와 `styled-system/` 디렉토리는 자동 생성 파일이므로 직접 수정하지 않는다
- Vite 대신 rolldown-vite를 사용한다 (pnpm overrides 참고)
- GitHub Pages 배포 대상은 `apps/blog/dist`이다
- 새 컴포넌트는 가능한 한 `packages/design-system`에 추가하여 재사용성을 높인다
- 스타일은 인라인 스타일이나 CSS 파일 대신 Panda CSS 유틸리티를 사용한다

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동 배포합니다.
