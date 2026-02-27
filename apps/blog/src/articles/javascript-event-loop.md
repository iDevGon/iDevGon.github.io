---
title: JavaScript 이벤트 루프 완벽 이해
author: DevGon
date: 2025-10-25
tags:
  - JavaScript
  - 이벤트루프
  - 비동기
---

이벤트 루프는 JavaScript의 비동기 동작을 이해하는 핵심입니다. 싱글 스레드인 JS가 어떻게 동시성을 처리하는지 알아봅니다.

## 구성 요소

- **Call Stack**: 현재 실행 중인 함수
- **Web APIs**: setTimeout, fetch 등 브라우저 제공 API
- **Task Queue (Macrotask)**: setTimeout, setInterval 콜백
- **Microtask Queue**: Promise.then, MutationObserver

## 실행 순서

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 출력: 1, 4, 3, 2
```

**마이크로태스크가 매크로태스크보다 우선합니다.**

## 실무에서의 의미

- `Promise.then`은 다음 매크로태스크 전에 실행됨
- `requestAnimationFrame`은 렌더링 직전에 실행됨
- 긴 동기 작업은 UI를 블로킹하므로 청크로 분할 필요

> 이벤트 루프를 이해하면 "왜 이 코드가 이 순서로 실행되는지"에 대한 의문이 사라집니다.
