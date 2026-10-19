import { useEffect } from 'react'
import { usePublicBranchName } from '@/api/hooks'

/** Keeps the browser tab title on the shop name (index.html holds the fallback). */
export function BranchTitle() {
  const name = usePublicBranchName().data
  useEffect(() => {
    if (name) document.title = name
  }, [name])
  return null
}
