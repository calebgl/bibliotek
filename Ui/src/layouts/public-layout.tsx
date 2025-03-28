import { Outlet } from 'react-router'

import { Navbar } from '../components/navbar'

export function PublicLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}
