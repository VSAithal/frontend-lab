import { Skeleton } from '@components/Skeleton'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    className: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Avatar: Story = {
  args: {
    className: 'ds-h-12 ds-w-12 ds-rounded-full',
  },
}

export const NameLine: Story = {
  args: {
    className: 'ds-h-5 ds-w-48',
  },
}

export const TextLine: Story = {
  args: {
    className: 'ds-h-4 ds-w-32',
  },
}
