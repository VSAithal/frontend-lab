import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@components/primitives/table'
import { cn } from '@utils/cnHelper'

const repos = [
  { name: 'devinsight', language: 'TypeScript', stars: 42 },
  { name: 'portfolio', language: 'TypeScript', stars: 28 },
  { name: 'core-ui', language: 'TypeScript', stars: 31 },
  { name: 'react-experiments', language: 'TypeScript', stars: 19 },
  { name: 'dotfiles', language: 'Shell', stars: 7 },
  { name: 'nextjs', language: 'TypeScript', stars: 15 },
]

const meta: Meta<typeof TableRoot> = {
  tags: ['autodocs'],
  title: 'Primitives/Table',
  component: TableRoot,
}
export default meta

type Story = StoryObj<typeof TableRoot>

const Rows = () => (
  <TableBody>
    {repos.map((repo) => (
      <TableRow key={repo.name}>
        <TableCell className="ds-font-medium">{repo.name}</TableCell>
        <TableCell>{repo.language}</TableCell>
        <TableCell className="ds-text-right">{repo.stars}</TableCell>
      </TableRow>
    ))}
  </TableBody>
)

export const Default: Story = {
  render: () => (
    <TableRoot className="ds-border ds-border-border">
      <TableCaption>Repositories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Language</TableHead>
          <TableHead className="ds-text-right">Stars</TableHead>
        </TableRow>
      </TableHeader>
      <Rows />
    </TableRoot>
  ),
}

export const NarrowContainerScrolls: Story = {
  render: () => (
    <div className="ds-w-64 ds-border ds-border-border">
      <TableRoot className="ds-min-w-[480px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Language</TableHead>
            <TableHead className="ds-text-right">Stars</TableHead>
          </TableRow>
        </TableHeader>
        <Rows />
      </TableRoot>
    </div>
  ),
}

const stickyHead = 'ds-sticky ds-top-0 ds-z-10 ds-bg-background ds-shadow-sm'
export const VerticalScrollTable: Story = {
  render: () => (
    <TableRoot containerClassName="ds-h-40 ds-border ds-border-border">
      <TableHeader>
        <TableRow>
          <TableHead className={stickyHead}>Name</TableHead>
          <TableHead className={stickyHead}>Language</TableHead>
          <TableHead className={cn('ds-text-right', stickyHead)}>
            Stars
          </TableHead>
        </TableRow>
      </TableHeader>
      <Rows />
    </TableRoot>
  ),
}
