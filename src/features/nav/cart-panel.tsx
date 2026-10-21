import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { usePlaceOrder } from '@/api/hooks/use-table-orders'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/features/menu/format-price'
import { selectCartTotal, useCartStore } from '@/stores/cart-store'
import { useTableStore } from '@/stores/table-store'

const PHONE_SEPARATORS = /[\s.\-()]/g
const isValidPhone = (phone: string) => /^\+?\d{8,15}$/.test(phone.replace(PHONE_SEPARATORS, ''))
const INPUT_CLASS =
  'h-11 w-full rounded-md border border-input bg-background px-3 text-base placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

export function CartPanel({ onOrdered }: { onOrdered: () => void }) {
  const qrToken = useTableStore((state) => state.qrToken)
  const placeOrder = usePlaceOrder(qrToken)
  const clear = useCartStore((state) => state.clear)
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const phoneInvalid = phone.trim() !== '' && !isValidPhone(phone)

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
      <fieldset className="flex flex-col gap-2 border-t pt-3">
        <legend className="mb-1 text-base font-medium">Thông tin của bạn (không bắt buộc)</legend>
        <input
          className={INPUT_CLASS}
          aria-label="Tên"
          placeholder="Tên"
          autoComplete="name"
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={INPUT_CLASS}
          aria-label="Số điện thoại"
          placeholder="Số điện thoại"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          aria-invalid={phoneInvalid}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneInvalid && <p className="text-sm text-destructive">Số điện thoại không hợp lệ.</p>}
        <input
          className={INPUT_CLASS}
          aria-label="Địa chỉ"
          placeholder="Địa chỉ"
          autoComplete="street-address"
          maxLength={255}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </fieldset>
      {placeOrder.isError && (
        <p role="alert" className="text-sm text-destructive">
          Đặt món không thành công: {placeOrder.error.message}
        </p>
      )}
      <Button
        className="min-h-11 w-full text-base"
        disabled={placeOrder.isPending || phoneInvalid}
        onClick={() =>
          placeOrder.mutate(
            {
              customerName: name.trim() || undefined,
              customerPhone: phone.trim() || undefined,
              customerAddress: address.trim() || undefined,
              items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
            },
            {
              onSuccess: () => {
                clear()
                onOrdered()
              },
            },
          )
        }
      >
        {placeOrder.isPending ? 'Đang gửi...' : 'Đặt món'}
      </Button>
    </div>
  )
}
