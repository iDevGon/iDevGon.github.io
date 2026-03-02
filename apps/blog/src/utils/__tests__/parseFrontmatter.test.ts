import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from '../parseFrontmatter';

describe('parseFrontmatter', () => {
  it('정상적인 frontmatter를 파싱한다', () => {
    const md = `---
title: 테스트 제목
author: DevGon
date: 2024-01-15
description: 설명입니다
tags:
  - React
  - TypeScript
---
본문 내용`;

    const result = parseFrontmatter(md);

    expect(result.data.title).toBe('테스트 제목');
    expect(result.data.author).toBe('DevGon');
    expect(result.data.date).toBe('2024-01-15');
    expect(result.data.description).toBe('설명입니다');
    expect(result.data.tags).toEqual(['React', 'TypeScript']);
    expect(result.content).toBe('본문 내용');
  });

  it('tags 배열을 올바르게 파싱한다', () => {
    const md = `---
title: 태그 테스트
author: DevGon
date: 2024-01-01
tags:
  - JavaScript
  - CSS
  - HTML
---
내용`;

    const result = parseFrontmatter(md);
    expect(result.data.tags).toEqual(['JavaScript', 'CSS', 'HTML']);
  });

  it('frontmatter가 없는 마크다운은 기본값을 반환한다', () => {
    const md = '# 제목\n\n본문 내용';
    const result = parseFrontmatter(md);

    expect(result.data.title).toBe('Untitled');
    expect(result.data.author).toBe('Unknown');
    expect(result.data.date).toBe('');
    expect(result.data.tags).toEqual([]);
    expect(result.data.description).toBeUndefined();
    expect(result.content).toBe(md);
  });

  it('빈 문자열을 처리한다', () => {
    const result = parseFrontmatter('');

    expect(result.data.title).toBe('Untitled');
    expect(result.data.author).toBe('Unknown');
    expect(result.content).toBe('');
  });

  it('description이 없는 경우 undefined를 반환한다', () => {
    const md = `---
title: 설명 없음
author: DevGon
date: 2024-01-01
tags:
  - test
---
내용`;

    const result = parseFrontmatter(md);
    expect(result.data.description).toBeUndefined();
  });

  it('value에 콜론이 포함된 경우를 처리한다', () => {
    const md = `---
title: React: 시작하기
author: DevGon
date: 2024-01-01
tags:
  - React
---
내용`;

    const result = parseFrontmatter(md);
    expect(result.data.title).toBe('React: 시작하기');
  });
});
