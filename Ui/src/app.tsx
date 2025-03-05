import { Outlet } from 'react-router'

import { Navbar } from './components/navbar'

export function App() {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	)
}
