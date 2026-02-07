import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@components/Input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/primitives/InputGroup'
import { Search, Mail } from 'lucide-react'

const meta: Meta<typeof Input> = {
  tags: ['autodocs'],
  title: 'Components/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'text' },
    className: { control: 'text' },
    onChange: { action: 'onChange' },
  },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Type here…',
    'aria-label': 'Default input',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    'aria-label': 'Password input',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled…',
    'aria-label': 'Disabled input',
  },
}

export const WithLeftIcon: Story = {
  name: 'With Left Icon',
  render: () => (
    <InputGroup>
      <InputGroupAddon position="left">
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" aria-label="Search" />
    </InputGroup>
  ),
}

export const WithRightIcon: Story = {
  name: 'With Right Icon',
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Email…" aria-label="Email" />
      <InputGroupAddon position="right">
        <Mail />
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithSuffixUnit: Story = {
  name: 'With Suffix Unit',
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="0" aria-label="Weight" />
      <InputGroupAddon position="right" className="ds-text-xs ds-font-medium">
        kg
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithPrefixAndSuffix: Story = {
  name: 'With Prefix + Suffix',
  render: () => (
    <InputGroup>
      <InputGroupAddon position="left" className="ds-text-xs ds-font-medium">
        $
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" aria-label="Amount" />
      <InputGroupAddon position="right" className="ds-text-xs ds-font-medium">
        USD
      </InputGroupAddon>
    </InputGroup>
  ),
}
