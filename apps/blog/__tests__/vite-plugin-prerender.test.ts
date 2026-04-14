import { describe, expect, it } from 'vitest';
import { buildMetaTags, escapeHtml } from '../prerender-utils';

describe('escapeHtml', () => {
  it('&를 이스케이핑한다', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b');
  });

  it('"를 이스케이핑한다', () => {
    expect(escapeHtml('a"b')).toBe('a&quot;b');
  });

  it("'를 이스케이핑한다", () => {
    expect(escapeHtml("a'b")).toBe('a&#39;b');
  });

  it('<를 이스케이핑한다', () => {
    expect(escapeHtml('a<b')).toBe('a&lt;b');
  });

  it('>를 이스케이핑한다', () => {
    expect(escapeHtml('a>b')).toBe('a&gt;b');
  });

  it('여러 특수문자를 동시에 이스케이핑한다', () => {
    expect(escapeHtml('<script>"alert(\'xss\')&"</script>')).toBe(
      '&lt;script&gt;&quot;alert(&#39;xss&#39;)&amp;&quot;&lt;/script&gt;',
    );
  });
});

describe('buildMetaTags', () => {
  const baseFm = {
    title: '테스트 글',
    description: '테스트 설명',
    author: 'DevGon',
    date: '2024-01-15',
    tags: ['React', 'TypeScript'],
  };

  it('title을 올바른 형식으로 포맷한다', () => {
    const result = buildMetaTags('test-article', baseFm);
    expect(result).toContain('<title>테스트 글 | DevGon&#39;s Log</title>');
  });

  it('OG 태그를 포함한다', () => {
    const result = buildMetaTags('test-article', baseFm);
    expect(result).toContain('property="og:type" content="article"');
    expect(result).toContain('property="og:title"');
    expect(result).toContain('property="og:description"');
    expect(result).toContain('property="og:url"');
    expect(result).toContain('property="og:image"');
  });

  it('JSON-LD를 포함한다', () => {
    const result = buildMetaTags('test-article', baseFm);
    expect(result).toContain('application/ld+json');
    expect(result).toContain('"@type":"BlogPosting"');
    expect(result).toContain('"headline":"테스트 글"');
  });

  it('tags를 article:tag 메타로 포함한다', () => {
    const result = buildMetaTags('test-article', baseFm);
    expect(result).toContain('article:tag" content="React"');
    expect(result).toContain('article:tag" content="TypeScript"');
  });

  it('date가 없는 경우 article:published_time을 생략한다', () => {
    const fm = { ...baseFm, date: undefined };
    const result = buildMetaTags('test-article', fm);
    expect(result).not.toContain('article:published_time');
  });

  it('description이 없는 경우 빈 문자열을 사용한다', () => {
    const fm = { ...baseFm, description: undefined };
    const result = buildMetaTags('test-article', fm);
    expect(result).toContain('name="description" content=""');
  });

  it('URL에 articleId를 포함한다', () => {
    const result = buildMetaTags('my-post', baseFm);
    expect(result).toContain(
      'https://idevgon.github.io/articles/detail/my-post',
    );
  });
});
