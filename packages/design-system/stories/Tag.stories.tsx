import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'React' },
};

export const Small: Story = {
  args: { children: 'TypeScript', size: 'sm' },
};
