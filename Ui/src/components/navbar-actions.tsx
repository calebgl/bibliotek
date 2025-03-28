import { useAtomValue } from 'jotai'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

import { useAuth } from '../hooks/use-auth'
import { assert } from '../lib/assert'
import { countAtom } from '../stores/cart'

export function NavbarActions(props: { onCloseCart(): void }) {
	const location = useLocation()
	const { user, logout } = useAuth()
	const count = useAtomValue(countAtom)
	assert(count >= 0)

	const isLocationCart = location.pathname !== '/cart'

	const actions: ReactNode[] = []
	if (user) {
		actions.push(
			<button key="/saved">
				<Link to={'/saved'}>saved</Link>
			</button>,
			<button key="/profile">profile</button>,
			<button key="/logout" onClick={logout}>
				logout
			</button>,
		)
	} else {
		actions.push(
			<button key="/login">
				<Link to={'/login'}>login</Link>
			</button>,
		)
	}

	return (
		<>
			<button
				onClick={isLocationCart ? props.onCloseCart : undefined}
				className="cursor-pointer"
			>
				cart{count > 0 && <span>({count})</span>}
			</button>
			{actions}
		</>
	)
}
