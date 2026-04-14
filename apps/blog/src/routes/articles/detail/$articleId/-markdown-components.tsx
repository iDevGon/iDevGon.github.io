import { Children } from 'react';
import type { Components } from 'react-markdown';
import { CodeBlock, Pre } from '@idevgon/code-block';
import { getHeadingId } from './-toc';

const H2: Components['h2'] = ({ children, node, ...props }) => (
  <h2 id={getHeadingId(children)} {...props}>
    {children}
  </h2>
);
const H3: Components['h3'] = ({ children, node, ...props }) => (
  <h3 id={getHeadingId(children)} {...props}>
    {children}
  </h3>
);

const EM_DASH_RE = /(— .+? —|— .+$)/;

const P: Components['p'] = ({ children, node, ...props }) => (
  <p {...props}>
    {Children.map(children, (child) => {
      if (typeof child !== 'string') return child;
      const parts = child.split(EM_DASH_RE);
      if (parts.length === 1) return child;
      return parts.map((part) =>
        EM_DASH_RE.test(part) ? (
          <span key={part} className="em-dash-aside">
            {part}
          </span>
        ) : (
          part
        ),
      );
    })}
  </p>
);

export const MARKDOWN_COMPONENTS = {
  code: CodeBlock,
  pre: Pre,
  h2: H2,
  h3: H3,
  p: P,
};
