import type { Order } from '@/features/orders/types'

// Mock data until the backend order API exists.
export const MOCK_ORDERS: Order[] = [
  {
    id: 'DH-1001',
    tableId: '1',
    status: 'served',
    createdAt: '2026-10-05T11:20:00+07:00',
    lines: [
      { name: 'Mẹt 3 Miền', quantity: 1, price: 129_000 },
      { name: 'Nem lụi Huế', quantity: 2, price: 70_000 },
    ],
  },
  {
    id: 'DH-1002',
    tableId: '1',
    status: 'preparing',
    createdAt: '2026-10-05T11:45:00+07:00',
    lines: [{ name: 'Bún mắm Heo Quay', quantity: 2, price: 65_000 }],
  },
  {
    id: 'DH-1003',
    tableId: '2',
    status: 'pending',
    createdAt: '2026-10-05T11:50:00+07:00',
    lines: [{ name: 'Nem bò nướng sả', quantity: 1, price: 80_000 }],
  },
]
