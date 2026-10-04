import { create } from 'zustand'

const TABLE_PARAM = 'table'

function readTableFromUrl() {
  return new URLSearchParams(window.location.search).get(TABLE_PARAM)?.trim() || null
}

interface TableState {
  /** Table number scanned from the QR code (`?table=12`) or picked manually. */
  tableId: string | null
  setTable: (tableId: string) => void
}

export const useTableStore = create<TableState>()((set) => ({
  tableId: readTableFromUrl(),
  setTable: (tableId) => {
    // Keep the URL in sync so a refresh keeps the table.
    const url = new URL(window.location.href)
    url.searchParams.set(TABLE_PARAM, tableId)
    window.history.replaceState(null, '', url)
    set({ tableId })
  },
}))
