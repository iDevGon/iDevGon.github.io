#!/bin/bash

ARTICLES_DIR="$(dirname "$0")/src/articles"

# 제목 입력
read -rp "글 제목: " TITLE
if [ -z "$TITLE" ]; then
  echo "제목을 입력해주세요."
  exit 1
fi

# 태그 입력
read -rp "태그 (쉼표로 구분, 예: React, TypeScript): " TAGS_INPUT

# 파일명 생성 (한글/특수문자 -> 하이픈, 소문자)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9가-힣]/-/g' | sed 's/-\{2,\}/-/g' | sed 's/^-//;s/-$//')
FILENAME="${SLUG}.md"
FILEPATH="${ARTICLES_DIR}/${FILENAME}"

if [ -f "$FILEPATH" ]; then
  echo "이미 존재하는 파일입니다: $FILENAME"
  exit 1
fi

# 오늘 날짜
DATE=$(date +%Y-%m-%d)

# 태그 YAML 생성
TAGS_YAML=""
IFS=',' read -ra TAG_ARRAY <<< "$TAGS_INPUT"
for tag in "${TAG_ARRAY[@]}"; do
  trimmed=$(echo "$tag" | xargs)
  if [ -n "$trimmed" ]; then
    TAGS_YAML="${TAGS_YAML}  - ${trimmed}\n"
  fi
done

# 파일 생성
cat > "$FILEPATH" << EOF
---
title: ${TITLE}
author: DevGon
date: ${DATE}
tags:
$(echo -e "$TAGS_YAML" | sed '/^$/d')
---

여기에 본문 내용을 작성합니다.

## 소제목

본문 텍스트 예시입니다.
EOF

echo "생성 완료: $FILEPATH"
