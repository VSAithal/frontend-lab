import { Button } from '@components/Button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail } from 'lucide-react'

type ButtonType = typeof Button
type Story = StoryObj<ButtonType>
type ButtonMetaProps = Meta<ButtonType>

const meta: ButtonMetaProps = {
  tags: ['autodocs'],
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    rounded: {
      control: 'select',
      options: ['base', 'fullRounded'],
    },
    size: {
      control: 'select',
      options: ['base', 'sm', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    children: {},
  },
}
export default meta

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'base',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'lg',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'base',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'sm',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'base',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'base',
  },
}
export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    variant: 'secondary',
    size: 'base',
  },
  render: (args) => (
    <Button {...args}>
      <Mail className="ds-mr-2 ds-size-4" />
      Login with Email
    </Button>
  ),
  argTypes: {
    children: {
      control: false,
    },
  },
}

export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    variant: 'outline',
    size: 'icon',
  },
  render: (args) => (
    <Button {...args}>
      <Mail className="ds-size-4" />
    </Button>
  ),
  argTypes: {
    children: {
      control: false,
    },
  },
}

export const Loading: Story = {
  args: {
    ...Primary.args,
    isLoading: true,
  },
}
