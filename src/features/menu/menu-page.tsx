import { useState } from 'react'
import { MenuItemCard } from '@/features/menu/components/menu-item-card'
import { ALL_CATEGORY_ID, MENU_CATEGORIES } from '@/features/menu/data/categories'
import { MENU_ITEMS } from '@/features/menu/data/menu-items'
import { NavDrawer } from '@/features/nav/nav-drawer'
import { useTableStore } from '@/stores/table-store'

export function MenuPage() {
  const [categoryId, setCategoryId] = useState(ALL_CATEGORY_ID)
  const tableId = useTableStore((state) => state.tableId)

  const category = MENU_CATEGORIES.find((c) => c.id === categoryId)
  const items =
    categoryId === ALL_CATEGORY_ID ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.categoryId === categoryId)

  return (
    <main className="mx-auto min-h-svh w-full max-w-md px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Thực đơn</h1>
          <p className="text-sm text-muted-foreground">
            {tableId ? `Bàn ${tableId} · ` : ''}
            {category?.name}
          </p>
        </div>
        <NavDrawer selectedCategoryId={categoryId} onSelectCategory={setCategoryId} />
      </header>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </ul>
    </main>
  )
}
