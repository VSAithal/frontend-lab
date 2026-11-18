import type { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table'
export type TableProps<TData> = {
  /**
   * Rows to display. Keep the reference stable between renders (state, a
   * query result or a module constant). Never pass `data ?? []` inline.
   */
  data: TData[]
  /**
   * Column definitions, usually built with `createColumnHelper`. Define them
   * outside the component or wrap them in `useMemo`.
   */

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
  /**
   * Sort applied on first render when the table manages its own sort state.
   */
  initialSorting?: SortingState
  /**
   * Controlled sort state. When set, also pass `onSortingChange`,
   * otherwise header clicks will have no effect.
   */
  sorting?: SortingState
  /**
   * Called when the user changes the sort.
   */

  onSortingChange?: OnChangeFn<SortingState>
  /**
   * Set to true when rows arrive already sorted (for example by a server),
   * so the table does not sort them again.
   * @default false
   */
  manualSorting?: boolean
}
