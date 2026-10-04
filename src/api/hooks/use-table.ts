import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { API_ROUTES } from '@/api/routes'
import type { GuestTable } from '@/api/types'

export async function getTable(qrToken: string) {
  const { data } = await apiClient.get<GuestTable>(API_ROUTES.guest.table(qrToken))
  return data
}

/** Resolves the QR token to a table; errors (404) when the token is invalid. */
export function useTable(qrToken: string | null) {
  return useQuery({
    queryKey: queryKeys.guest.table(qrToken ?? ''),
    queryFn: () => getTable(qrToken!),
    enabled: !!qrToken,
    retry: false,
  })
}
