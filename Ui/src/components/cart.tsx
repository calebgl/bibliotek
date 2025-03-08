import { useAtom } from 'jotai'
import { MouseEvent, RefObject } from 'react'

import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'
import { booksAtom } from '../stores/cart'

export function Cart(props: {
	ref: RefObject<HTMLDivElement | null>
	onClose(event: MouseEvent<HTMLElement>): void
}) {
	const [booksA, setBooks] = useAtom(booksAtom)
	const books = Object.values(booksA)

	function handleIncrement(id: string) {
		return function () {
			const cloned = structuredClone(booksA)
			assert(cloned[id])
			assert(cloned[id].quantity > 0)

			cloned[id].quantity++

			setBooks(cloned)
		}
	}

	function handleDecrement(id: string) {
		return function () {
			const cloned = structuredClone(booksA)
			assert(cloned[id])
			assert(cloned[id].quantity > 0)

			cloned[id].quantity--
			if (cloned[id].quantity === 0) {
				delete cloned[id]
			}

			setBooks(cloned)
		}
	}

	return (
		<div
			ref={props.ref}
			className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
			onClick={props.onClose}
		>
			<div className="fixed top-0 right-0 h-full w-1/3 bg-white">
				<div className="space-y-8 overflow-y-auto p-8">
					{books.length === 0 && 'There are no books in your cart!'}
					{books.map((book) => {
						return (
							<div key={book.id} className="flex gap-4">
								<div className="basis-1/3">
									<img src={book.coverUrl} alt={book.title} />
								</div>
								<div>
									<h3 className="text-xl font-semibold">
										{book.title}
									</h3>
									<p>{formatCurrency(book.price)}</p>
									<div className="mt-auto">
										<button
											onClick={handleDecrement(book.id)}
										>
											-
										</button>
										<span>{book.quantity}</span>
										<button
											onClick={handleIncrement(book.id)}
										>
											+
										</button>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
