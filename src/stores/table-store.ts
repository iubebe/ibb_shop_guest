import { create } from 'zustand'

const TABLE_PARAM = 'table'

function readTokenFromUrl() {
  return new URLSearchParams(window.location.search).get(TABLE_PARAM)?.trim() || null
}

interface TableState {
  /** The table's QR token, from the scanned URL (`/?table=<qrToken>`). */
  qrToken: string | null
}

export const useTableStore = create<TableState>()(() => ({
  qrToken: readTokenFromUrl(),
}))
