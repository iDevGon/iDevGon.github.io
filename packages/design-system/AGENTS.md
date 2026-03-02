# Design System 에이전트 가이드

## 컴포넌트 추가 시 필수 체크리스트

`src/components/`에 컴포넌트를 추가하거나 variants를 변경할 때 반드시 다음을 수행한다:

1. **스토리 파일 생성**: `stories/{ComponentName}.stories.tsx`
2. **`src/components/index.ts`에서 export 추가**

### 스토리 작성 규칙

- `title`은 `'Components/{ComponentName}'`
- `tags: ['autodocs']` 필수
- variants가 있으면 `argTypes`에 control 매핑 (boolean → `'boolean'`, enum → `'select'`)
- variant 조합마다 개별 Story export

```tsx
// 스토리 템플릿
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // boolean variant → { control: 'boolean' }
    // enum variant   → { control: 'select', options: ['a', 'b'] }
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '...' },
};
```

### 주의사항

- `@storybook/test`는 설치되어 있지 않음. `fn()` 대신 일반 콜백 사용
- Panda CSS `styled-system` alias는 Storybook vite config에서 자동 resolve됨
- Slot 같은 내부 유틸리티 컴포넌트는 스토리 불필요
