---
title: 프론트엔드 보안 기초 체크리스트
author: DevGon
date: 2025-11-28
tags:
  - 보안
  - XSS
  - CSRF
---

프론트엔드 개발자도 기본적인 보안 지식은 반드시 갖추어야 합니다. 흔한 공격 벡터와 방어 방법을 정리합니다.

## XSS (Cross-Site Scripting)

사용자 입력을 그대로 렌더링하면 스크립트가 실행될 수 있습니다.

```tsx
// 위험: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// 안전: React가 자동으로 이스케이프
<div>{userInput}</div>
```

## CSRF (Cross-Site Request Forgery)

- SameSite 쿠키 속성 설정
- CSRF 토큰 사용
- Origin/Referer 헤더 검증

## Content Security Policy

CSP 헤더로 허용된 리소스만 로드하도록 제한합니다.

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'
```

## 기타 체크리스트

- HTTPS 강제 적용
- 민감 데이터를 localStorage에 저장하지 않기
- 의존성 취약점 정기 점검 (`npm audit`)
- 서드파티 스크립트 최소화
