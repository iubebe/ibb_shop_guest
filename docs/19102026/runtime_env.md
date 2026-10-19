# ibb_shop_guest runtime env (`window.env`)

Date: 19/10/2026

Same change as ibb_sms, which was deployed and tested. Main doc: `ibb_sms/docs/19102026/runtime_env.md`.

- Key(s): `API_BASE_URL` and `WS_URL`, replacing `VITE_*`. Key list in `public/assets/environment/env.template.js`; only reader is `src/config/env.ts`.
- Dev: `vite-plugins/local-env-plugin.ts` serves `env.js` from `.env`. Rename old `VITE_*` keys in your own `.env`.
- Image: `docker-entrypoint.sh` renders `env.js` at start; `nginx.conf` sends `no-cache` for `/assets/environment/`.
- CI: removed build args and the "require URL" steps; the `VITE_*` / `STAGING_VITE_*` repo variables can be deleted.
- Verified: `pnpm build`, image run with env vars renders `env.js` with the no-cache header.
- Pending: release a new image, then bump the version in `ibb_shop_release` (older images ignore the env vars).
