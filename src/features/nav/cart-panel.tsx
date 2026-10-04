import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/features/menu/format-price'
import { selectCartTotal, useCartStore } from '@/stores/cart-store'

export function CartPanel() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)
  const setQuantity = useCartStore((state) => state.setQuantity)

  if (items.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Giỏ hàng đang trống.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3 rounded-xl border p-3">
            <div className="min-w-0 flex-1">
              <p className="text-base leading-snug font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                className="size-11"
                aria-label={`Giảm ${item.name}`}
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
              >
                <Minus />
              </Button>
              <span className="w-6 text-center text-base">{item.quantity}</span>
              <Button
                variant="outline"
                className="size-11"
                aria-label={`Tăng ${item.name}`}
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
              >
                <Plus />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t pt-3 text-base">
        <span>Tạm tính</span>
        <span className="text-lg font-semibold">{formatPrice(total)}</span>
      </div>
    </div>
  )
}
