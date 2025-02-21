import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { App } from './app'
import './app.css'
import { BookDetails } from './components/book-details'
import { BookList } from './components/book-list'
import { Err } from './components/page-error'
import './config'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Err />,
    children: [
      {
        index: true,
        loader: async function () {
          const resp = await fetch('/api/books')
          return await resp.json()
        },
        element: <BookList />,
        errorElement: <Err />,
        hydrateFallbackElement: <div>loading books...</div>,
      },
      {
        path: '/:bookId',
        loader: async function ({ params }) {
          const resp = await fetch('/api/books/' + params.bookId)
          return await resp.json()
        },
        element: <BookDetails />,
        errorElement: <Err />,
        hydrateFallbackElement: <div>loading book...</div>,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
