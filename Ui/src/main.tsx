import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './app/app'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Err />,
    children: [
      {
        path: '/about',
        loader: async function () {
          console.count('about loader')

          await new Promise((f, r) => {
            f
            setTimeout(() => {
              r(new Response('a'))
            }, 1000)
          })

          return new Promise((f) => {
            f('hello about')
          })
        },
        element: <About />,
        errorElement: <Err />,
        hydrateFallbackElement: <div>loading...</div>,
      },
    ],
  },
])

function Err() {
  return <div>Somethign went wrong!</div>
}

function About() {
  console.count('about rendered')
  return <div>about</div>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
