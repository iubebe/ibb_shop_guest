import { useTableStore } from '@/stores/table-store'

// Fallback when the QR code didn't carry a table number.
const TABLE_IDS = Array.from({ length: 12 }, (_, i) => String(i + 1))

export function TablePicker() {
  const tableId = useTableStore((state) => state.tableId)
  const setTable = useTableStore((state) => state.setTable)

  return (
    <div>
      <p className="mb-2 text-sm text-muted-foreground">
        {tableId ? `Bạn đang ngồi bàn ${tableId}` : 'Chọn bàn của bạn'}
      </p>
      <div className="grid grid-cols-6 gap-2">
        {TABLE_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTable(id)}
            aria-pressed={id === tableId}
            className="min-h-11 rounded-lg border text-base font-medium transition-colors active:bg-muted aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  )
}
