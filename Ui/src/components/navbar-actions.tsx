import { ReactNode } from 'react'
import { Link } from 'react-router'

import { useAuth } from '../hooks/use-auth'
import { ButtonToggleCart } from './button-toggle-cart'
import { Button } from './button'

export function NavbarActions() {
	const { user, logout } = useAuth()

	const actions: ReactNode[] = []
	if (user) {
		actions.push(
			<ButtonToggleCart key="/cart" />,
			<Link key="/saved" to="/saved" className="px-1 py-2">
				saved
			</Link>,
			<Link key="/profile" to="/profile" className="px-1 py-2">
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
			<button key="/login">
				<Link to={'/login'}>login</Link>
			</button>,
		)
	}

	return actions
}
