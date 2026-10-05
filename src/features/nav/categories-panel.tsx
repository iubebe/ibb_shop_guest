import type { MenuCategory } from '@/api/types'
import { ALL_CATEGORY_ID } from '@/features/menu/constants'
import { cn } from '@/lib/utils'

interface CategoriesPanelProps {
  categories: MenuCategory[]
  selectedId: string
  onSelect: (categoryId: string) => void
}

export function CategoriesPanel({ categories, selectedId, onSelect }: CategoriesPanelProps) {
  const all = [{ id: ALL_CATEGORY_ID, name: 'Tất cả' }, ...categories]
  return (
    <ul className="flex flex-col gap-2">
      {all.map((category) => (
        <li key={category.id}>
          <button
            type="button"
            onClick={() => onSelect(category.id)}
            aria-current={category.id === selectedId}
            className={cn(
              'min-h-11 w-full rounded-lg border px-3 text-left text-base transition-colors active:bg-muted',
              category.id === selectedId && 'border-primary bg-primary/10 font-medium',
            )}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
