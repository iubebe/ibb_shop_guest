import { useTableOrders } from '@/api/hooks/use-table-orders'
import { formatPrice } from '@/features/menu/format-price'
import { ORDER_STATUS_LABEL } from '@/features/orders/types'
import { cn } from '@/lib/utils'
import { useTableStore } from '@/stores/table-store'

const timeFormat = new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' })

function servedLabel(served: number, quantity: number) {
  if (served >= quantity) return 'Đã phục vụ'
  if (served === 0) return 'Chưa phục vụ'
  return `Đã phục vụ ${served}/${quantity}`
}

export function OrdersPanel() {
  const qrToken = useTableStore((state) => state.qrToken)
  const { data: orders, isPending, isError, refetch } = useTableOrders(qrToken)

  if (isPending) return <p className="py-8 text-center text-muted-foreground">Đang tải đơn hàng...</p>
  if (isError) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Không tải được đơn hàng.{' '}
        <button type="button" className="min-h-11 px-2 text-primary underline" onClick={() => refetch()}>
          Thử lại
        </button>
      </p>
    )
  }
  if (orders.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Bàn chưa có đơn hàng nào.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <li key={order.id} className="rounded-xl border p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="font-medium">{timeFormat.format(new Date(order.createdAt))}</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{ORDER_STATUS_LABEL[order.status]}</span>
          </div>
          <ul className="mb-2 flex flex-col gap-1 text-sm">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-2">
                <span>
                  {item.quantity} × {item.name}
                  {order.status === 'confirmed' && (
                    <span
                      className={cn(
                        'ml-2 rounded-full px-2 py-0.5 text-xs',
                        item.servedQuantity >= item.quantity ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {servedLabel(item.servedQuantity, item.quantity)}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-muted-foreground">{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="text-right text-base font-semibold">{formatPrice(order.total)}</p>
        </li>
      ))}
    </ul>
  )
}
