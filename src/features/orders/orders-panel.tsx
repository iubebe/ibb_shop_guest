import { formatPrice } from '@/features/menu/format-price'
import { MOCK_ORDERS } from '@/features/orders/data/mock-orders'
import { ORDER_STATUS_LABEL } from '@/features/orders/types'
import { useTableStore } from '@/stores/table-store'

export function OrdersPanel() {
  const tableId = useTableStore((state) => state.tableId)

  if (!tableId) {
    return <p className="py-8 text-center text-muted-foreground">Hãy chọn bàn để xem đơn hàng.</p>
  }

  const orders = MOCK_ORDERS.filter((order) => order.tableId === tableId)
  if (orders.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Bàn {tableId} chưa có đơn hàng nào.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => {
        const total = order.lines.reduce((sum, l) => sum + l.price * l.quantity, 0)
        return (
          <li key={order.id} className="rounded-xl border p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="font-medium">{order.id}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {ORDER_STATUS_LABEL[order.status]}
              </span>
            </div>
            <ul className="mb-2 flex flex-col gap-1 text-sm">
              {order.lines.map((line) => (
                <li key={line.name} className="flex justify-between gap-2">
                  <span>
                    {line.quantity} × {line.name}
                  </span>
                  <span className="text-muted-foreground">{formatPrice(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <p className="text-right text-base font-semibold">{formatPrice(total)}</p>
          </li>
        )
      })}
    </ul>
  )
}
