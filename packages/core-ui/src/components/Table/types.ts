import { ColumnDef } from '@tanstack/react-table'
export type TableProps<TData> = {
  data: TData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  /**
   * Accessible name of the table. Always required.
   */
  caption: string
  /**
   * Hides the caption visually but keeps it for screen readers.
   * @default false
   */
  hideCaption?: boolean
  /**
   * Returns a stable unique id for a row. Defaults to the row index.
   */
  getRowId?: (row: TData) => string
}
