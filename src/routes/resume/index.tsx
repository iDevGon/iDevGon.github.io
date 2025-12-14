import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resume/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SsgoiTransition id="/resume">
      <div>Hello "/resume/"!</div>
    </SsgoiTransition>
  );
}
