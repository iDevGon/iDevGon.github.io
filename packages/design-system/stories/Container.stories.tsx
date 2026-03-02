import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../src/components/Container';

const meta = {
	title: 'Components/Container',
	component: Container,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Container는 반응형 max-width와 padding을 제공합니다.',
		style: { background: 'rgba(0,0,0,0.05)' },
	},
};
