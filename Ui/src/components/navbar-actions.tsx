import { ReactNode } from 'react'
import { Link } from 'react-router'

import { useAuth } from '../hooks/use-auth'
import { Button } from './button'
import { ButtonToggleCart } from './button-toggle-cart'

export function NavbarActions() {
	const { user, logout } = useAuth()

	const actions: ReactNode[] = []
	if (user) {
		actions.push(
			<ButtonToggleCart key="/cart" />,
			<Link key="/saved" to="/saved" className="px-1 py-2 leading-none">
				saved
			</Link>,
			<Link
				key="/profile"
				to="/profile"
				className="px-1 py-2 leading-none"
			>
				profile
			</Link>,
			<Button
				key="/logout"
				onClick={logout}
				className="bg-transparent px-1 py-2 active:bg-transparent"
			>
				logout
			</Button>,
		)
	} else {
		actions.push(
			<Link key="/login" to="/login" className="px-1 py-2 leading-none">
				login
			</Link>,
		)
	}

	return actions
}

export function NavbarActionsSkeleton() {
	return (
		<div className="pt-2">
			<div className="h-5 w-32 animate-pulse bg-gray-200" />
		</div>
	)
}
