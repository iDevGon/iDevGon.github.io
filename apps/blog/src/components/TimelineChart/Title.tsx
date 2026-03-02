import { Typo } from '@idevgon/design-system';
import type { ReactNode } from 'react';
import { timelineTitleStyle } from './styles';

export function Title({ children }: { children: ReactNode }) {
  return (
    <Typo variant="body2" asChild>
      <p className={timelineTitleStyle}>{children}</p>
    </Typo>
  );
}
