import { cn } from '@/lib/utils'
import { MENU_CATEGORIES } from '@/features/menu/data/categories'

interface CategoriesPanelProps {
  selectedId: string
  onSelect: (categoryId: string) => void
}

export function CategoriesPanel({ selectedId, onSelect }: CategoriesPanelProps) {
  return (
    <ul className="flex flex-col gap-2">
      {MENU_CATEGORIES.map((category) => (
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
