# Shop name in the tab title

Date: 19-10-2026

Main doc: `ibb_shop_backend/docs/19102026/public_branch_name_endpoint.md`.

## Done
- `usePublicBranchName` (`src/api/hooks/use-branch.ts`) calls `GET /branch/public`.
- `src/components/branch-title.tsx`, mounted in `src/main.tsx`, sets `document.title` to the shop name. Covers screens where the menu never loads (e.g. invalid QR). `menu-page.tsx` keeps its own title effect.

## Pending
- Not checked in a browser; needs the backend endpoint deployed first.
