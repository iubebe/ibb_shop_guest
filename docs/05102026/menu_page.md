# Menu page (mock data)

Date: 05/10/2026

## Done
- `src/features/menu/`: `menu-page.tsx`, `components/menu-item-card.tsx`, `components/menu-item-image.tsx`, `data/menu-items.ts` (5 mock dishes, VND), `format-price.ts` (`vi-VN` currency), `types.ts`.
- Mobile-first single column (`max-w-md`), full-width 44px "Thêm vào giỏ" button wired to `src/stores/cart-store.ts` (label becomes "Thêm nữa (n)" once in the cart).
- Image placeholder: a grey box labelled "heightxwidth" (96x96) while `image` is `null`; passing a URL renders a real `<img>`.
- `index.html`: `lang="vi"`, title "Iubebe Shop", `viewport-fit=cover`.
- Fixed a shadcn init bug: `src/lib/utils.ts` and `button.tsx` imported `cn` from a stray npm package `cn`. Now `cn` is clsx + tailwind-merge in `src/lib/utils.ts`; the stray package is removed.

## Decisions
- `formatPrice` and `MenuItemImage` stay local to `features/menu` until proposed for sharing.
- Menu data is a static array; swap for a `useMenu` hook in `src/api/hooks/` when the backend has a products endpoint.

## Pending / next
- Not checked visually in a browser (build and lint only).
- Cart bar / cart screen, order placement, real images and product API.
