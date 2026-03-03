---
module: icons
path: packages/icons
keywords: SVG, icon-components, react, leaf-package
---

# Icons (★)

#module-icons

## Purpose

`@idevgon/icons`는 블로그 전체에서 사용하는 SVG 아이콘을 React 컴포넌트로 제공한다. 외부 의존성이 없는 **leaf 패키지**로, 다른 패키지들이 의존한다.

## Key Files

| File | Role |
|------|------|
| `src/index.ts` | 모든 아이콘 re-export |
| `src/BlogIcon.tsx` | 블로그 아이콘 |
| `src/EmailIcon.tsx` | 이메일 아이콘 |
| `src/GithubIcon.tsx` | GitHub 아이콘 |
| `src/LinkIcon.tsx` | 링크 아이콘 |
| `src/LogoIcon.tsx` | 로고 아이콘 |
| `src/MoonIcon.tsx` | 달 아이콘 (다크모드) |
| `src/PhoneIcon.tsx` | 전화 아이콘 |
| `src/SearchIcon.tsx` | 검색 아이콘 |
| `src/SunIcon.tsx` | 해 아이콘 (라이트모드) |

## Public Interface

| Export | Type | Description |
|--------|------|-------------|
| `BlogIcon` | Component | 블로그 아이콘 SVG |
| `EmailIcon` | Component | 이메일 아이콘 SVG |
| `GithubIcon` | Component | GitHub 아이콘 SVG |
| `LinkIcon` | Component | 링크 아이콘 SVG |
| `LogoIcon` | Component | 사이트 로고 SVG |
| `MoonIcon` | Component | 달 아이콘 (다크모드 토글) |
| `PhoneIcon` | Component | 전화 아이콘 SVG |
| `SearchIcon` | Component | 검색 아이콘 SVG |
| `SunIcon` | Component | 해 아이콘 (라이트모드 토글) |

## Internal Flow

```text
각 아이콘 컴포넌트:
  (props: SVGProps<SVGSVGElement>) => <svg ...>{paths}</svg>

특징:
  - 순수 SVG → React 컴포넌트 변환
  - props 전달로 size, color, className 커스터마이즈 가능
  - currentColor 사용으로 부모의 color 상속
```

## Dependencies

| Direction | Module / Service | Via |
|-----------|-----------------|-----|
| **Uses** | (없음) | Leaf 패키지 |
| **Used by** | @idevgon/blog | Header, Footer, 검색 등 |
| **Used by** | @idevgon/design-system | ColorModeSwitch |
| **Used by** | @idevgon/timeline-chart | (간접) |

## Configuration

- Peer dependencies: React ^19.0.0

## Testing

- 별도 테스트 없음 (순수 SVG 래퍼)

## Related Notes

- [[Design System]]
- [[Blog App]]
