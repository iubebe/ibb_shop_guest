import type { OrderStatus } from '@/api/types'

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending_confirmation: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  paid: 'Đã thanh toán',
  cancelled: 'Đã huỷ',
}
