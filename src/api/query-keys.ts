/** Central query key factory. Add one entry per resource: all/list/detail. */
export const queryKeys = {
  health: ['health'] as const,
  guest: {
    table: (qrToken: string) => ['guest', qrToken, 'table'] as const,
    menu: (qrToken: string) => ['guest', qrToken, 'menu'] as const,
    orders: (qrToken: string) => ['guest', qrToken, 'orders'] as const,
  },
} as const
