import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './assets/main.css'
import './config.ts'

import { Book } from './views/book.tsx'

const router = createBrowserRouter([
	{
		index: true,
		element: <Book />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
