export type OrderStatus = 'pending' | 'preparing' | 'served'

export interface OrderLine {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  tableId: string
  status: OrderStatus
  /** ISO timestamp. */
  createdAt: string
  lines: OrderLine[]
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Đang chờ',
  preparing: 'Đang làm',
  served: 'Đã phục vụ',
}
