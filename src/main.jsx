import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import Router from './routes/Router.jsx'

import './index.css'
import { AuthProvider } from './controllers/AuthProvider.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utilities/queryclient.js'

createRoot(document.getElementById('root')).render(
  <>
  <QueryClientProvider client={queryClient}>
   <AuthProvider>
     <RouterProvider router={Router} />
    </AuthProvider>
  </QueryClientProvider>
  </>,
)
