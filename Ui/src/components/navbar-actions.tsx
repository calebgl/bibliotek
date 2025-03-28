import { useAtomValue } from 'jotai'
import { Link } from 'react-router'

import { useAuth } from '../hooks/use-auth'
import { assert } from '../lib/assert'
import { countAtom } from '../stores/cart'

export function NavbarActions(props: { onCloseCart(): void }) {
	const { user, logout } = useAuth()
	const count = useAtomValue(countAtom)
	assert(count >= 0)

	return (
		<>
			<button onClick={props.onCloseCart}>
				cart{count > 0 && <span>({count})</span>}
			</button>
			{user && <button>saved</button>}
			{user && <button>profile</button>}
			{user && <button onClick={logout}>logout</button>}
			{!user && (
				<button>
					<Link to={'/login'}>login</Link>
				</button>
			)}
		</>
	)
}
