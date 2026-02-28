---
name: frontend-quality-pipeline
description: 블로그 앱 프론트엔드 코드에 React 성능 최적화, 컴포지션 패턴, 웹 인터페이스 가이드라인을 순차적으로 적용하여 품질을 개선합니다.
user_invocable: true
metadata:
  author: DevGon
  version: "1.0.0"
  argument-hint: <검사 범위 (선택, 미지정 시 apps/blog/src/ 전체)>
---

# Frontend Quality Pipeline

블로그 앱 프론트엔드 코드에 3단계 품질 개선 파이프라인을 순차적으로 적용하는 스킬입니다.

## 파이프라인 단계

| 단계 | 스킬 | 초점 | 영향도 |
|------|------|------|--------|
| 1 | **vercel-react-best-practices** | React 성능 최적화 (워터폴 제거, 번들 최적화, 리렌더 최적화) | CRITICAL–HIGH |
| 2 | **vercel-composition-patterns** | 컴포넌트 구조 개선 (boolean prop 제거, 합성 패턴, 상태 관리) | HIGH–MEDIUM |
| 3 | **web-design-guidelines** | 웹 인터페이스 UX/접근성 가이드라인 준수 | MEDIUM |

## 실행 절차

### Phase 0: 코드베이스 탐색

대상 경로(기본: `apps/blog/src/`)의 컴포넌트 구조를 파악합니다.

수집할 정보:
- 모든 컴포넌트·훅·유틸 파일 목록
- 현재 React 버전 확인 (React 19 API 적용 여부 판단)
- 프로젝트 빌드 도구 및 라우팅 프레임워크 확인 (TanStack Router, Vite 등)

### Phase 1: React 성능 최적화 (vercel-react-best-practices)

`.agents/skills/vercel-react-best-practices/` 규칙을 기반으로 코드를 감사하고 개선합니다.

**감사 순서** (우선순위순):

1. **워터폴 제거 (CRITICAL)**: `async-` 규칙 적용
   - 불필요한 await 지연, 병렬화 가능한 Promise, Suspense 경계 확인
2. **번들 최적화 (CRITICAL)**: `bundle-` 규칙 적용
   - barrel import, dynamic import, 서드파티 지연 로딩 확인
3. **리렌더 최적화 (MEDIUM)**: `rerender-` 규칙 적용
   - 불필요한 구독, memo 패턴, derived state, functional setState 확인
4. **렌더링 성능 (MEDIUM)**: `rendering-` 규칙 적용
   - SVG 애니메이션, content-visibility, 조건부 렌더링 패턴 확인
5. **JS 성능 (LOW-MEDIUM)**: `js-` 규칙 적용
   - DOM 배치, Map/Set 활용, 조기 리턴 패턴 확인

**작업 방식**:
- `.agents/skills/vercel-react-best-practices/rules/` 디렉토리의 개별 규칙 파일을 참조
- 위반 항목 발견 시 바로 코드 수정 적용
- 각 규칙별 변경 사항을 기록

### Phase 2: 컴포지션 패턴 개선 (vercel-composition-patterns)

`.agents/skills/vercel-composition-patterns/` 규칙을 기반으로 컴포넌트 구조를 개선합니다.

**감사 순서** (우선순위순):

1. **컴포넌트 아키텍처 (HIGH)**: `architecture-` 규칙 적용
   - boolean prop 남용 → 합성 패턴 전환, compound component 구조화
2. **상태 관리 (MEDIUM)**: `state-` 규칙 적용
   - 상태 구현 분리, context 인터페이스 정의, 상태 끌어올리기
3. **구현 패턴 (MEDIUM)**: `patterns-` 규칙 적용
   - 명시적 variant 컴포넌트, children 우선 합성
4. **React 19 API (MEDIUM)**: `react19-` 규칙 적용 (React 19+ 프로젝트만)
   - forwardRef 제거, use() 활용

**작업 방식**:
- `.agents/skills/vercel-composition-patterns/rules/` 디렉토리의 개별 규칙 파일을 참조
- Phase 1에서 수정한 코드 위에 추가 개선 적용
- 구조 변경 시 기존 import 경로가 깨지지 않도록 주의

### Phase 3: 웹 인터페이스 가이드라인 (web-design-guidelines)

Vercel의 Web Interface Guidelines를 기반으로 UX/접근성을 점검합니다.

**작업 방식**:
1. `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`에서 최신 가이드라인 fetch
2. Phase 1~2에서 수정된 최종 코드에 가이드라인 적용
3. 접근성, 인터랙션, 시각적 일관성 등 위반 항목 수정

### Phase 4: 검증

모든 개선 완료 후:
- TypeScript 타입 체크 (`pnpm tsc --noEmit`) 통과 확인
- 빌드 확인 (`pnpm build`)
- 실패 시 원인 파악 후 수정

### Phase 5: 결과 보고

최종 결과를 아래 형식으로 출력합니다:

```
## Frontend Quality Pipeline 결과

### Phase 1: React 성능 최적화
| 규칙 | 파일 | 변경 내용 |
|------|------|-----------|
| {규칙ID} | {파일경로}:{라인} | {변경 설명} |

### Phase 2: 컴포지션 패턴 개선
| 규칙 | 파일 | 변경 내용 |
|------|------|-----------|
| {규칙ID} | {파일경로}:{라인} | {변경 설명} |

### Phase 3: 웹 인터페이스 가이드라인
| 항목 | 파일 | 변경 내용 |
|------|------|-----------|
| {가이드라인 항목} | {파일경로}:{라인} | {변경 설명} |

### 변경 통계
- Phase 1 적용: N건
- Phase 2 적용: N건
- Phase 3 적용: N건
- 수정 파일: N개
- TypeScript 검증: 통과/실패
- 빌드 검증: 통과/실패
```

## 주의사항

- **순차 실행**: 각 Phase는 이전 Phase의 결과물 위에서 작업하므로 반드시 순서대로 실행
- **기능 보존**: 기존 기능을 절대 변경하지 않음. 리팩토링·최적화만 수행
- **규칙 파일 참조**: 각 규칙의 상세 설명과 코드 예시는 반드시 해당 스킬의 `rules/` 디렉토리 파일을 읽고 적용
- **선별적 적용**: 프로젝트에 해당하지 않는 규칙(예: Next.js 전용 규칙, SSR 전용 규칙)은 건너뜀
- **변경 최소화**: 위반이 없는 코드는 그대로 유지. 불필요한 변경 금지
- **작업 전 읽기**: 수정 전 반드시 원본 파일을 읽고 이해한 후 수정
