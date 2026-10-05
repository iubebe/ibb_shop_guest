import { useState, type ReactNode } from 'react'
import { useMenu } from '@/api/hooks/use-menu'
import { useTable } from '@/api/hooks/use-table'
import { Button } from '@/components/ui/button'
import { MenuItemCard } from '@/features/menu/components/menu-item-card'
import { ALL_CATEGORY_ID } from '@/features/menu/constants'
import { NavDrawer } from '@/features/nav/nav-drawer'
import { useTableStore } from '@/stores/table-store'

function PageShell({ subtitle, nav, children }: { subtitle: string; nav?: ReactNode; children: ReactNode }) {
  return (
    <main className="mx-auto min-h-svh w-full max-w-md px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Thực đơn</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {nav}
      </header>
      {children}
    </main>
  )
}

function Message({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-base font-medium">{title}</p>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      {action}
    </div>
  )
}

function MenuSkeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-busy="true" aria-label="Đang tải thực đơn">
      {Array.from({ length: 4 }, (_, i) => (
        <li key={i} className="h-[120px] animate-pulse rounded-xl bg-muted motion-reduce:animate-none" />
      ))}
    </ul>
  )
}

export function MenuPage() {
  const [categoryId, setCategoryId] = useState(ALL_CATEGORY_ID)
  const qrToken = useTableStore((state) => state.qrToken)
  const table = useTable(qrToken)
  const menu = useMenu(table.data ? qrToken : null)

  if (!qrToken) {
    return (
      <PageShell subtitle="">
        <Message title="Vui lòng quét mã QR trên bàn" hint="Mở camera và quét mã QR để xem thực đơn và gọi món." />
      </PageShell>
    )
  }
  if (table.isError) {
    return (
      <PageShell subtitle="">
        <Message
          title="Mã QR không hợp lệ"
          hint="Vui lòng quét lại mã QR trên bàn hoặc gọi nhân viên."
          action={<Button className="min-h-11" onClick={() => table.refetch()}>Thử lại</Button>}
        />
      </PageShell>
    )
  }
  if (table.isPending || menu.isPending) {
    return (
      <PageShell subtitle="Đang tải...">
        <MenuSkeleton />
      </PageShell>
    )
  }
  if (menu.isError) {
    return (
      <PageShell subtitle={table.data.name}>
        <Message
          title="Không tải được thực đơn"
          hint="Vui lòng kiểm tra kết nối và thử lại."
          action={<Button className="min-h-11" onClick={() => menu.refetch()}>Thử lại</Button>}
        />
      </PageShell>
    )
  }

  const { categories, products } = menu.data
  const category = categories.find((c) => c.id === categoryId)
  const items = category ? products.filter((p) => p.categoryId === category.id) : products

  return (
    <PageShell
      subtitle={`${table.data.name} · ${category?.name ?? 'Tất cả'}`}
      nav={
        <NavDrawer
          tableName={table.data.name}
          categories={categories}
          selectedCategoryId={category?.id ?? ALL_CATEGORY_ID}
          onSelectCategory={setCategoryId}
        />
      }
    >
      {items.length === 0 ? (
        <Message title="Chưa có món nào" />
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </ul>
      )}
    </PageShell>
  )
}
