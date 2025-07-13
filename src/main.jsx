import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import Router from './routes/Router.jsx'

import './index.css'
import { AuthProvider } from './controllers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <>
   <AuthProvider>
     <RouterProvider router={Router} />
    </AuthProvider>
  </>,
)
