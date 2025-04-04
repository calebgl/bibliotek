import { useParams } from 'react-router'

import { useBook } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { formatCurrency } from '../lib/utils'
import { ButtonAddToCart, ButtonAddToCartSkeleton } from './button-add-to-cart'
import { ButtonSaveBook, ButtonSaveBookSkeleton } from './button-save-book'

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

	const { data: book, isLoading, isError } = useBook(bookId)
	if (isLoading) {
		return (
			<>
				<ButtonAddToCartSkeleton className="grow" />
				<ButtonSaveBookSkeleton />
			</>
		)
	}

	assert(book)

	return (
		<>
			<ButtonAddToCart
				disabled={isLoading || isError}
				book={{ ...book, quantity: 1 }}
				className="grow"
			/>
			<ButtonSaveBook />
		</>
	)
}
