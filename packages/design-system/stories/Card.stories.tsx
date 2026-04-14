import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    interactive: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'highlighted'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Card content goes here' },
};

export const Interactive: Story = {
  args: { children: 'Hover me!', interactive: true },
};

export const Highlighted: Story = {
  args: { children: 'Highlighted card', variant: 'highlighted' },
};
