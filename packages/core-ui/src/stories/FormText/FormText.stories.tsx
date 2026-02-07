import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@components/primitives/label'
import { Input } from '@components/Input'
import { FormDescription } from '@components/primitives/Form/FormDescription'
import { FormMessage } from '@components/primitives/Form/FormMessage'
import { FormHelper } from '@components/primitives/Form/FormHelper'

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Primitives/Form Text',
}
export default meta

type Story = StoryObj

export const DescriptionOnly: Story = {
  render: () => (
    <div className="ds-grid ds-max-w-sm ds-gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
      <FormHelper>
        <FormDescription>We’ll never share your email.</FormDescription>
      </FormHelper>
    </div>
  ),
}

export const ErrorOnly: Story = {
  render: () => (
    <div className="ds-grid ds-max-w-sm ds-gap-2">
      <Label htmlFor="email2" className="ds-text-destructive">
        Email
      </Label>
      <Input id="email2" placeholder="you@example.com" aria-invalid="true" />
      <FormHelper>
        <FormMessage>Email is required.</FormMessage>
      </FormHelper>
    </div>
  ),
}

export const DescriptionAndError: Story = {
  render: () => (
    <div className="ds-grid ds-max-w-sm ds-gap-2">
      <Label htmlFor="email3" className="ds-text-destructive">
        Email
      </Label>
      <Input id="email3" placeholder="you@example.com" aria-invalid="true" />
      <FormHelper>
        <FormDescription>Use a valid email address.</FormDescription>
        <FormMessage>Email is required.</FormMessage>
      </FormHelper>
    </div>
  ),
}
