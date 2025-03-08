import { useAtomValue } from 'jotai'

import { assert } from '../lib/assert'
import { countAtom } from '../stores/cart'

export function NavbarActions(props: { onCloseCart(): void }) {
	const count = useAtomValue(countAtom)
	assert(count >= 0)

	return (
		<>
			<button onClick={props.onCloseCart}>
				cart{count > 0 && <span>({count})</span>}
			</button>
			<button>saved</button>
			<button>profile</button>
		</>
	)
}
