---
title: 웹 폰트 최적화 완벽 가이드
author: DevGon
date: 2025-10-01
tags:
  - 성능
  - 폰트
  - CSS
---

웹 폰트는 사이트의 인상을 결정하지만, 잘못 다루면 성능의 병목이 됩니다. 로딩 전략부터 서브세팅까지 알아봅니다.

## font-display 전략

```css
@font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard.woff2') format('woff2');
  font-display: swap;
}
```

| 값 | 블로킹 | 교체 | 적합한 상황 |
|---|---|---|---|
| swap | 없음 | 있음 | 본문 텍스트 |
| optional | 매우 짧음 | 없음 | 보조 폰트 |
| fallback | 짧음 | 있음 | 제목 |

## 서브세팅

한글 폰트는 전체 파일이 수 MB에 달합니다. 사용하는 글자만 추출하면 크기를 90% 이상 줄일 수 있습니다.

```bash
pyftsubset Pretendard.ttf \
  --text-file=glyphs.txt \
  --output-file=Pretendard-subset.woff2 \
  --flavor=woff2
```

## 프리로드

```html
<link rel="preload" href="/fonts/Pretendard.woff2" as="font" type="font/woff2" crossorigin>
```

LCP에 영향을 주는 폰트는 반드시 프리로드하세요.

## Variable Font

```css
@font-face {
  font-family: 'Pretendard Variable';
  src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
}
```

여러 굵기를 하나의 파일로 제공하여 총 다운로드 크기를 줄입니다.
