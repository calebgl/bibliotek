import { Outlet } from 'react-router'

export function AdminLayout() {
	return (
		<div className="container mx-auto">
			<Outlet />
		</div>
	)
}
