import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './assets/main.css'
import './config.ts'

import { App } from './app'
import { Admin } from './views/admin'
import { Book } from './views/book'
import { Home } from './views/home'

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/books/:bookId',
				element: <Book />,
			},
		],
	},
	{
		path: '/admin/books',
		element: <Admin />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
)
