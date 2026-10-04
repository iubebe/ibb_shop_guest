export interface MenuCategory {
  id: string
  name: string
}

export interface MenuItem {
  id: string
  name: string
  categoryId: string
  /** Price in VND. */
  price: number
  /** Image URL; `null` renders the placeholder until real images exist. */
  image: string | null
}
