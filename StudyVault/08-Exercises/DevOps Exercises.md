---
module: exercises
path: 08-Exercises
keywords: practice, onboarding, devops, build, deploy, ci-cd
---

# DevOps — Onboarding Exercises

#practice #onboarding #devops

## Related Modules

- [[Build and Deploy]]
- [[System Architecture]]
- [[Blog App]]

---

## Exercise 1 — Code Reading [trace]

> `pnpm build` 명령이 실행될 때, 최종 `dist/` 디렉토리에 파일이 생성되기까지의 전체 빌드 체인을 추적하세요.

> [!answer]- 정답 보기
> 1. `package.json` → `pnpm --filter @idevgon/blog build`
> 2. `apps/blog/package.json` → `tsc -b && vite build`
> 3. **tsc -b**: TypeScript 타입 체크 (project references로 모든 패키지 포함)
> 4. **vite build**:
>    - TanStack Router Plugin → `routeTree.gen.ts` 생성
>    - React Plugin + Babel Compiler → JSX 변환 + 자동 메모이제이션
>    - Panda CSS (PostCSS) → `styled-system/` 코드젠 → 정적 CSS
>    - Rolldown → 번들링 + 트리쉐이킹 + 코드 스플리팅 + CSS 미니파이
> 5. **closeBundle hooks**:
>    - Sitemap Plugin → `dist/sitemap.xml`
>    - Prerender Plugin → `dist/articles/detail/{id}/index.html` (각 아티클)
> 6. 최종 `dist/`:
>    - `index.html` (SPA 셸)
>    - `assets/*.js` (라우트별 청크)
>    - `assets/*.css` (미니파이된 CSS)
>    - `articles/detail/{id}/index.html` (프리렌더된 아티클)
>    - `sitemap.xml`

---

## Exercise 2 — Code Reading [trace]

> GitHub에 push 했을 때, 코드가 라이브 사이트에 반영되기까지의 CI/CD 파이프라인을 추적하세요.

> [!answer]- 정답 보기
> 1. `main` 브랜치에 push → `.github/workflows/deploy.yml` 트리거
> 2. `ubuntu-latest` 러너 시작
> 3. `actions/checkout@v4` → 코드 체크아웃
> 4. `pnpm/action-setup@v4` → pnpm v10 설치
> 5. `actions/setup-node@v4` → Node.js LTS + pnpm 캐시 설정
> 6. `pnpm install --frozen-lockfile` → 의존성 설치 (lockfile 검증)
> 7. `pnpm test` → Vitest 실행 (실패 시 배포 중단)
> 8. `pnpm run build` → 빌드 (tsc + vite)
> 9. `cp index.html 404.html` → SPA 라우팅 지원
> 10. `actions/upload-pages-artifact@v3` → `dist/` 아티팩트 업로드
> 11. `actions/deploy-pages@v4` → GitHub Pages에 배포
> 12. 사이트 URL에서 새 버전 라이브

---

## Exercise 3 — Configuration [config]

> Biome 린트 규칙에서 `console.log`를 허용하도록 변경하려면 어떻게 하나요?

> [!answer]- 정답 보기
> - File: `biome.json` (프로젝트 루트)
> - Change: `linter.rules.suspicious.noConsole` 수정:
>   ```json
>   "noConsole": {
>     "level": "error",
>     "options": {
>       "allow": ["warn", "error", "log"]
>     }
>   }
>   ```
>   또는 규칙 자체를 끄려면: `"noConsole": "off"`
> - 주의: `console.log`를 프로덕션에 남기면 성능 영향 가능

---

## Exercise 4 — Configuration [config]

> 새 패키지 `@idevgon/utils`를 모노레포에 추가하는 절차를 설명하세요.

> [!answer]- 정답 보기
> 1. `packages/utils/` 디렉토리 생성
> 2. `packages/utils/package.json` 생성:
>    ```json
>    {
>      "name": "@idevgon/utils",
>      "version": "0.0.0",
>      "private": true,
>      "type": "module",
>      "main": "src/index.ts",
>      "types": "src/index.ts"
>    }
>    ```
> 3. `packages/utils/tsconfig.json` 생성 (root tsconfig 참조)
> 4. `packages/utils/src/index.ts` 생성
> 5. `pnpm-workspace.yaml`에 이미 `packages/*`가 포함되어 있으므로 자동 인식
> 6. Blog App에서 사용: `apps/blog/package.json`에 `"@idevgon/utils": "workspace:*"` 추가
> 7. `pnpm install` 실행
> 8. (선택) `biome.json`의 `include`에 `packages/utils/**/*.ts` 추가
> 9. (선택) `apps/blog/panda.config.ts`의 `include`에 경로 추가 (Panda CSS 사용 시)

---

## Exercise 5 — Debugging [debug]

> CI/CD 파이프라인에서 `pnpm test` 단계가 실패했습니다. 원인을 어떻게 조사하나요?

> [!answer]- 정답 보기
> 1. GitHub Actions 로그에서 실패한 테스트 확인
>    - Actions 탭 → 실패한 workflow run → `Run tests` step 로그
> 2. 로컬에서 동일한 환경으로 재현:
>    ```bash
>    pnpm install --frozen-lockfile
>    pnpm test
>    ```
> 3. 테스트 파일 위치 확인:
>    - `apps/blog/src/utils/__tests__/`
>    - `apps/blog/__tests__/`
>    - `packages/timeline-chart/src/__tests__/`
> 4. Vitest의 `--reporter=verbose` 옵션으로 상세 출력
> 5. 흔한 원인:
>    - 환경 차이 (Node.js 버전, OS)
>    - `--frozen-lockfile`이지만 lockfile이 오래됨 → `pnpm install` 후 커밋
>    - import 경로 대소문자 (Linux는 case-sensitive)

---

## Exercise 6 — Debugging [debug]

> 빌드는 성공했지만 배포된 사이트에서 특정 라우트(`/resume/`)가 404 페이지를 보여줍니다. 원인은?

> [!answer]- 정답 보기
> 1. GitHub Pages는 정적 파일 서빙 → `/resume/index.html` 파일이 있는지 확인
> 2. `/resume/`는 프리렌더되지 않음 (프리렌더는 아티클만 대상)
> 3. 정상 동작 원리:
>    - GitHub Pages → 파일 없으면 `404.html` 서빙
>    - `404.html`은 `index.html` 복사본 → SPA 로드됨
>    - TanStack Router가 `/resume/` 매칭 → 정상 렌더링
> 4. 만약 404가 보인다면:
>    - `404.html` 복사가 실패했는지 확인 (deploy.yml의 cp 단계)
>    - `dist/404.html` 존재 여부 확인
>    - GitHub Pages 설정에서 Custom 404가 설정되어 있는지 확인

---

## Exercise 7 — Extension [extend]

> 프리렌더 대상에 아티클 외에 `/resume/` 페이지도 추가하려면 어떻게 하나요?

> [!answer]- 정답 보기
> 1. File: `apps/blog/vite-plugin-prerender.ts`
> 2. `closeBundle` 훅에서 아티클 프리렌더 로직 이후 추가:
>    ```typescript
>    // Resume page prerender
>    const resumeDir = path.resolve(distDir, 'resume');
>    fs.mkdirSync(resumeDir, { recursive: true });
>
>    let resumeHtml = template;
>    // Resume 전용 meta 태그 설정
>    resumeHtml = resumeHtml.replace(/<title>[^<]*<\/title>/, '<title>Resume | iDevGon</title>');
>    // ... 추가 meta 태그
>    fs.writeFileSync(path.resolve(resumeDir, 'index.html'), resumeHtml);
>    ```
> 3. `vite-plugin-sitemap.ts`에 `/resume` 경로 추가 (이미 포함되어 있을 수 있음)
> 4. 주의: Resume 콘텐츠가 동적(React 컴포넌트)이므로, 메타 태그만 프리렌더하는 것이 현실적

---

> [!summary]- 학습 포인트 요약
> | Topic | Key Takeaway |
> |-------|-------------|
> | 빌드 체인 | `tsc -b` (타입) → Vite (번들) → 플러그인 (SSG + 사이트맵) |
> | CI/CD | push → test → build → 404.html 복사 → deploy |
> | 404 전략 | `index.html` = `404.html` → GitHub Pages에서 SPA 라우팅 가능 |
> | 모노레포 패키지 추가 | `packages/` 하위에 생성 + `workspace:*`로 참조 |
> | 프리렌더 | 아티클별 정적 HTML (meta + 본문) → SEO + 성능 |
