/** Response shapes of `ibb_shop_backend` (`src/modules/guest/guest.types.ts`). */

export interface GuestTable {
  id: string
  name: string
}

export interface MenuCategory {
  id: string
  name: string
}

export interface MenuProduct {
  id: string
  categoryId: string | null
  name: string
  /** VND */
  price: number
  imageUrl: string | null
}

export interface GuestMenu {
  categories: MenuCategory[]
  products: MenuProduct[]
}

export type OrderStatus = 'pending_confirmation' | 'confirmed' | 'paid' | 'cancelled'

export interface GuestOrderItem {
  productId: string
  name: string
  quantity: number
  unitPrice: number
  notes: string | null
}

export interface GuestOrder {
  id: string
  status: OrderStatus
  total: number
  /** ISO timestamp */
  createdAt: string
  items: GuestOrderItem[]
}

export interface CreateOrderInput {
  items: { productId: string; quantity: number; notes?: string }[]
}
