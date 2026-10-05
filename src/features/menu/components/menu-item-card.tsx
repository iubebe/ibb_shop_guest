import { Plus } from 'lucide-react'
import type { MenuProduct } from '@/api/types'
import { Button } from '@/components/ui/button'
import { MenuItemImage } from '@/features/menu/components/menu-item-image'
import { formatPrice } from '@/features/menu/format-price'
import { useCartStore } from '@/stores/cart-store'

const IMAGE_SIZE = 96

export function MenuItemCard({ item }: { item: MenuProduct }) {
  const addItem = useCartStore((state) => state.addItem)
  const quantity = useCartStore(
    (state) => state.items.find((i) => i.productId === item.id)?.quantity ?? 0,
  )

  return (
    <li className="flex gap-3 rounded-xl border bg-card p-3 text-card-foreground">
      <MenuItemImage src={item.imageUrl} alt={item.name} height={IMAGE_SIZE} width={IMAGE_SIZE} />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div>
          <h2 className="text-base leading-snug font-medium">{item.name}</h2>
          <p className="text-base font-semibold text-primary">{formatPrice(item.price)}</p>
        </div>
        <Button
          className="min-h-11 w-full text-base"
          onClick={() => addItem({ productId: item.id, name: item.name, price: item.price })}
        >
          <Plus data-icon="inline-start" />
          {quantity > 0 ? `Thêm nữa (${quantity})` : 'Thêm vào giỏ'}
        </Button>
      </div>
    </li>
  )
}
