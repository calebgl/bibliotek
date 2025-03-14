import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './assets/main.css'
import './config.ts'

import { AdminLayout } from './layouts/admin-layout.tsx'
import { BaseLayout } from './layouts/base-layout.tsx'
import { AdminBookCreate } from './views/admin-book-create.tsx'
import { AdminBookUpdate } from './views/admin-book-update.tsx'
import { AdminBooks } from './views/admin-books.tsx'
import { Book } from './views/book'
import { Home } from './views/home'

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
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
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				path: '/admin/books',
				element: <AdminBooks />,
			},
			{
				path: '/admin/books/create',
				element: <AdminBookCreate />,
			},
			{
				path: '/admin/books/:bookId',
				element: <AdminBookUpdate />,
			},
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
)
