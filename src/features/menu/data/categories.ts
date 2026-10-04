import type { MenuCategory } from '@/features/menu/types'

export const ALL_CATEGORY_ID = 'all'

// Mock data until the backend product API exists.
export const MENU_CATEGORIES: MenuCategory[] = [
  { id: ALL_CATEGORY_ID, name: 'Tất cả' },
  { id: 'mon-chinh', name: 'Món chính' },
  { id: 'mon-cuon', name: 'Món cuốn' },
  { id: 'nem-nuong', name: 'Nem nướng' },
  { id: 'do-uong', name: 'Đồ uống' },
]
