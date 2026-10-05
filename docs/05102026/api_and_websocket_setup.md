# API and WebSocket integration setup

Date: 05/10/2026

## Done
- Installed `axios`, `@tanstack/react-query`, `socket.io-client` (with pnpm; the repo now has `pnpm-lock.yaml` next to the older `package-lock.json`).
- `src/config/env.ts` + `.env.example` (`VITE_API_URL`, `VITE_WS_URL`); `.env.local` is git-ignored. Types in `src/vite-env.d.ts`.
- REST, in `src/api/`:
  - `client.ts`: axios `apiClient` + `ApiError` (interceptor normalizes errors).
  - `routes.ts`: `API_ROUTES` constants (only `health` for now).
  - `query-client.ts`: shared `QueryClient` (no retry on 4xx), wired in `src/main.tsx`.
  - `query-keys.ts`: key factory.
  - `hooks/use-health.ts`: the pattern for a resource, a plain method plus a `useQuery` hook; re-exported from `hooks/index.ts`.
- WebSocket, in `src/ws/`:
  - `events.ts`: `ServerToClientEvents` / `ClientToServerEvents` (currently the backend's `ping`/`pong`).
  - `socket-client.ts`: `SocketClient` class (lazy `connect`, `disconnect`, typed `on`/`emit`, status tracking) and the `socketClient` singleton.
- `npm`-style checks: build passes, lint has only the existing shadcn `button.tsx` warning.

## Decisions
- One `SocketClient` singleton, websocket transport only, lazy connect.
- Method and hook live in the same file per resource under `api/hooks/`.
- Backend base URL includes the `/api` prefix; the Socket.IO URL does not (see `ibb_shop_backend/src/main.ts`, `events.gateway.ts`).

## Pending / next
- Not run against a live backend yet.
- Proposed reusable pieces awaiting approval: `useSocketEvent`, `useSocketStatus`, mutation helper pattern (see chat).
- Real routes/events once the order and product APIs exist.
