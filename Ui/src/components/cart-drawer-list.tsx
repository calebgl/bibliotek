import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { assert } from '../lib/assert'
import { booksAtom } from '../stores/cart'
import type { CartBook } from '../types'
import { CartDrawerItem } from './cart-drawer-item'

export function CartDrawerList() {
	const [books, setBooks] = useAtom(booksAtom)
	const cartBooks = Object.values(books)

	const handleIncrement = useCallback((id: string) => {
		setBooks((prev: Record<string, CartBook>) => {
			const cloned = structuredClone(prev)
			assert(cloned[id])
			assert(cloned[id].quantity > 0)

			cloned[id].quantity++

			return cloned
		})
	}, [])

	const handleDecrement = useCallback((id: string) => {
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
	}, [])

	const handleDelete = useCallback((id: string) => {
		setBooks((prev: Record<string, CartBook>) => {
			const cloned = structuredClone(prev)
			assert(cloned[id])
			assert(cloned[id].quantity > 0)

			delete cloned[id]

			return cloned
		})
	}, [])

	return (
		<div className="space-y-8">
			{cartBooks.length === 0 && 'There are no books in your cart!'}
			{cartBooks.map((book) => (
				<CartDrawerItem
					key={book.id}
					{...book}
					onDecrement={handleDecrement}
					onIncrement={handleIncrement}
					onDelete={handleDelete}
				/>
			))}
		</div>
	)
}
