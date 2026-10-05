# Init guest project

Date: 04/10/2026

## Done
- Scaffolded Vite (`react-ts` template, React 19, TypeScript 6, oxlint) in place. The repo only had a README, so the template was generated in a scratch dir and copied over (create-vite refuses a non-empty dir).
- Added Tailwind CSS v4 via `@tailwindcss/vite` (see `vite.config.ts`, `src/index.css`).
- Added the `@/` -> `src/` alias in `vite.config.ts` and `tsconfig*.json` (no `baseUrl`; it is deprecated in TS 6).
- Ran `shadcn init -d`: `components.json` (style `base-nova`, neutral, lucide icons), `src/lib/utils.ts`, `src/components/ui/button.tsx`.
- `npm run build` passes. `npm run lint` shows one warning (fast refresh in `button.tsx`, shadcn-generated).

## Decisions
- Defaults for shadcn (neutral base color, `base-nova` style); can be changed later in `components.json`.
- Package name is `ibb_shop_guest`.

## Pending / next
- Pick router, data fetching, state (cart) libraries.
- Define the API base URL / env config for `ibb_shop_backend` (`/api`, Socket.IO).
- Build menu, cart and order screens.
- Add the project to `ibb_shop_release` once there is an image to build (Dockerfile).
- Nothing committed yet.

## Zustand (added same day)
- Installed `zustand`. Stores live in `src/stores/`.
- First store: `src/stores/cart-store.ts` (items, add/set quantity/remove/clear, persisted to localStorage under `ibb-guest-cart`, plus count/total selectors). Item shape is a placeholder until the backend product API is defined.
