import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../src/components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currentPage: 1, totalPages: 5 },
};

export const MiddlePage: Story = {
  args: { currentPage: 3, totalPages: 5 },
};

export const LastPage: Story = {
  args: { currentPage: 5, totalPages: 5 },
};
