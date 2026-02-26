# iDevGon Blog

개인 기술 블로그 모노레포입니다. React 기반 SPA로 구현되어 있으며, GitHub Pages를 통해 배포됩니다.

> 본 블로그는 AI를 적극적으로 활용하여 작성되고 있습니다.
> 추후 직접 내용을 다듬고 개선해나갈 예정입니다.

## 프로젝트 구조

pnpm 워크스페이스 기반 모노레포로 구성되어 있습니다.

```
iDevGon.github.io/
├── apps/
│   └── blog/                    # 블로그 애플리케이션
├── packages/
│   ├── design-system/           # 공용 디자인 시스템 (Panda CSS 프리셋 + 컴포넌트)
│   └── icons/                   # SVG 아이콘 React 컴포넌트
├── .agents/                     # AI 에이전트 설정
│   └── skills/                  # 에이전트 스킬 패키지
├── .github/
│   └── workflows/deploy.yml     # GitHub Pages 자동 배포
├── biome.json                   # Biome 린터/포매터 설정
├── pnpm-workspace.yaml
└── tsconfig.json                # 프로젝트 레퍼런스 루트 설정
```

### apps/blog

메인 블로그 애플리케이션입니다.

- **라우팅**: TanStack Router 파일 기반 라우팅 + 자동 코드 스플리팅
- **페이지**: 홈(`/`), 아티클 목록(`/articles`), 아티클 상세(`/articles/detail/$articleId`), 이력서(`/resume`), 연락처(`/contact`)
- **콘텐츠**: `src/articles/` 디렉토리에 마크다운 파일로 관리
- **상태 관리**: Zustand (컬러 모드 등)
- **댓글**: Giscus (GitHub Discussions 기반)
- **트랜지션**: Ssgoi 뷰 전환 애니메이션

### packages/design-system

Panda CSS 커스텀 프리셋과 공용 UI 컴포넌트를 제공합니다.

- **프리셋**: 브랜드 컬러, 시맨틱 토큰(라이트/다크), 반응형 브레이크포인트, 글로벌 스타일
- **컴포넌트**: Button, Card, Container, Flex, Tag, SectionTitle, Typo, Slot
- **Storybook**: 컴포넌트 문서화 및 개발 환경 (`pnpm storybook`)

### packages/icons

React 컴포넌트로 래핑된 SVG 아이콘 패키지입니다.

- SunIcon, MoonIcon, EmailIcon, GithubIcon, BlogIcon

## 기술 스택

| 영역 | 기술 |
|------|------|
| UI | React 19, TypeScript |
| 빌드 | Vite (Rolldown) |
| 라우팅 | TanStack Router |
| 상태 관리 | Zustand |
| 스타일링 | Panda CSS (zero-runtime) |
| 최적화 | React Compiler |
| 콘텐츠 | react-markdown, remark-gfm |
| 댓글 | Giscus |
| 린팅/포매팅 | Biome |
| 컴포넌트 문서화 | Storybook |
| 패키지 관리 | pnpm (모노레포) |
| 배포 | GitHub Actions + GitHub Pages |

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 블로그 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook

# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

### 주요 스크립트

```bash
# 코드 품질 검사
pnpm check          # Biome lint + format 검사
pnpm fix            # 자동 수정

# 개별 실행
pnpm lint           # 린트 검사
pnpm format         # 포맷 검사
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 및 배포를 수행합니다.

### 배포 프로세스

1. `main` 브랜치에 코드 push
2. GitHub Actions 워크플로우 트리거
3. pnpm 설치 → 의존성 설치 → 빌드
4. `apps/blog/dist` 폴더를 GitHub Pages에 배포

수동 배포가 필요한 경우 GitHub Actions 탭에서 워크플로우를 직접 실행할 수 있습니다.
