import type { MenuItem } from '@/features/menu/types'

// Mock data until the backend product API exists.
export const MENU_ITEMS: MenuItem[] = [
  { id: 'met-3-mien', name: 'Mẹt 3 Miền', categoryId: 'mon-chinh', price: 129_000, image: null },
  { id: 'bun-mam-heo-quay', name: 'Bún mắm Heo Quay', categoryId: 'mon-chinh', price: 65_000, image: null },
  { id: 'banh-trang-cuon-thit-heo', name: 'Bánh tráng cuốn thịt heo', categoryId: 'mon-cuon', price: 70_000, image: null },
  { id: 'nem-lui-hue', name: 'Nem lụi Huế', categoryId: 'nem-nuong', price: 70_000, image: null },
  { id: 'nem-bo-nuong-sa', name: 'Nem bò nướng sả', categoryId: 'nem-nuong', price: 80_000, image: null },
  { id: 'tra-chanh-nha-dam-hat-chia', name: 'Trà Chanh Nha Đam hạt chia', categoryId: 'do-uong', price: 30_000, image: null },
  { id: 'tra-sam-dua-nha-dam-hat-chia', name: 'Trà Sâm Dứa Nha Đam hạt chia', categoryId: 'do-uong', price: 15_000, image: null },
  { id: 'nuoc-sam-dua', name: 'Nước sâm dứa', categoryId: 'do-uong', price: 10_000, image: null },
  { id: 'lavie', name: 'Lavie', categoryId: 'do-uong', price: 10_000, image: null },
  { id: 'pepsi-coca', name: 'Pepsi/Coca', categoryId: 'do-uong', price: 20_000, image: null },
]
