import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useAuth } from '../hooks/use-auth'

export function RequireAuth({ children }: { children: ReactNode }) {
	const { user } = useAuth()
	const location = useLocation()

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} />
	}

	return children
}
