import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { Link } from 'react-router'

import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'
import { booksAtom } from '../stores/cart'
import { CartBook } from '../types'

export function CartView() {
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
		<div className="container mx-auto">
			<div className="grid grid-cols-1 gap-12">
				{cartBooks.map((book) => (
					<div key={'favorite-' + book.id} className="flex gap-8">
						<Link to={'/books/' + book.id} className="max-w-40">
							<img
								src={book.coverUrl ?? undefined}
								alt={book.title}
							/>
						</Link>
						<div className="flex grow flex-col">
							<Link
								to={'/books/' + book.id}
								className="text-2xl font-semibold"
							>
								{book.title}
							</Link>
							<div className="text-base">{book.author}</div>
							<div className="text-xl">
								{formatCurrency(book.price)}
							</div>
							<div className="mt-auto flex gap-4">
								<div className="flex gap-2">
									<button
										onClick={() => handleDecrement(book.id)}
										className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
									>
										{book.quantity > 1 ? '-' : 'd'}
									</button>
									<span>{book.quantity}</span>
									<button
										onClick={() => handleIncrement(book.id)}
										className="min-w-7 cursor-pointer bg-gray-300 px-2 py-1 leading-none"
									>
										+
									</button>
								</div>
								<div>
									<button
										onClick={() => handleDelete(book.id)}
										className="min-w-7 cursor-pointer px-2 py-1 leading-none underline"
									>
										delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
