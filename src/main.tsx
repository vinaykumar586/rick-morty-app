import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { QueryClientProvider,QueryClient } from '@tanstack/react-query'

const queryCleint= new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={queryCleint}>
    <App />
    </QueryClientProvider>
  // </StrictMode>,
)
