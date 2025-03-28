import { Outlet } from 'react-router'

import { useAuth } from '../hooks/use-auth'

export function BaseLayout() {
	useAuth()
	return <Outlet />
}
