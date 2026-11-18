import type { Meta, StoryObj } from '@storybook/react-vite'
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { Table } from '@components/Table'
import { useState } from 'react'

type Repo = {
  name: string
  language: string
  stars: number
}
const repos: Repo[] = [
  { name: 'devinsight', language: 'TypeScript', stars: 42 },
  { name: 'portfolio', language: 'TypeScript', stars: 28 },
  { name: 'core-ui', language: 'TypeScript', stars: 31 },
  { name: 'react-experiments', language: '', stars: 19 },
  { name: 'dotfiles', language: 'Shell', stars: 7 },
  { name: 'nextjs', language: 'TypeScript', stars: 15 },
]

const columnHelper = createColumnHelper<Repo>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Repository Name',
  }),
  columnHelper.accessor('language', {
    header: 'Language',
    cell: (value) => value.getValue() || 'N/A',
  }),
  columnHelper.accessor('stars', {
    header: 'Stars',
  }),
]
const meta: Meta<typeof Table<Repo>> = {
  tags: ['autodocs'],
  title: 'Components/Table',
  component: Table,
  args: {
    data: repos,
    columns,
    caption: 'Repositories',
  },
}
export default meta

type Story = StoryObj<typeof Table<Repo>>

export const Default: Story = {}

export const HideCaptionTable: Story = {
  args: {
    hideCaption: true,
  },
}

export const WithGetRowId: Story = {
  args: {
    getRowId: (repo) => repo.name,
  },
}

export const InitialSorting: Story = {
  args: {
    initialSorting: [{ id: 'stars', desc: true }],
  },
}

const ControlledExample = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  return (
    <div className="ds-grid ds-gap-3">
      <Table
        data={repos}
        columns={columns}
        caption="Repositories"
        sorting={sorting}
        onSortingChange={setSorting}
      />
      <pre className="ds-text-xs ds-text-muted-foreground">
        {JSON.stringify(sorting)}
      </pre>
    </div>
  )
}

export const ControlledSorting: Story = {
  render: () => <ControlledExample />,
}
