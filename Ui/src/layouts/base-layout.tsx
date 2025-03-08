import { Outlet } from 'react-router'

import { Navbar } from '../components/navbar'

export function BaseLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}
