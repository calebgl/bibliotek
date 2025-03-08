import { useAtomValue } from 'jotai'
import { MouseEvent, RefObject } from 'react'

import { assert } from '../lib/assert'
import { countAtom } from '../stores/cart'
import { CartList } from './cart-list'

export function Cart(props: {
	ref: RefObject<HTMLDivElement | null>
	onClose(event: MouseEvent<HTMLElement>): void
}) {
	const count = useAtomValue(countAtom)
	assert(count >= 0)

	return (
		<div
			ref={props.ref}
			className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
			onClick={props.onClose}
		>
			<div className="fixed top-0 right-0 h-full w-1/3 bg-white">
				<div className="h-full overflow-y-auto p-8">
					<h2 className="mb-4 text-3xl font-bold">
						Cart{count > 0 && <span>({count})</span>}
					</h2>
					<CartList />
				</div>
			</div>
		</div>
	)
}
