import { type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  tocActiveLinkStyle,
  tocAsideStyle,
  tocItemIndentedStyle,
  tocItemStyle,
  tocLinkStyle,
  tocListStyle,
  tocTitleStyle,
} from './-styles';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '');
}

export function getHeadingId(children: ReactNode): string {
  return slugify(getTextContent(children));
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (node && typeof node === 'object' && 'props' in (node as object)) {
    return getTextContent(
      (node as React.ReactElement<{ children?: ReactNode }>).props.children,
    );
  }
  return '';
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2]
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    headings.push({
      id: slugify(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }
  return headings;
}

function useActiveHeading(headings: Heading[]): string {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;

    let io: IntersectionObserver | null = null;

    const setup = () => {
      const elements = headings
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length === 0) return false;

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: '-80px 0px -70% 0px' },
      );

      for (const el of elements) io.observe(el);
      return true;
    };

    if (setup()) return () => io?.disconnect();

    const mo = new MutationObserver(() => {
      if (setup()) mo.disconnect();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, [headings]);

  return activeId;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const activeId = useActiveHeading(headings);

  if (headings.length < 2) return null;

  return (
    <aside className={tocAsideStyle}>
      <p className={tocTitleStyle}>목차</p>
      <nav>
        <ul className={tocListStyle}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? tocItemIndentedStyle : tocItemStyle}
            >
              <a
                href={`#${heading.id}`}
                className={
                  heading.id === activeId ? tocActiveLinkStyle : tocLinkStyle
                }
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(heading.id)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
