import type { Meta, StoryObj } from '@storybook/react';
import { ButtonBase } from '../src/components/Button';

const meta = {
  title: 'Components/Button',
  component: ButtonBase,
  tags: ['autodocs'],
  argTypes: {
    outline: { control: 'boolean' },
    wiggled: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Outline: Story = {
  args: { children: 'Outline Button', outline: true },
};

export const Wiggled: Story = {
  args: { children: 'Wiggled Button', wiggled: true },
};
