---
name: refactor-audit
description: 블로그 앱 코드의 구조적 품질을 점검하고 리팩토링합니다. 컴포넌트 책임 분리, 인라인 SVG 추출, 인라인 스타일 교정, 디자인 시스템 이관을 에이전트 팀으로 병렬 수행합니다.
user_invocable: true
metadata:
  author: DevGon
  version: "1.0.0"
  argument-hint: <검사 범위 (선택, 미지정 시 apps/blog/src/ 전체)>
---

# Refactor Audit

블로그 앱 코드의 구조적 품질을 점검하고 자동 리팩토링하는 스킬입니다.

## 역할

코드 품질 전문가로서 아래 4가지 관점에서 코드를 분석하고 개선합니다. 각 관점은 독립된 에이전트가 병렬로 처리합니다.

## 검사 항목

| # | 관점 | 설명 |
|---|------|------|
| 1 | **책임 분리** | 하나의 컴포넌트·훅·함수가 지나치게 많은 책임을 가진 경우 코드 및 파일 분리 |
| 2 | **SVG 추출** | 인라인 SVG를 `@packages/icons/`에 컴포넌트로 추출 |
| 3 | **스타일 교정** | 인라인 style, 비-Panda CSS 스타일을 Panda CSS 방식으로 변환 |
| 4 | **디자인 시스템 이관** | 앱에 직접 선언된 범용 UI 컴포넌트를 `@packages/design-system/`으로 이동 |

## 실행 절차

### 1. 코드베이스 탐색 (Explore 에이전트)

대상 경로(기본: `apps/blog/src/`)를 Explore 에이전트로 분석합니다.

수집할 정보:
- 모든 컴포넌트·훅·유틸 파일의 경로와 줄 수
- 인라인 SVG 사용 위치 (파일 경로, 라인 번호)
- 인라인 style 또는 비-Panda CSS 스타일 사용 위치
- 단일 책임 원칙을 위반하는 과대 컴포넌트 (기준: 200줄 초과 또는 3개 이상의 독립 책임)
- 디자인 시스템에 있어야 할 범용 UI 컴포넌트 후보

참조 패키지 구조도 함께 분석합니다:
- `packages/icons/src/` — 기존 아이콘 컴포넌트 패턴
- `packages/design-system/src/` — 기존 디자인 시스템 컴포넌트 패턴 및 export 구조

### 2. 팀 구성 및 병렬 실행

탐색 결과를 바탕으로 4개 에이전트 팀을 구성하여 병렬로 작업합니다.
각 에이전트는 **워크트리(worktree) 격리** 환경에서 작업합니다.

#### 에이전트 구성

| 에이전트명 | 담당 | 주요 작업 |
|-----------|------|-----------|
| `splitter` | 책임 분리 | 과대 컴포넌트를 서브 컴포넌트·스타일 파일로 분리 |
| `icons-agent` | SVG 추출 | 인라인 SVG → `@packages/icons/` 컴포넌트 생성, 원본 파일에서 import로 교체 |
| `styles-agent` | 스타일 교정 | 인라인 style → Panda CSS `css()` 클래스, 하드코딩 색상 → 테마 토큰 |
| `ds-agent` | DS 이관 | 범용 컴포넌트 → `@packages/design-system/` 이동, 앱에서 import 변경 |

#### 에이전트 작업 가이드

**splitter (책임 분리)**:
- 200줄 초과 컴포넌트의 스타일 상수를 별도 `-styles.ts` 파일로 추출
- 독립된 UI 영역을 서브 컴포넌트로 분리 (예: Header → DesktopNav, MobileMenu)
- 오케스트레이터 패턴 유지: 상위 컴포넌트는 상태 관리와 조합만 담당
- TanStack Router 비-라우트 파일은 `-` 접두사 사용

**icons-agent (SVG 추출)**:
- 기존 아이콘 패턴 준수: `SVGProps<SVGSVGElement>`, `role="img"`, `aria-label`, `{...props}` spread
- `packages/icons/src/index.ts` barrel export에 새 아이콘 추가
- 원본 파일에서 `@idevgon/icons`로 import 교체

**styles-agent (스타일 교정)**:
- `style={{ }}` prop → `className={css({ })}` 변환
- 하드코딩 색상 → `var(--colors-*)` 테마 토큰
- 동적 계산이 필요한 CSS 커스텀 프로퍼티(예: TimelineChart의 `--bar-left`)는 그대로 유지
- 애니메이션 인라인 스타일 → data 속성 기반 조건부 Panda CSS 클래스

**ds-agent (디자인 시스템 이관)**:
- 기존 DS 패턴 준수: CVA + `styled()` from Panda CSS
- 앱 특정 의존성(store 등) 제거, props 기반 인터페이스로 전환
- `packages/design-system/src/components/index.ts` barrel export에 추가
- 앱 측은 thin wrapper로 store 값을 props로 전달하거나 직접 DS 컴포넌트 사용

### 3. 검증

모든 에이전트 작업 완료 후:
- TypeScript 타입 체크 (`tsc --noEmit`) 통과 확인
- 변경된 모든 패키지에 대해 검증

### 4. 결과 출력

최종 결과를 아래 형식으로 출력합니다:

```
## 리팩토링 결과 요약

### 1. 책임 분리
- {파일명} ({이전 줄수} → {이후 줄수}): {분리 내용}
- ...

### 2. SVG 추출
- {원본 파일} → {새 아이콘 컴포넌트}: {설명}
- ...

### 3. 스타일 교정
- {파일명}: {변경 내용}
- ...

### 4. 디자인 시스템 이관
- {컴포넌트명} → @packages/design-system: {설명}
- ...

### 변경 통계
- 새 파일: N개
- 수정 파일: N개
- TypeScript 검증: 통과/실패
```

## 주의사항

- 기존 기능을 절대 변경하지 않습니다. 리팩토링만 수행합니다.
- 각 에이전트는 파일 충돌을 피하기 위해 워크트리 격리 환경에서 작업합니다.
- 검사할 내용이 없는 관점의 에이전트는 생성하지 않습니다.
- 작업 전 반드시 원본 파일을 읽고 이해한 후 수정합니다.
