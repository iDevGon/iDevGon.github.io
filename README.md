# iDevGon Blog

개인 기술 블로그입니다. React 기반의 SPA로 구현되어 있으며, GitHub Pages를 통해 배포됩니다.

> 🤖 본 블로그는 AI를 적극적으로 활용하여 작성되고 있습니다.
> 추후 직접 내용을 다듬고 개선해나갈 예정입니다.

## 기술 스택

### Core

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite (Rolldown)** - 빌드 도구

### Routing & State

- **TanStack Router** - 파일 기반 라우팅 및 코드 스플리팅
- **Zustand** - 경량 상태 관리

### Styling

- **Panda CSS** - Zero-runtime CSS-in-JS

### Content

- **react-markdown** - 마크다운 렌더링
- **Giscus** - GitHub Discussions 기반 댓글 시스템

### Developer Experience

- **React Compiler** - 자동 메모이제이션
- **Biome** - 린터 및 포매터

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 및 배포를 수행합니다.

### 배포 프로세스

1. `main` 브랜치에 코드 push
2. GitHub Actions 워크플로우 트리거
3. pnpm 설치 → 의존성 설치 → 빌드
4. `dist` 폴더를 GitHub Pages에 배포

수동 배포가 필요한 경우 GitHub Actions 탭에서 워크플로우를 직접 실행할 수 있습니다.
