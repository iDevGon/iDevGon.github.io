---
title: 실무에서 바로 쓰는 Git 워크플로우 팁
author: DevGon
date: 2026-01-15
tags:
  - Git
  - 워크플로우
  - DX
---

매일 사용하는 Git이지만, 몇 가지 팁만 알면 훨씬 효율적으로 협업할 수 있습니다.

## 커밋 메시지 컨벤션

```
feat: 사용자 프로필 페이지 추가
fix: 로그인 시 토큰 만료 처리 수정
refactor: API 호출 로직 커스텀 훅으로 분리
chore: ESLint 설정 업데이트
```

## 유용한 Git 명령어

### Interactive Rebase

커밋 히스토리를 정리할 때 사용합니다.

```bash
git rebase -i HEAD~3
```

### Stash with Message

작업 중인 변경사항을 임시 저장할 때 메시지를 함께 남기세요.

```bash
git stash push -m "로그인 폼 작업 중"
git stash list
```

### Bisect

버그가 어느 커밋에서 발생했는지 이진 탐색으로 찾습니다.

```bash
git bisect start
git bisect bad        # 현재 커밋에 버그 있음
git bisect good v1.0  # 이 버전은 정상
```

> 커밋은 작고 의미 있는 단위로 나누세요. 리뷰어가 이해하기 쉽고, 문제 발생 시 되돌리기도 쉽습니다.
