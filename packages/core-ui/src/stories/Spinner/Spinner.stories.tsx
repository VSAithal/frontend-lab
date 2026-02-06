import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '@components/Spinner'

type SpinnerType = typeof Spinner
type Story = StoryObj<SpinnerType>
type SpinnerMetaProps = Meta<SpinnerType>

const meta: SpinnerMetaProps = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta

export const Default: Story = {
  args: {},
}

const StoryVariant = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div>
    <b>{title}</b>
    {children}
  </div>
)

export const Sizes: Story = {
  args: {},
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
      }}
    >
      <StoryVariant title="Extra Small">
        <Spinner size="xs" />
      </StoryVariant>
      <StoryVariant title="Small">
        <Spinner size="sm" />
      </StoryVariant>
      <StoryVariant title="Medium">
        <Spinner />
      </StoryVariant>
      <StoryVariant title="Large">
        <Spinner size="lg" />
      </StoryVariant>
      <StoryVariant title="Extra Large">
        <Spinner size="xl" />
      </StoryVariant>
    </div>
  ),
}
