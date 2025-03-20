import { useSetAtom } from 'jotai'
import { MouseEvent } from 'react'
import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'
import { booksAtom } from '../stores/cart'

export function BookPurchaseInfo() {
	return (
		<>
			<div className="text-4xl font-semibold">
				<Title />
			</div>
			<div className="flex items-center gap-1">
				<Rating />
			</div>
			<div className="text-xl">
				<Price />
			</div>
			<div className="mt-auto flex gap-2">
				<Actions />
			</div>
			<div className="">
				<p className="text-sm">Free delivery on orders over $30.00</p>
			</div>
		</>
	)
}

function Title() {
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

function Rating() {
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

function Price() {
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

function Actions() {
	const { bookId } = useParams()
	assert(bookId)

	const setBooksAtom = useSetAtom(booksAtom)

	const { data: book, isLoading, isError } = useBook(bookId)

	function addToCart(_: MouseEvent<HTMLButtonElement>) {
		assert(bookId)
		assert(book)

		setBooksAtom((prev) => {
			const cloned = { ...prev }
			if (!cloned[bookId]) {
				cloned[bookId] = {
					id: book.id,
					title: book.title,
					author: book.author,
					price: book.price,
					coverUrl: book.coverUrl,
					quantity: 0,
					subtitle: book.subtitle,
				}
			}

			cloned[bookId].quantity++

			return cloned
		})
	}

	return (
		<>
			<button
				onClick={addToCart}
				disabled={isLoading || isError}
				className="grow cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500 disabled:cursor-not-allowed disabled:bg-gray-100"
			>
				Add to cart
			</button>
			<button
				disabled={isLoading || isError}
				className="cursor-pointer bg-gray-300 px-4 py-2 active:bg-amber-500"
			>
				<span className="size-4">❤</span>
			</button>
		</>
	)
}
