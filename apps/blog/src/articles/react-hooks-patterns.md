---
title: 커스텀 훅 패턴 모음
author: DevGon
date: 2025-12-15
tags:
  - React
  - Hooks
  - 패턴
---

잘 만든 커스텀 훅은 로직의 재사용성을 높이고, 컴포넌트를 깔끔하게 유지합니다.

## useDebounce

입력값의 변경을 지연시켜 불필요한 API 호출을 방지합니다.

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## useMediaQuery

반응형 로직을 훅으로 추상화합니다.

```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

## useLocalStorage

상태를 로컬 스토리지와 동기화합니다.

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}
```
