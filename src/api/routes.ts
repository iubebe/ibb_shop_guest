/** All backend REST paths, relative to `env.apiUrl` (which already includes `/api`). */
export const API_ROUTES = {
  health: '/health',
  guest: {
    table: (qrToken: string) => `/guest/tables/${encodeURIComponent(qrToken)}`,
    menu: (qrToken: string) => `/guest/tables/${encodeURIComponent(qrToken)}/menu`,
    orders: (qrToken: string) => `/guest/tables/${encodeURIComponent(qrToken)}/orders`,
  },
} as const
