import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@components/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
}

export default meta

export const Default: StoryObj = {}

export const WithLabel: StoryObj = {
  args: {
    label: 'Accept terms',
  },
}

export const WithDescription: StoryObj = {
  args: {
    label: 'Accept terms',
    description: 'You must accept before continuing',
  },
}
