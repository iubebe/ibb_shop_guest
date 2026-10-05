import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { API_ROUTES } from '@/api/routes'
import type { GuestMenu } from '@/api/types'

export async function getMenu(qrToken: string) {
  const { data } = await apiClient.get<GuestMenu>(API_ROUTES.guest.menu(qrToken))
  return data
}

export function useMenu(qrToken: string | null) {
  return useQuery({
    queryKey: queryKeys.guest.menu(qrToken ?? ''),
    queryFn: () => getMenu(qrToken!),
    enabled: !!qrToken,
  })
}
