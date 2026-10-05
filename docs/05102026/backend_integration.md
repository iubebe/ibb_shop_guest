# Backend integration (menu, table, orders)

Date: 05/10/2026

Main doc: `ibb_shop_backend/docs/05102026/guest_api_and_demo_seed.md`. Follows [right_nav_drawer.md](./right_nav_drawer.md).

## Done
- All mock data removed (`features/menu/data/*`, `features/orders/data/mock-orders.ts`); the app now reads from the backend.
- `src/api/`: `routes.ts` (guest routes), `query-keys.ts`, `types.ts` (backend response shapes), hooks `use-table`, `use-menu`, `use-table-orders` (also `usePlaceOrder`).
- `src/api/client.ts`: `withCredentials`, automatic CSRF token (fetched from `/auth/csrf`, sent as `X-CSRF-Token` on unsafe requests, one retry on a CSRF 403), validation messages joined into `ApiError.message`.
- Table comes from `/?table=<qrToken>` (`src/stores/table-store.ts`, now only `qrToken`). The table name shown in the header and drawer comes from the API.
- Menu page states: no token ("quét mã QR"), invalid token, loading skeleton, error with retry, empty.
- Drawer: categories from the API; the cart tab has an "Đặt món" button (POST order, clears the cart, jumps to the orders tab); the orders tab shows real open orders (Chờ xác nhận / Đã xác nhận).
- Cart persistence key bumped to `ibb-guest-cart-v2` so old mock product ids are dropped.

## Decisions
- The manual table picker was removed: tables are identified by an unguessable QR token, so a number grid can't work.
- Local dev URL: `http://localhost:5173/?table=demo-table-01` (after `pnpm db:seed:demo` in the backend).

## Pending / next
- Not checked in a browser (build and lint only; API checked with curl).
- Orders don't refresh on their own; wire `socketClient` once the backend emits order events.
- Real product images.
