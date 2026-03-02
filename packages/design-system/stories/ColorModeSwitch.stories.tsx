import type { Meta, StoryObj } from '@storybook/react';
import { ColorModeSwitch } from '../src/components/ColorModeSwitch';

const meta = {
	title: 'Components/ColorModeSwitch',
	component: ColorModeSwitch,
	tags: ['autodocs'],
	argTypes: {
		colorMode: { control: 'select', options: ['light', 'dark'] },
	},
} satisfies Meta<typeof ColorModeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: { colorMode: 'light' },
};

export const Dark: Story = {
	args: { colorMode: 'dark' },
};
