import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { queryKeys } from '@/api/query-keys'
import { API_ROUTES } from '@/api/routes'

export async function getPublicBranchName() {
  const { data } = await apiClient.get<{ name: string }>(API_ROUTES.publicBranch)
  return data.name
}

/** The shop name, available before any table/menu is loaded. */
export function usePublicBranchName() {
  return useQuery({
    queryKey: queryKeys.publicBranch,
    queryFn: getPublicBranchName,
    staleTime: 10 * 60_000,
  })
}
