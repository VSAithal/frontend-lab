import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortDirection,
  type SortingState,
} from '@tanstack/react-table'
import { TableProps } from './types'
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from '@components/primitives/table'
import { cn } from '@utils/cnHelper'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

const ariaSortValue = {
  asc: 'ascending',
  desc: 'descending',
} as const

const SortIcon = ({ sorted }: { sorted: false | SortDirection }) => {
  if (sorted === 'asc') return <ArrowUp className="ds-size-4" aria-hidden />
  if (sorted === 'desc') return <ArrowDown className="ds-size-4" aria-hidden />
  return <ArrowUpDown className="ds-size-4 ds-opacity-40" aria-hidden />
}
export function Table<TData>({
  data,
  columns,
  caption,
  hideCaption = false,
  getRowId,
  initialSorting = [],
  sorting: controlledSorting,
  onSortingChange,
  manualSorting = false,
}: TableProps<TData>) {
  const [internalSorting, setInternalSorting] =
    useState<SortingState>(initialSorting)
  const table = useReactTable({
    data,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting: controlledSorting ?? internalSorting },
    onSortingChange: onSortingChange ?? setInternalSorting,
    getSortedRowModel: getSortedRowModel(),
    manualSorting,
  })

  return (
    <TableRoot>
      <TableCaption className={cn(hideCaption && 'ds-sr-only')}>
        {caption}
      </TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort()
              const sorted = header.column.getIsSorted()
              const ariaSort = !canSort
                ? undefined
                : sorted
                  ? ariaSortValue[sorted]
                  : 'none'
              const content = header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )
              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  aria-sort={ariaSort}
                >
                  {canSort && !header.isPlaceholder ? (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="ds-inline-flex ds-items-center ds-gap-1 ds-rounded-sm ds-font-medium hover:ds-text-foreground focus-visible:ds-outline-none focus-visible:ds-ring-1 focus-visible:ds-ring-ring"
                    >
                      {content}
                      <SortIcon sorted={sorted} />
                    </button>
                  ) : (
                    content
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  )
}
