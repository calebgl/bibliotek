import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { CartItem } from '../components/cart-item'
import { assert } from '../lib/assert'
import { booksAtom } from '../stores/cart'
import { CartBook } from '../types'

export function CartList() {
	const [books, setBooks] = useAtom(booksAtom)
	const cartBooks = Object.values(books)

	const handleIncrement = useCallback(
		(id: string) => {
			setBooks((prev: Record<string, CartBook>) => {
				const cloned = structuredClone(prev)
				assert(cloned[id])
				assert(cloned[id].quantity > 0)

				cloned[id].quantity++

				return cloned
			})
		},
		[setBooks],
	)

	const handleDecrement = useCallback(
		(id: string) => {
			setBooks((prev: Record<string, CartBook>) => {
				const cloned = structuredClone(prev)
				assert(cloned[id])
				assert(cloned[id].quantity > 0)

				cloned[id].quantity--
				if (cloned[id].quantity === 0) {
					delete cloned[id]
				}

				return cloned
			})
		},
		[setBooks],
	)

	const handleDelete = useCallback(
		(id: string) => {
			setBooks((prev: Record<string, CartBook>) => {
				const cloned = structuredClone(prev)
				assert(cloned[id])
				assert(cloned[id].quantity > 0)

				delete cloned[id]

				return cloned
			})
		},
		[setBooks],
	)

	return (
		<div className="space-y-12">
			{cartBooks.length === 0 && 'There are not books in your cart!'}
			{cartBooks.map((book) => (
				<CartItem
					key={'saved-' + book.id}
					{...book}
					onDecrement={handleDecrement}
					onIncrement={handleIncrement}
					onDelete={handleDelete}
				/>
			))}
		</div>
	)
}
