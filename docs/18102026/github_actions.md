# GitHub Actions for ibb_shop_guest

Date: 18-10-2026

## Done
- `ci.yml`, `develop.yml` and `release-please-*.json` already existed (commit "feat: ci setup"), unchanged.
- Added `.github/workflows/staging.yml`: every push to `develop` builds and pushes `ghcr.io/iubebe/ibb_shop_guest:dev-<sha7>`, then dispatches `bump-version.yml` in `ibb_shop_release` (`service=guest`, `environment=staging`).
- Added `.github/workflows/sync-develop.yml`: merges `main` back into `develop` after each push to `main` (PR fallback on conflict).
- Extended `release.yml` with the `request-prod-deploy` job (`service=guest`, `environment=prod`).
- All three mirror `ibb_sms/.github/workflows/`; only the service name differs.

## Decisions
- Image is per environment because Vite bakes `VITE_API_URL` / `VITE_WS_URL` into the bundle. Prod uses `VITE_*` repo variables, staging uses `STAGING_VITE_*`. Never deploy a `dev-*` tag to prod.

## Pending (GitHub settings, not in the repo)
- Repo variables: `VITE_API_URL`, `VITE_WS_URL`, `STAGING_VITE_API_URL`, `STAGING_VITE_WS_URL`.
- Secret `RELEASE_REPO_TOKEN`: fine-grained PAT on `iubebe/ibb_shop_release` with Actions: read/write and Contents: read.
- Allow Actions to create PRs; check the ghcr package visibility so doco-cd can pull.
- Workflows are untested until they run on GitHub.

## Next steps
- Push to `develop`, confirm the staging image and the bump PR, then bump `GUEST_VERSION` after the first release.
