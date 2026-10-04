import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { API_ROUTES } from '@/api/routes'
import type { CreateOrderInput, GuestOrder } from '@/api/types'

export async function getTableOrders(qrToken: string) {
  const { data } = await apiClient.get<GuestOrder[]>(API_ROUTES.guest.orders(qrToken))
  return data
}

export async function createOrder(qrToken: string, input: CreateOrderInput) {
  const { data } = await apiClient.post<GuestOrder>(API_ROUTES.guest.orders(qrToken), input)
  return data
}

/** Open (not yet paid) orders of the table. */
export function useTableOrders(qrToken: string | null) {
  return useQuery({
    queryKey: queryKeys.guest.orders(qrToken ?? ''),
    queryFn: () => getTableOrders(qrToken!),
    enabled: !!qrToken,
    staleTime: 5_000,
  })
}

export function usePlaceOrder(qrToken: string | null) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrder(qrToken!, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.guest.orders(qrToken ?? '') }),
  })
}
