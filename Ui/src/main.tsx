import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import 'jotai-devtools/styles.css'
import './assets/main.css'
import './config.ts'

import { DevTools } from 'jotai-devtools'
import { RequireAuth } from './components/require-auth.tsx'
import { AdminLayout } from './layouts/admin-layout.tsx'
import { PublicLayout } from './layouts/public-layout.tsx'
import { AdminBookCreateView } from './views/admin-book-create-view.tsx'
import { AdminBookUpdateView } from './views/admin-book-update-view.tsx'
import { AdminBooksView } from './views/admin-books-view.tsx'
import { BookView } from './views/book-view.tsx'
import { BooksView } from './views/books-view.tsx'
import { CartView } from './views/cart-view.tsx'
import { HomeView } from './views/home-view.tsx'
import { LoginView } from './views/login-view.tsx'
import { SavedView } from './views/saved-view.tsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{
				index: true,
				element: <HomeView />,
			},
			{
				path: '/books',
				element: <BooksView />,
			},
			{
				path: '/books/:bookId',
				element: <BookView />,
			},
			{
				path: '/saved',
				element: (
					<RequireAuth>
						<SavedView />
					</RequireAuth>
				),
			},
			{
				path: '/cart',
				element: <CartView />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginView />,
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				path: '/admin/books',
				element: <AdminBooksView />,
			},
			{
				path: '/admin/books/create',
				element: <AdminBookCreateView />,
			},
			{
				path: '/admin/books/:bookId',
				element: <AdminBookUpdateView />,
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
