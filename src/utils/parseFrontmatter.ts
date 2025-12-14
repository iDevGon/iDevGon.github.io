import type { ArticleFrontmatter } from '@/interfaces/article';

interface ParsedMarkdown {
  data: ArticleFrontmatter;
  content: string;
}

/**
 * 마크다운 파일에서 frontmatter를 파싱합니다.
 * gray-matter는 Node.js Buffer를 사용해서 브라우저에서 동작하지 않으므로
 * 직접 파싱합니다.
 */
export function parseFrontmatter(markdown: string): ParsedMarkdown {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return {
      data: {
        title: 'Untitled',
        author: 'Unknown',
        date: '',
        tags: [],
      },
      content: markdown,
    };
  }

  const [, frontmatterBlock, content] = match;
  const data = parseYaml(frontmatterBlock);

  return {
    data: {
      title: (data.title as string) ?? 'Untitled',
      author: (data.author as string) ?? 'Unknown',
      date: (data.date as string) ?? '',
      tags: (data.tags as string[]) ?? [],
    },
    content,
  };
}

/**
 * 간단한 YAML 파서 (frontmatter용)
 */
function parseYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');

  let currentKey = '';
  let isArray = false;
  let arrayValues: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 빈 줄 스킵
    if (!trimmedLine) continue;

    // 배열 아이템 (- value 형식)
    if (trimmedLine.startsWith('- ')) {
      if (isArray && currentKey) {
        arrayValues.push(trimmedLine.slice(2).trim());
      }
      continue;
    }

    // 이전 배열 저장
    if (isArray && currentKey) {
      result[currentKey] = arrayValues;
      isArray = false;
      arrayValues = [];
    }

    // key: value 형식
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex !== -1) {
      const key = trimmedLine.slice(0, colonIndex).trim();
      const value = trimmedLine.slice(colonIndex + 1).trim();

      if (value === '') {
        // 다음 줄이 배열일 수 있음
        currentKey = key;
        isArray = true;
        arrayValues = [];
      } else {
        result[key] = value;
      }
    }
  }

  // 마지막 배열 저장
  if (isArray && currentKey) {
    result[currentKey] = arrayValues;
  }

  return result;
}
