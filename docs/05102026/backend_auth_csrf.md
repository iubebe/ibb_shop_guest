# Backend auth: what the guest app needs

Date: 05/10/2026

Main doc: `ibb_shop_backend/docs/05102026/setup_auth.md`. Nothing is implemented in this project yet.

- Guest endpoints are public (no login) but every POST needs a CSRF token: call `GET /api/auth/csrf` first (sets the `csrf_token` cookie), then send its value in the `X-CSRF-Token` header. Use `credentials: 'include'` on requests.
- The backend must list this app's origin in `CORS_ORIGINS`.
- Next: add the CSRF fetch/header to the API client (propose a reusable hook/helper first, per project rules).
