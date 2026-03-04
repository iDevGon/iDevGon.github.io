---
name: notion-to-article
description: Notion 페이지를 가져와 블로그 아티클로 작성하고, 내용 검토와 맞춤법 교정까지 한 번에 수행합니다.
user_invocable: true
metadata:
  author: DevGon
  version: "1.0.0"
  argument-hint: <Notion 페이지 URL (선택)>
---

# Notion to Article

Notion 페이지 내용을 블로그 아티클로 변환하는 파이프라인 스킬입니다.
`/new-article` → `/review-article` → `/proofread` 순서로 실행합니다.

## 실행 절차

### 1. Notion 페이지 URL 입력받기

- **인자가 주어진 경우**: 해당 URL을 그대로 사용합니다.
- **인자가 없는 경우**: AskUserQuestion 도구로 Notion 페이지 URL을 입력받습니다.
  - 질문: "블로그 글로 변환할 Notion 페이지 URL을 입력해 주세요."

### 2. Notion 페이지 가져오기

ToolSearch로 `mcp__notion__notion-fetch` 도구를 로드한 뒤, 해당 URL의 페이지 내용을 가져옵니다.

- 페이지 제목과 본문 텍스트를 추출합니다.
- 가져오기에 실패하면 사용자에게 알리고 URL을 다시 입력받습니다.

### 3. 아티클 작성 (/new-article)

Skill 도구로 `/new-article`을 실행합니다.

- Notion 페이지에서 추출한 내용을 인자로 전달합니다.
- 인자 형식: 주제, 카테고리(태그 힌트), 원문 내용을 포함합니다.
- 예시: `노션에서 가져온 글을 블로그 아티클로 작성해줘. 주제는 "{제목}"이고, 원문 내용은 다음과 같아: {본문}`

### 4. 내용 검토 (/review-article)

Skill 도구로 `/review-article`을 실행합니다.

- 3단계에서 생성된 파일명을 인자로 전달합니다.
- 보완 제안이 나오면 사용자에게 적용 여부를 확인받습니다.

### 5. 맞춤법 교정 (/proofread)

Skill 도구로 `/proofread`를 실행합니다.

- 동일한 파일명을 인자로 전달합니다.
- 교정 항목이 나오면 사용자에게 적용 여부를 확인받습니다.

### 6. 완료 보고

모든 단계가 끝나면 아래 내용을 요약해서 보고합니다:

- 생성된 파일 경로
- /review-article에서 보완한 항목 수
- /proofread에서 교정한 항목 수
