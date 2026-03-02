import { type ReactNode, useEffect, useMemo, useState } from 'react';
import type { HighlighterCore } from 'shiki/core';

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getOrCreateHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [import('shiki/themes/github-dark.mjs')],
        langs: [
          import('shiki/langs/typescript.mjs'),
          import('shiki/langs/tsx.mjs'),
          import('shiki/langs/javascript.mjs'),
          import('shiki/langs/jsx.mjs'),
          import('shiki/langs/css.mjs'),
          import('shiki/langs/html.mjs'),
          import('shiki/langs/json.mjs'),
          import('shiki/langs/bash.mjs'),
          import('shiki/langs/yaml.mjs'),
          import('shiki/langs/markdown.mjs'),
          import('shiki/langs/python.mjs'),
          import('shiki/langs/sql.mjs'),
          import('shiki/langs/diff.mjs'),
        ],
        engine: createJavaScriptRegexEngine(),
      }),
    );
  }
  return highlighterPromise;
}

function useHighlighter() {
  const [h, setH] = useState<HighlighterCore | null>(null);
  useEffect(() => {
    getOrCreateHighlighter().then(setH);
  }, []);
  return h;
}

interface CodeBlockProps {
  children?: ReactNode;
  className?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const language = className?.replace('language-', '') ?? '';
  const code = String(children).replace(/\n$/, '');
  const highlighter = useHighlighter();

  const html = useMemo(() => {
    if (!highlighter || !language) return '';
    try {
      return highlighter.codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      });
    } catch {
      return '';
    }
  }, [highlighter, code, language]);

  if (!language) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <pre>
      <code className={className} {...props}>
        {children}
      </code>
    </pre>
  );
}

export function Pre({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
