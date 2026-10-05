# Served progress in the orders tab

Date: 05/10/2026

Main doc: `ibb_shop_backend/docs/05102026/order_item_served_tracking.md`.

## Done
- `src/api/types.ts`: `GuestOrderItem.servedQuantity`.
- `src/features/orders/orders-panel.tsx`: on confirmed orders each line shows "Chưa phục vụ", "Đã phục vụ 1/2" or "Đã phục vụ". Pending orders show no badge.
- `src/api/hooks/use-table-orders.ts`: orders refetch every 15 s.

## Pending / next
- Replace polling with a push event when the backend allows guest sockets.
- Not checked in a browser (build and lint only).
