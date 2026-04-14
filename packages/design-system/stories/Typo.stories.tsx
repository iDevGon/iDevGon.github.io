import type { Meta, StoryObj } from '@storybook/react';
import { Typo } from '../src/components/Typo';

const meta = {
  title: 'Components/Typo',
  component: Typo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body1', 'body2', 'caption'],
    },
  },
} satisfies Meta<typeof Typo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: { children: 'Heading 1', variant: 'h1' },
};

export const H2: Story = {
  args: { children: 'Heading 2', variant: 'h2' },
};

export const H3: Story = {
  args: { children: 'Heading 3', variant: 'h3' },
};

export const Body1: Story = {
  args: { children: 'Body text 1', variant: 'body1' },
};

export const Body2: Story = {
  args: { children: 'Body text 2', variant: 'body2' },
};

export const Caption: Story = {
  args: { children: 'Caption text', variant: 'caption' },
};
