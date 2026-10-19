# Shop name on the menu — 17/10/2026

Main doc: `ibb_shop_backend/docs/17102026/shop_name_editor_api.md`.

The menu response has `shopName`; `src/features/menu/menu-page.tsx` shows it as the page heading (falls back to "Thực đơn") and sets `document.title`. Build/lint pass; not checked in a browser. Name changes appear after the menu cache is busted (done on save) and a reload.
