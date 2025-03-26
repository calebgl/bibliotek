import { Link } from 'react-router'

import { useBooks } from '../hooks/use-api'
import { assert } from '../lib/assert'
import { isHttpError } from '../lib/http'
import { formatCurrency } from '../lib/utils'
import { useRef } from 'react'

export function Books() {
	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-4 gap-8">
				<List />
			</div>
		</div>
	)
}

function List() {
	const failedAttempsRef = useRef<number>(0)
	const { data: books, isLoading, error, refetch } = useBooks()

	if (error) {
		if (!isHttpError(error)) {
			throw error
		}

		const maxRetries = 3
		const message = 'Something went wrong! Please try again.'

		const getMessage = () => {
			if (failedAttempsRef.current === 0) return message
			if (failedAttempsRef.current >= 3) {
				return "We're having trouble loading this content. Please try again later or contact support if the problem persists."
			}

			return `${message} (Attemp ${failedAttempsRef.current} of ${maxRetries})`
		}

		return (
			<div>
				<div>
					{getMessage()}
					<button
						onClick={() => {
							failedAttempsRef.current += 1
							refetch()
						}}
					>
						{failedAttempsRef.current >= 3
							? 'Contact support'
							: 'Retry'}
					</button>
				</div>
			</div>
		)
	}

	if (isLoading) {
		return Array.from({ length: 8 }, (_, index) => (
			<div key={'skeleton-book-' + index} className="">
				<div className="aspect-[8/9] bg-white p-8">
					<div className="mx-auto aspect-[2/3] max-h-64 animate-pulse bg-gray-200" />
				</div>
				<div className="space-y-1 px-4 py-4">
					<div
						className="h-4 animate-pulse bg-gray-300"
						style={{
							width: Math.max(0.5, Math.random()) * 100 + '%',
						}}
					/>
					<div
						className="h-3 animate-pulse bg-gray-200"
						style={{
							width: Math.max(0.5, Math.random()) * 100 + '%',
						}}
					/>
					<div />
					<div className="h-4 w-8 animate-pulse bg-gray-200" />
				</div>
			</div>
		))
	}

	assert(books)

	return books.map((book) => (
		<div key={book.id} className="">
			<div className="aspect-[8/9] bg-white p-8">
				<Link to={'/books/' + book.id} className="h-full">
					<img
						src={book.coverUrl ?? undefined}
						alt={book.title}
						className="mx-auto block h-full max-h-64"
					/>
				</Link>
			</div>
			<div className="px-4 py-4">
				<div className="line-clamp-2">
					<Link to={'/books/' + book.id}>{book.title}</Link>
				</div>
				<div className="text-sm text-neutral-500">of {book.author}</div>
				<div className="flex items-center gap-1">
					<span>★★★★☆</span>
					<span className="text-sm">{book.averageRating}</span>
					<span className="text-xs">({book.totalReviews})</span>
				</div>
				<div>
					<Link to={'/books/' + book.id}>
						{formatCurrency(book.price)}
					</Link>
				</div>
			</div>
		</div>
	))
}
