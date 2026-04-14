import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/components/Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'heading', 'block', 'circle'],
    },
    animation: { control: 'select', options: ['dimming', 'shimmer'] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: 'text', style: { width: '60%' } },
};

export const Heading: Story = {
  args: { variant: 'heading', style: { width: '40%' } },
};

export const Block: Story = {
  args: { variant: 'block' },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    style: { width: '4.8rem', height: '4.8rem' },
  },
};

export const Shimmer: Story = {
  args: { variant: 'block', animation: 'shimmer' },
};
