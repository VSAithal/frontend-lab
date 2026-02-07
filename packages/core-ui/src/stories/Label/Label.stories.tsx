import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@components/primitives/label'
import { Input } from '@components/Input'

const meta: Meta<typeof Label> = {
  tags: ['autodocs'],
  title: 'Primitives/Label',
  component: Label,
}
export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className="ds-grid ds-max-w-sm ds-gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </div>
  ),
}

export const DisabledInput: Story = {
  render: () => (
    <div className="ds-grid ds-max-w-sm ds-gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Disabled" disabled />
    </div>
  ),
}
