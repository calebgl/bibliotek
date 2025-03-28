import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import 'jotai-devtools/styles.css'
import './assets/main.css'
import './config.ts'

import { DevTools } from 'jotai-devtools'
import { AdminLayout } from './layouts/admin-layout.tsx'
import { PublicLayout } from './layouts/public-layout.tsx'
import { AdminBookCreate } from './views/admin-book-create.tsx'
import { AdminBookUpdate } from './views/admin-book-update.tsx'
import { AdminBooks } from './views/admin-books.tsx'
import { Book } from './views/book'
import { Books } from './views/books.tsx'
import { Home } from './views/home'
import { Login } from './views/login.tsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/books',
				element: <Books />,
			},
			{
				path: '/books/:bookId',
				element: <Book />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
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
		<DevTools />
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
)
