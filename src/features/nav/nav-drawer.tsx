import { Menu } from 'lucide-react'
import { useState } from 'react'
import type { MenuCategory } from '@/api/types'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CartPanel } from '@/features/nav/cart-panel'
import { CategoriesPanel } from '@/features/nav/categories-panel'
import { OrdersPanel } from '@/features/orders/orders-panel'
import { selectCartCount, useCartStore } from '@/stores/cart-store'

interface NavDrawerProps {
  tableName: string
  categories: MenuCategory[]
  selectedCategoryId: string
  onSelectCategory: (categoryId: string) => void
}

/** Right-side navigation: categories, cart, and orders of the current table. */
export function NavDrawer({ tableName, categories, selectedCategoryId, onSelectCategory }: NavDrawerProps) {
  const [open, setOpen] = useState(false)
  const cartCount = useCartStore(selectCartCount)
  const [tab, setTab] = useState('categories')

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" className="relative size-11" aria-label="Mở menu điều hướng" />
        }
      >
        <Menu />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs text-primary-foreground">
            {cartCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        <SheetHeader>
          <SheetTitle className="text-lg">Quán Cuốn 3 Miền</SheetTitle>
          <SheetDescription>{tableName} · Danh mục, giỏ hàng và đơn hàng</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4 pb-4">
          <Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
            <TabsList className="w-full gap-2">
              <TabsTrigger value="categories" className="min-h-5">Danh mục</TabsTrigger>
              <TabsTrigger value="cart" className="min-h-5">Giỏ hàng</TabsTrigger>
              <TabsTrigger value="orders" className="min-h-5">Đơn hàng</TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
              <CategoriesPanel
                categories={categories}
                selectedId={selectedCategoryId}
                onSelect={(id) => {
                  onSelectCategory(id)
                  setOpen(false)
                }}
              />
            </TabsContent>
            <TabsContent value="cart">
              <CartPanel onOrdered={() => setTab('orders')} />
            </TabsContent>
            <TabsContent value="orders">
              <OrdersPanel />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
