# Right navigation drawer (categories, cart, orders by table)

Date: 05/10/2026

Follows [menu_page.md](./menu_page.md).

## Done
- Added shadcn `sheet` and `tabs` (`src/components/ui/`).
- `src/features/nav/`: `nav-drawer.tsx` (menu button in the header opens a right-side Sheet; cart count badge on the button), `categories-panel.tsx`, `cart-panel.tsx` (quantity +/- and subtotal), `table-picker.tsx`.
- `src/stores/table-store.ts`: table comes from the QR URL (`/?table=12`); the picker is the fallback and keeps the URL in sync with `history.replaceState`.
- `src/features/orders/`: `types.ts`, mock `data/mock-orders.ts`, `orders-panel.tsx` (orders of the current table with status Đang chờ / Đang làm / Đã phục vụ).
- Menu: `categoryId` on items, `data/categories.ts`, `menu-page.tsx` filters by the selected category (choosing one closes the drawer).

## Decisions
- Drawer instead of a permanent right rail, because the app is mobile-first (360px).
- Category selection state is local to `MenuPage`; table is global (Zustand); cart reuses `cart-store`.
- No place-order action yet; the cart panel only shows items and subtotal.

## Gotcha
`shadcn add` writes `import { cn } from "cn"` into generated components and re-adds the stray `cn` npm package. After every `shadcn add`: replace with `@/lib/utils` and run `pnpm remove cn`.

## Pending / next
- Not checked visually in a browser (build and lint only).
- Replace mock categories/orders with `src/api/hooks/` queries; realtime order status via `socketClient`.
- "Đặt món" (place order) flow.
