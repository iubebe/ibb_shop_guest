# Product cache check

Date: 19-10-2026

Main doc: `ibb_shop_backend/docs/19102026/product_redis_cache.md`.

## Result: no change needed
`useMenu` uses the global 30 s `staleTime` and no focus refetch, so a guest sees menu changes on the next page load or remount after that. The backend cache is dropped on every product change, so a reload is enough.
