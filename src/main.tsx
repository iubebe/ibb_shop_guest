import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { queryClient } from '@/api/query-client'
import { BranchTitle } from '@/components/branch-title'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BranchTitle />
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
