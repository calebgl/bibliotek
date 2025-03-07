import { useAtomValue } from 'jotai'

import { cartAtom } from '../stores/cart'

export function Cart() {
	const cart = useAtomValue(cartAtom)
	const books = Object.values(cart.books)
	return (
		<div>
			{books.length === 0 && 'There are no books in your cart!'}
			{books.map((b) => {
				return (
					<div key={b.id}>
						{b.title} - {b.quantity}
					</div>
				)
			})}
		</div>
	)
}
