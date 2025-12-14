import { SsgoiTransition } from '@ssgoi/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SsgoiTransition id="/contact">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>John Doe</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>john.doe@example.com</td>
          </tr>
          <tr>
            <th>Message</th>
            <td>Hello, how are you?</td>
          </tr>
        </tbody>
      </table>
    </SsgoiTransition>
  );
}
