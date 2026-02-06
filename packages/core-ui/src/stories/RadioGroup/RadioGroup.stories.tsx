import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RadioGroup, type RadioOption } from '@components/RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    itemClassName: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
  },
}
export default meta

type Story = StoryObj<typeof RadioGroup>

const baseOptions: RadioOption[] = [
  { value: 'email', label: 'Email', description: 'Get updates via email' },
  { value: 'sms', label: 'SMS', description: 'Get updates via text' },
  { value: 'push', label: 'Push', description: 'Get push notifications' },
]

export const Default: Story = {
  args: {
    defaultValue: 'email',
    options: baseOptions,
  },
}

export const WithDisabledOption: Story = {
  args: {
    defaultValue: 'email',
    options: [
      ...baseOptions.slice(0, 2),
      {
        value: 'push',
        label: 'Push',
        description: 'Disabled option',
        disabled: true,
      },
    ],
  },
}

export const DisabledWholeGroup: Story = {
  args: {
    defaultValue: 'email',
    disabled: true,
    options: baseOptions,
  },
}

export const LongLabelsWrapping: Story = {
  args: {
    defaultValue: 'email',
    options: [
      {
        value: 'email',
        label:
          'Email — a long label to verify wrapping behaviour in smaller containers',
        description:
          'This description is also long to verify it wraps nicely and stays readable.',
      },
      { value: 'sms', label: 'SMS', description: 'Short label' },
    ],
  },
  render: (args) => (
    <div className="ds-max-w-xs ds-border ds-border-border ds-p-4">
      <RadioGroup {...args} />
    </div>
  ),
}

export const CustomSpacingAndItemStyle: Story = {
  args: {
    defaultValue: 'email',
    options: baseOptions,
    className: 'ds-gap-4',
    itemClassName: 'ds-border-secondary data-[state=checked]:ds-bg-secondary',
  },
}

export const Controlled: Story = {
  args: {
    options: baseOptions,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('sms')

    return (
      <div className="ds-grid ds-gap-3">
        <RadioGroup
          {...args}
          value={value}
          onValueChange={(v) => setValue(v)}
        />
        <div className="ds-text-sm ds-text-muted-foreground">
          Selected value: <span className="ds-font-medium">{value}</span>
        </div>
      </div>
    )
  },
}

export const Playground: Story = {
  args: {
    defaultValue: 'email',
    options: baseOptions,
    className: '',
    itemClassName: '',
  },
  render: (args) => (
    <div className="ds-grid ds-gap-4">
      <div className="ds-text-sm ds-text-muted-foreground">
        Use the controls panel to modify props like <code>className</code>,{' '}
        <code>itemClassName</code>, and options.
      </div>
      <RadioGroup {...args} />
    </div>
  ),
}

/**
 * This story is visual-only: shows how you might present an error state around RadioGroup.
 * Your RadioGroup component doesn’t currently have an `error` prop (good!), but consumers can wrap it.
 */
export const WithErrorMessageWrapper: Story = {
  args: {
    defaultValue: 'email',
    options: baseOptions,
  },
  render: (args) => (
    <div className="ds-grid ds-gap-2">
      <RadioGroup
        {...args}
        className="ds-gap-2"
        itemClassName="ds-border-destructive focus-visible:ds-ring-destructive"
      />
      <p className="ds-text-xs ds-text-destructive">
        Please select one option.
      </p>
    </div>
  ),
}
