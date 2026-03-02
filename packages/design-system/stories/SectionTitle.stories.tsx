import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from '../src/components/SectionTitle';

const meta = {
	title: 'Components/SectionTitle',
	component: SectionTitle,
	tags: ['autodocs'],
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: '최근 글' },
};
