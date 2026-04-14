import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../src/components/Flex';

const meta = {
  title: 'Components/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    justify: { control: 'select', options: ['start', 'center'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    wrap: { control: 'select', options: ['wrap', 'nowrap'] },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: string }) => (
  <div
    style={{
      padding: '1rem',
      background: '#4F7CAC',
      color: 'white',
      borderRadius: '0.4rem',
    }}
  >
    {children}
  </div>
);

export const Row: Story = {
  args: {
    direction: 'row',
    style: { gap: '1rem' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    style: { gap: '1rem' },
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};
