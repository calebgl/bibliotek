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

	const { data: book } = useBook(bookId)

	function addToCart(_: MouseEvent<HTMLButtonElement>) {
		assert(bookId)
		assert(book)

		setBooksAtom((prev) => {
			const cloned = structuredClone(prev)
			if (!cloned[bookId]) {
				cloned[bookId] = {
					id: book.id,
					title: book.title,
					author: book.author,
					price: book.price,
					coverUrl: book.coverUrl,
					quantity: 0,
				}
			}

			cloned[bookId].quantity++

			return cloned
		})
	}

	return (
		<>
			<div className="text-4xl font-semibold">
				<BookTitle />
			</div>
			<div className="flex items-center gap-1">
				<BookRating />
			</div>
			<div className="text-xl">
				<BookPrice />
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

function BookTitle() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return <div className="mb-1 h-9 w-24 animate-pulse bg-gray-200" />
	}

	assert(book)

	return <h1>{book.title}</h1>
}

function BookRating() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return <div className="mb-1 h-4 w-16 animate-pulse bg-gray-100" />
	}

	assert(book)

	return (
		<>
			<span>★★★★☆</span>
			<span className="text-sm">{book.averageRating}</span>
			<span className="text-xs">({book.totalReviews})</span>
		</>
	)
}

function BookPrice() {
	const { bookId } = useParams()
	assert(bookId)

	const { data: book, isLoading, error } = useBook(bookId)
	if (error) {
		throw error
	}
	if (isLoading) {
		return <div className="h-6 w-8 animate-pulse bg-gray-200" />
	}

	assert(book)

	return <span>{formatCurrency(book.price)}</span>
}
