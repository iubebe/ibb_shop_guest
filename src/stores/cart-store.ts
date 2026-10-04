import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (!existing) return { items: [...state.items, { ...item, quantity }] }
          return {
            items: state.items.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          }
        }),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        })),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'ibb-guest-cart-v2' },
  ),
)

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
