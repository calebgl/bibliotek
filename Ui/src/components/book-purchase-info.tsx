import { useSetAtom } from 'jotai'
import { MouseEvent } from 'react'
import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'
import { booksAtom } from '../stores/cart'

export function BookPurchaseInfo() {
	const { bookId } = useParams()
	assert(bookId)

	const setBooksAtom = useSetAtom(booksAtom)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return 'loading'
	}

	assert(book)

	function addToCart(_: MouseEvent<HTMLButtonElement>) {
		assert(bookId)
		assert(book)

		setBooksAtom((prev) => {
			const cloned = structuredClone(prev)
			if (!cloned[bookId]) {
				cloned[bookId] = Object.assign({ quantity: 0 }, book)
			}

			cloned[bookId].quantity++

			return cloned
		})
	}

	return (
		<>
			<div className="text-4xl font-semibold">
				<h1>{book.title}</h1>
			</div>
			<div className="flex items-center gap-1">
				<span>★★★★☆</span>
				<span className="text-sm">{book.averageRating}</span>
				<span className="text-xs">({book.totalReviews})</span>
			</div>
			<div className="text-xl">
				<span>{formatCurrency(book.price)}</span>
			</div>
			<div className="mt-auto flex gap-2">
				<button
					onClick={addToCart}
					className="grow cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500"
				>
					Add to cart
				</button>
				<button className="cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500">
					<span className="size-4">❤</span>
				</button>
			</div>
			<div className="">
				<p className="text-sm">Free delivery on orders over $30.00</p>
			</div>
		</>
	)
}
